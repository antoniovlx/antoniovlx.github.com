/*
  Quick quiz bootstrap extension
  */
  ;(function($) {

// keep track of number of quizes added to page
var quiz_count = 0;

// add jQuery selection method to create
// quiz structure from question json file
// "filename" can be path to question json
// or javascript object
$.fn.quiz = function(filename) {
  if (typeof filename === "string") {
    $.getJSON(filename, render.bind(this));
  } else {
    render.call(this, filename);
  }
};

// create html structure for quiz
// using loaded questions json
function render(quiz_opts) {


  // list of questions to insert into quiz
  var questions = quiz_opts.questions;

  // keep track of the state of correct
  // answers to the quiz so far
  var state = {
    correct : 0,
    incorrect: 0,
    answered: 0,
    total : questions.length
  };

  var $quiz = $(this)
  .attr("class", "carousel slide")
  .attr("data-ride", "carousel");

  // unique ID for container to refer to in carousel
  var name = $quiz.attr("id") || "urban_quiz_" + (++quiz_count);

  $quiz.attr('id', name);

  var height = $quiz.height();

  // add countdown and progress bar

  $timerDiv = $("<div>")
  .attr("class", "timer timer-countdown text-right")
  .attr("data-minutes-left", "120")
  .appendTo($quiz);

  $timerControls = $("<div>")
  .attr("id", "timer-controls")
  .attr("class", "text-right")
  .appendTo($quiz);

  var $timerstart = $("<button>")
  .attr("class", "btn btn-success disabled timerstart")
  .html("Continuar")
  .appendTo($timerControls);

  var $timerpause = $("<button>")
  .attr("class", "btn btn-warning timerpause")
  .html("Pausa")
  .appendTo($timerControls);
  
  var myTimer = $('.timer-countdown').startTimer({
    onComplete: function(element){console.log('Complete');},
  });

  var $timerControls = $('#timer-controls');

  $timerstart.click(function(){
    // console.log("resume");
    myTimer.trigger('resume'); 
    $timerstart.addClass('disabled');
    $timerpause.removeClass('disabled');
  });

  $timerpause.click(function(){
    // console.log("pause");
    myTimer.trigger('pause'); 
    $timerpause.addClass('disabled');
    $timerstart.removeClass('disabled');
  });

  $title = $('<p>')
    .text("Test: " + quiz_opts.title)
    .attr("class", "title")
    .appendTo($quiz)

  $progress = $("<div>")
  .attr("class", "progress")
  .appendTo($quiz);

  $progress_correct = $("<div>")
  .attr("class", "progress-bar progress-bar-success")
  .attr("aria-valuenow", "0")
  .attr("aria-valuemin", "0")
  .attr("aria-valuemax", "100")
  .html("0%")
  .appendTo($progress);

  $progress_incorrect = $("<div>")
  .attr("class", "progress-bar progress-bar-danger")
  .attr("aria-valuenow", "0")
  .attr("aria-valuemin", "0")
  .attr("aria-valuemax", "100")
  .html("0%")
  .appendTo($progress);


  /*
    Add carousel indicators
    */

  /*
    Slides container div
    */
    var $slides = $("<div>")
    .attr("class", "carousel-inner row")
    .attr("role", "listbox")
    .appendTo($quiz);

    var $dropdown = $('<div>')
    .attr("class", "col-md-2 col-sm-2 questions_menu")
    .appendTo($slides);

    var $questions_nav = $("<ul>")
    .attr("class", "nav nav-pills nav-stacked questions_nav")
    .appendTo($dropdown);

  /*
    Create title slide
    */
    var $title_slide = $("<div>")
    .attr("class", "item active col-md-10 col-sm-10")
    .attr("height", height + "px")
    .appendTo($slides);

    $('<h1>')
    .text(quiz_opts.title)
    .attr('class', 'quiz-title')
    .appendTo($title_slide)

    $('<h4>')
    .text("Preguntas:  " + state.total)
    .attr('class', 'quiz-info')
    .appendTo($title_slide)

    var $start_button = $("<div>")
    .attr("class", "quiz-answers")
    .appendTo($title_slide);

    var $indicators = $('<ol>')
    .attr('class', 'progress-circles')

    $("<button>")
    .attr('class', 'quiz-button btn')
    .text("Empezar el Test")
    .click(function() {
      $quiz.carousel('next');
      $indicators.addClass('show');

      // first question selected in menu
      $questions_nav.children().first().addClass('active');
      $dropdown.css('visibility', 'visible');

      myTimer.trigger('start');
      $timerpause.removeClass('disabled');

      $progress.css('visibility', 'visible');
      $timerControls.css("visibility", "visible");
      $title.css('visibility', 'visible');


      $(".active .quiz-button.btn").each(function(){
        console.log(this.getBoundingClientRect())
        $(this).css("margin-left", function(){
          return ((250 - this.getBoundingClientRect().width) *0.5) + "px"
        })
      })
    })
    .appendTo($start_button);

    /*$indicators
    .appendTo($quiz);*/

    $.each(questions, function(question_index, question) {
      $('<li>')
      .attr('class', (question_index+1) ? "" : "dark")
      .appendTo($indicators);

      var $question = $('<li>')
      .attr('id', "question" + (question_index+1))
      .click(function(){
           //find current question
           $slides
           .find('.item.active')
           .removeClass('active');
           
           $questions_nav
           .find('.active')
           .removeClass('active');
           
           $(this).addClass('active');
           var id_clicked = $(this).attr('id');
           var text_clicked = $(this).find('a').html();
           
           $(".item.col-md-10."+id_clicked).addClass('active');
           $dropdown.find('button').html(text_clicked);


         })
      .appendTo($questions_nav);

      $('<a>')
      .html("Pregunta " + (question_index + 1))
      .appendTo($question);

    });

  /*
    Add all question slides
    */
    $.each(questions, function(question_index, question) {

      var last_question = (question_index + 1 === state.total);

      var $item = $("<div>") 
      .attr("class", "item col-md-10 col-sm-10 question"+ (question_index+1))
      .attr("height", height + "px")
      .appendTo($slides);
      var $img_div;
      if (question.image) {
        $img_div = $('<div>')
        .attr('class', 'question-image')
        .appendTo($item);
        $("<img>")
        .attr("class", "img-responsive")
        .attr("src", question.image)
        .appendTo($img_div);
        $('<p>')
        .text(question.image_credit)
        .attr("class", "image-credit")
        .appendTo($img_div);
      }


      $("<div>")
      .attr("class", "quiz-question")
      .html(question.prompt)
      .appendTo($item);

      var $answers = $("<div>")
      .attr("class", "quiz-answers")
      .appendTo($item);

    // if the question has an image
    // append a container with the image to the item


    // for each possible answer to the question
    // add a button with a click event
    $.each(question.answers, function(answer_index, answer) {

      // create an answer button div
      // and add to the answer container
      var ans_btn = $("<div>")
      .attr('class', 'quiz-button btn')
      .html(answer)
      .appendTo($answers);

      // This question is correct if it's
      // index is the correct index
      var correct = (question.correct.index === answer_index);

      // default opts for both outcomes
      var opts = {
        allowOutsideClick : false,
        allowEscapeKey : false,
        confirmButtonText: "Siguiente pregunta",
        html : true,
        confirmButtonColor: "#0096D2"
      };

      // set options for correct/incorrect
      // answer dialogue
      if (correct) {
        opts = $.extend(opts, {
          title: "Correcto!",
          text: "Bien hecho" + (
            question.correct.text ?
            ("<div class=\"correct-text\">" +
              question.correct.text +
              "</div>"
              ) : ""),
          type: "success"
        });
      } else {
        opts = $.extend(opts, {
          title: "Incorrecto",
          text: (
            "No, la respuesta es incorrecta!<br/><br/>" +
            "La respuesta correcta era \"" +
            question.answers[question.correct.index] + "\"." /*+ (
              question.correct.text ?
              ("<div class=\"correct-text\">" +
                question.correct.text +
                "</div>"
                ) : "")*/
                ),
          type: "error"
        });
      }

      if (last_question) {
        opts.confirmButtonText = "Continuar";
      }


      // bind click event to answer button,
      // using specified sweet alert options
      ans_btn.on('click', function() {
        var $selected = $(this);
        function next() {
          state.answered++;

          var finished = (state.answered === state.total);
          
          // if correct answer is selected,
          // keep track in total and mark it
          if (correct){
            $selected.addClass('btn-success');
            state.correct++;
          } 
          else{
            $selected.siblings().each(function () {
              if ($(this).text() == question.answers[question.correct.index]) {
                $(this).addClass('btn-success');
              }
            });
            
            $selected.addClass('btn-danger');
            state.incorrect++;
          } 

          // disabled others answers and selected when question is marked
          $selected.attr("disabled", "disabled");
          $selected.siblings().attr("disabled", "disabled");

          if(!finished && !last_question){
            // update question number in questions menu
            $quiz.carousel('next');
          }

          if(finished){
            $check_results.removeAttr('disabled');
          }

          $question_active = $questions_nav.find('.active')

          $question_active
          .find('a')
          .prepend('<i class="glyphicon glyphicon-ok"></i> ')

          $question_active
          .removeClass('active')
          .next()
          .addClass('active');

          // updated current question text in navbar
          var next = $questions_nav.find('.active > a').html();
          $dropdown.find('button').html(next);

          // update progress
          $progress_correct.html(state.correct);
          $progress_correct.css("width", function(){
            return (state.correct / state.total) * 100 + "%";
          });

          $progress_incorrect.html(state.incorrect);
          $progress_incorrect.css("width", function(){
            return (state.incorrect / state.total) * 100 + "%";
          });

          // if we've reached the final question
          // set the results text
          if (last_question && finished) {
            //$results_title.html(resultsText(state));
            myTimer.trigger('pause');
            $timerpause.addClass('disabled');
            $timerstart.removeClass('disabled').addClass('disabled');
            showResultText(state, $results_ratio, $results_title);

          } else {

            // indicate the question number
            $indicators.find('li')
            .removeClass('dark')
            .eq(question_index+1)
            .addClass('dark');
          }
          // unbind event handler
          $('.sweet-overlay').off('click', next);
        }

        // advance to next question on OK click or
        // click of overlay
        swal(opts, next);
        $('.sweet-overlay').on('click', next);

      });

    });

var $buttons = $("<div>")
.attr("class", "quiz-buttons")
.appendTo($answers);

if(!$item.hasClass('question1')){

  var prevButton = $("<button>")
  .attr("class", "btn btn-info prevButton")
  .html("Anterior")
  .click(function(){
    $quiz.carousel("prev");
    $question_active = $questions_nav.find('.active')
    $question_active
    .removeClass('active')
    .prev()
    .addClass('active');
  }).appendTo($buttons);

}


var $check_results = $("<button>")
.attr("class", "btn btn-primary checkButton")
.attr("disabled", "disabled")
.html("Comprobar resultados")
.click(function(){
  $slides
  .find('.item.active')
  .removeClass('active');
  $results_slide.addClass('active');

  myTimer.trigger('pause');
  $timerpause.addClass('disabled');
  $timerstart.removeClass('disabled').addClass('disabled');
  showResultText(state, $results_ratio, $results_title);
})
.appendTo($buttons);

if(!last_question){

  var $nextButton = $("<button>")
  .attr("class", "btn btn-info nextButton")
  .html("Siguiente")
  .click(function(){
    $quiz.carousel('next');
    $question_active = $questions_nav.find('.active')
    $question_active
    .removeClass('active')
    .next()
    .addClass('active');
  })
  .appendTo($buttons);

}


});


  // final results slide
  var $results_slide = $("<div>")
  .attr("class", "item col-md-10 col-sm-10")
  .attr("height", height + "px")
  .appendTo($slides);

  var $results_title = $('<h1>')
  .attr('class', 'quiz-title')
  .appendTo($results_slide);

  var $results_ratio = $('<div>')
  .attr('class', 'results-ratio')
  .appendTo($results_slide);

  /*var $restart_button = $("<div>")
  .attr("class", "quiz-answers")
  .appendTo($results_slide);*/

  /*var $social = $("<div>")
    .attr('class', 'results-social')
    .html('<div id = "social-text">Did you like the quiz? Share your results with your friends, so they can give it a shot!</div>')
    .appendTo($results_slide);

  var $twitter_link = $('<a>')
    .html('<span class="social social-twitter follow-tw"></span>')
    .appendTo($social);

  var $facebook_link = $('<a>')
    .html('<span class="social social-facebook follow-fb"></span>')
    .appendTo($social); */

    /*$("<button>")
    .attr('class', 'quiz-button btn center-block')
    .text("Volver a intentar")
    .click(function() {
      state.correct = 0;
      state.incorrect = 0;
      $quiz.carousel(0);
      myTimer.trigger('resetime');
    })
    .appendTo($results_slide);*/

    $quiz.carousel({
      "interval" : false
    });

    $(window).on('resize', function() {
      $quiz.find(".item")
      .attr('height', $quiz.height() + "px");
    });

  }

  function showResultText(state, $results_ratio, $results_title){

    $results_ratio.text(
      "¡Has conseguido " +
      Math.round(100*(state.correct/state.total)) +
      "% de respuestas correctas!"
      );

    $results_title.text("Resultado: " + state.correct +
      " / " + state.total);
  }

  function resultsText(state) {

    var ratio = state.correct / state.total;
    var text;

    switch (true) {
      case (ratio === 1):
      text = "Wow&mdash;perfect score!";
      break;
      case (ratio > 0.9):
      text = "Awesome job, you got most of them right.";
      break;
      case (ratio > 0.60):
      text = "Pretty good, we'll say that's a pass.";
      break;
      case (ratio > 0.5):
      text = "Well, at least you got half of them right&hellip;";
      break;
      case (ratio < 0.5 && ratio !== 0):
      text = "Looks like this was a tough one, better luck next time.";
      break;
      case (ratio === 0):
      text = "Yikes, none correct. Well, maybe it was rigged?";
      break;
    }
    return text;

  }


  function tweet(state, opts) {

    var body = (
      "I got " + state.correct +
      " out of " + state.total +
      " on @taxpolicycenter’s \"" + opts.title +
      "\" quiz. Test your knowledge here: " + opts.url
      );

    return (
      "http://twitter.com/intent/tweet?text=" +
      encodeURIComponent(body)
      );

  }

  function facebook(state, opts) {
    return "https://www.facebook.com/sharer/sharer.php?u=" + opts.url;
  }


})(jQuery);

