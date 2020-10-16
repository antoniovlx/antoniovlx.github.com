---
title: "Show and hide a Bootstrap 4 Sidebar in Angular 10 without jQuery"
date: 2020-03-24T17:10:30-04:00
header:
  teaser: /assets/images/2020-02-25-show-and-hide-bootstrap-4-sidebar-in-angular-9-without-jquery/sidebar.png
categories:
  - blog
tags:
  - Angular
  - Boostrap
--- 

This post assumes that you already have an Angular proyect configured with Bootstrap 4.

Bootstrap is by far the most popular CSS framework and lets you build the visual part of your apps easily.

# Adding Bootstrap to Angular

If you want to add bootstrap in Angular, the process is very straightforward. You only have to follow two steps:

1. Install the dependency in your project via npm:

```npm install boostrap –save```

2.	Update the styles array section in the file angular.json inside your project, including the path of the boostrap css file in the dependency installed before.

``` "styles":[	
"node_modules/boostrap/dist/css/boostrap.min.css",
"src/styles.css"
],
```
The order of the styles files is very important. I truly recommend you put the path of bootstrap styles before any other custom css files. In this way, you could override bootstraps styles without losing changes if you do an upgrading.

The last step is stop the "Live Development Server" and reboot it with:

```
npm start
```

# Adding a sidebar

Add a new component in your project using Angular CLI:

```
ng generate component sidebar
```
1. This command does the following:

* Creates a directory src/app/sidebar
* Inside that directory four files are generated:
	* A CSS file for the component styles.
	* An HTML file for the component template.
	* A TypeScript file with a component class named SidebarComponent.

![component](/assets/images/2020-03-24/component-tree.png)

2. Add the html code for your sidebar (sidebar.component.html):

```html
// sidebar.component.html
<div class="bg-light border-right text-center" id="sidebar
wrapper" [ngClass]="{ 'active': isOpen }">
  <div class="sidebar-heading">
    <img id="logo" alt="logo" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-social-logo.png">
    <div id="titulo"><strong>Awesome App</strong></div>
  </div>
  <div class="list-group list-group-flush">
    <ng-container *ngFor="let item of menuItems">
      <a class="list-group-item list-group-item-action bg-light" [ngClass]="{'active': selectedItem === item.name}" (click)="activeItem($event, item.name)"><i class="fa fa-lg" [ngClass]="item.icon"></i> <span class="option-name">{{item.name}} </span>
        <span *ngIf="item.name === 'Home'" class="badge badge-dark">5</span></a>  
      </ng-container>
  </div> 
</div>
```

I have used a dynamic way to generate the elements in the sidebar. I setup the different options in the component class inside the TypeScript file *sidebar.component.ts*. In this way it is easier to change the content of your sidebar as for instance you have the possibility to get it dynamically from the server.

Another thing to pay attention is the use of a *NgClass directive* in the sidebar div.  This directive adds an active class when you click: 

```[ngClass]=”{‘active`: isOpen}”```

The *isOpen* variable could be set true or false, depending on if the sidebar is open or not.
Define an active class style in sidebar.component.css, enabling the styles when the sidebar is opened.

3. Define an active class style in sidebar.component.css, enabling the styles when the sidebar is opened.

```css
#sidebar-wrapper.active {
  min-width: 100px;
  max-width: 100px;
  text-align: center;
}
```
```typescript
sidebar.component.ts
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit {
  isOpen = true;
  menuItems: any[];
  selectedItem: any;

  constructor() {
  }

  ngOnInit() {
    this.menuItems = [
      { name: "Home", path: ["/"], icon: "fa-home" },
      { name: "Users", path: [""], icon: "fa-user" },
      { name: "Folder", path: [""], icon: "fa-folder" },
      { name: "Files", path: [""], icon: "fa-file" }
    ];
  }

  toggle(){
    this.isOpen = !this.isOpen;
  }
    activeItem(event, name){
    this.selectedItem = name;
  }
}
```
4. The next step is to add a button for showing/hiding the sidebar menu. Add the code below in the sidebar.component.html:

```html
<button class="btn btn-primary " id="menu-toggle" (click)="toggle()"><i class="fa fa-bars"></i> Menu </button>
```

Using event binding you can implement a click handler. When the button is clicked the method in the component class is called so the state of isOpen changes, applying or not the active css class to the sidebar div in the template.

```typescript
toggle(){
    this.isOpen = !this.isOpen;
  }
```
That is it. You can check a live demo of the result in the next link:

[https://stackblitz.com/edit/show-hide-sidebar-without-jquery](https://stackblitz.com/edit/show-hide-sidebar-without-jquery)
