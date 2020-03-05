---
title: "Java Annotations you use in Spring: @Component"
date: 2019-03-12T19:10:30-04:00
categories:
  - blog
  - Spring
tags:
  - Spring
---

When you are a beginner and you want to dive in Spring World you'll learn how to configure Spring with Java annotations. It helps you to set up your proyects and minimize the XML configuration. Sometimes, XML configuration can be verbose for large projects, and we want to save time in our lives. Spring will scan your Java code in the background for special annotations.

@Component(beanID) Any class you annotate with @Component will automatically register as a bean in the Spring Container. You can give a bean ID that you must use after. By default, the bean ID is the class name in lowercase:

```java
@Component("U2")
public class RockBand implements MusicBand { ... }
```

If you don't specify a bean name, by default it will be the class name in lowercase.

In the example above, the bean ID is rockBand If you don't give any component name.

If you retrieve the bean from Spring Container, you have to use this bean ID:

```java
// get the bean from spring container
RockBand theRockband = context.getBean("rockBand", RockBand.class);
```

Spring framework will autodetect these classes when annotation-based configuration and classpath scanning is used in your Spring XML configuration:

```xml
<context:component-scan
base-package="com.antoniovida.springdemo" />
```