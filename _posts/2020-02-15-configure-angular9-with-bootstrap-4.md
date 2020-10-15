---
title: "Configure Angular 9 with Bootstrap 4 sass"
date: 2020-01-20T15:10:30-04:00
header:
  teaser: /assets/images/configure-angular9-with-bootstrap-4/bootstrap.png
categories:
  - blog
tags:
  - Angular
  - Boostrap
--- 

* Using Angular CLI

1. Install Bootstrap 4 via npm:

```npm install bootstrap --save```

2. Update styles array in angular.json inside your project, including bootstrap scss:

Note: It's important the order of the styles. Put the path of bootstrap styles before any other custom scss files, for letting you override bootstrap styles and don't lose changes if you do a upgrading.

```
"styles": [
  "node_modules/bootstrap/scss/bootstrap.scss",
  “src/styles.css”
],
```

3. Due the change of angular.json, you need to stop the "Live Development Server" and reboot it with:

```npm start```

4. So, if you check you development url (e.g http://localhost:4200), you can see your template with the bootstrap styles applied.
