#!/usr/bin/env python

import re
import sys
import json


#
# find all questions and metadata
#
q_rx = re.compile(r"""
  # number of the question
  (?P<number>\d+(-)\d+(.|-|\)))
  # Question being asked
  (?P<prompt>.+\n*.+[\?|:])
  # Possible answers to the question
  (?P<answers>(?:\s*[-\*]\s*.+)+)
  # Extra text to include in response
  \s+(?P<text>((info:)?![-\*]|^\d+\)|\s+\(image\)).+)?
""", re.X | re.M)


#
# question answer regex
#
answ_rx = re.compile(r"""
  # indicator if correct or not
  #
  # (-) : incorrect
  # (*) : correct
  #
  \s*(?P<correct>[-\*])
  # actual text of answer
  \s*(?P<answer>.+)
""", re.X | re.M)


def toJson(filename):
  with open(filename, 'r') as quiz_file:
    quiz_text = quiz_file.read()

  # find the parent url before comments are removed
  url = re.search(r'^url:(.+)', quiz_text, re.M)
  if url:
    url = url.group(1).strip()

  # find title for quiz
  title = re.search(r'^#(.+)', quiz_text, re.M)
  if title:
    title = title.group(1).strip()

  # remove comments from quiz file
  # quiz_text = re.sub(r'//(.+)', "", quiz_text)

  # find all questions
  questions = [m.groupdict() for m in q_rx.finditer(quiz_text)]
  
  results = []
  
  n = 0
  for q in questions:
    out = {}

    out['prompt'] = q['number'].strip() + q['prompt'].strip()
    # out['number'] = int(q['number'])
    n = n + 1
    out['number'] = n
    
    # correct answer info
    out['correct'] = {}

    if q['text']:
      out['correct']['text'] = q['text'].strip()

      
    answers = [m.groupdict() for m in answ_rx.finditer(q['answers'])]

    out['answers'] = []
    
    for i, a in enumerate(answers):
      out['answers'].append(a['answer'].strip())
      if a['correct'] == "*":
        out['correct']['index'] = i

    results.append(out)
	
  print("Preguntas generadas: {}".format(n))
  with open(filename.split('.')[0] + ".js", 'w') as outfile:
    outfile.write("var test=")
    json.dump(
      {
        "questions" : sorted(results, key=lambda x: x['number']),
        "title" : title,
        "url" : url
      },
      outfile,
      sort_keys=True,
      indent=2,
      separators=(',', ': ')
    )
   
	
if __name__ == '__main__':
  if len(sys.argv) == 1:
    print("no quiz file given to script...")
  else:
    quiz_file = sys.argv[1]
    print("generating {}.json".format(quiz_file.split('.')[0]))
    toJson(quiz_file)