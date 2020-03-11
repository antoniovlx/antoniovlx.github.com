 ---
title: "Adding an existing project to GitHub"
date: 2019-08-18T15:10:30-04:00
categories:
  - blog
tags:
  - Git
  - GitHub
---

Create a new repository on GitHub.

1. Open Git Bash
2. Change the current working directory to your local project.
3. Initialize the local directory as a Git repository.

```git init```

4. Add the files in your new local repository. This stages them for the first commit.
```git add .```

5. Commit the files that you’ve staged in your local repository.

```git commit -m "initial commit"```

6. Copy the https url of your newly created GitHub repository.

7. Add the URL for the remote repository where your local repository will be pushed.

```git remote add origin repository URL```

8. Check the remote URL: 

```git remote -v```

9. Push the changes in your local repository to GitHub.

```git push -f origin master```
