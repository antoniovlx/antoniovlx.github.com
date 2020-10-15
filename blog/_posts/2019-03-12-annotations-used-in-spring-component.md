---
title: "Annotations used in Spring: @Component"
date: 2019-03-12T19:10:30-04:00
header:
  teaser: /assets/images/2019-03-12-annotations-used-in-spring-component/annotations-spring-eclipse.jpg
  imgcredit: Photo by picjumbo.com from Pexels, https://www.pexels.com/photo/white-printer-paper-196645/, cropped and resized
redirect_from:
  - /blog/2019/03/12/java-annotations-you-use-in-spring/
categories:
  - blog
tags:
  - Spring
---

When you are a beginner and you want to dive in Spring world you'll learn **how to configure Spring with annotations**. 
It helps you to set up your proyects and minimize the XML configuration. Sometimes, *XML configuration can be verbose for large projects*, 
and we want to save time in our lives and *be more productive at work*. With annotations, it is very straightforward, you only have to *annotate
certains classes and methods* and Spring *will scan your code* in the background for these annotations.

There are a lot of annotations for specific tasks, but in this post we talk about `@Component`. 
In this [link](https://www.journaldev.com/16966/spring-annotations) you can check out a complete list of annotations used in Spring. 

`@Component(beanID)` 

If you annotate a class with @Component, Spring *will automatically register it as a bean* in the *Spring Container*. You can give a bean ID that you must use after.

```java
@Component("U2")
public class RockBand implements MusicBand { ... }
```

If you don't specify a bean name, by default it will be the class name in lowercase.

In the example above, the bean ID is rockBand.

If you retrieve the bean from *Spring container*, you have to use this bean ID. Then, you can call any
method from this bean.

```java
// get the bean from spring container
RockBand theRockband = context.getBean("rockBand", RockBand.class);
theRockBand.makeAlbum();
```

Spring framework will autodetect these classes when *annotation-based configuration* and *classpath scanning is used* in your Spring XML configuration:

```xml
<context:component-scan
base-package="com.antoniovida.springdemo" />
```