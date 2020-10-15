---
title: "Show and hide a Bootstrap 4 Sidebar in Angular 9 without jQuery"
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

Let's start building a sidebar in Angular 9.

what do we want to achieve?

Let's do it!

1. Create a sidebar component:

Using Angular CLI is very easy, using the following command:

```ng generate component sidebar```

2. Add the minimun HTML code to see the sidebar:

```html
// sidebar.component.html
<div class="bg-light border-right" id="sidebar-wrapper">
<div class="sidebar-heading">
	<img id="logo" alt="logo" src="/assets/images/logo.jpg">
	<div id="titulo">Awesome Sidebar</div>
</div>
<div class="list-group list-group-flush">
	<a class="list-group-item list-group-item-action bg-light">
		<i class="fa fa-home fa-lg"></i> 
		<span class="option-name">Dashboard </span> <span class="badge badge-dark">5</span></a>	
	<a class="list-group-item list-group-item-action bg-light">
		<i class="fa fa-fire fa-lg"></i> 
		<span class="option-name">Incendios</span></a>
	<a class="list-group-item list-group-item-action bg-light">
		<i class="fa fa-file fa-lg"></i>
		<span class="option-name">Informes</span></a>
	<a href="#" class="list-group-item list-group-item-action bg-light"> <span class="option-name">Profile</span></a>
	</div> 
</div>
```

3. Add a button for show/hide the sidebar menu:

```html
<button class="btn btn-primary" id="menu-toggle">
		<i class="fa fa-bars"></i> Menu</button>
```

3. Use event binding for implementing a click handler. When the we click the button, the method in Sidebar component is called.

```html
<button class="btn btn-primary" id="menu-toggle" (click)="toggleSidebar()">
		<i class="fa fa-bars"></i> Menu</button>


```
```js
// navbar.component.ts
export class NavbarComponent {
  navbarOpen = false;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
}
```

4. Use NgClass directive to add the active class when we click the menu icon.
  
```[ngClass]="{ 'active': isOpen }">```

```html
 <div class="bg-light border-right" id="sidebar-wrapper" [ngClass]="{ 'active': isOpen }">
```

The ```isOpen``` variable could be set true of false, dependeing if the sidebar is open or not.

That's it!.

Do you have other way to building this behaviour?

[https://angular.io/guide/component-interaction](https://angular.io/guide/component-interaction)
[https://angular.io/api/common/NgClass)

