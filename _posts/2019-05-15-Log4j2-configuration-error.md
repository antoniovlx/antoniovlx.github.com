---
title: "Log4j2 configuration - No log4j2 configuration file found"
date: 2019-05-15T17:25-04:00
categories:
  - blog
tags:
  - Log4j
---

Ok, you get an error like this when you run a project with Log4j2:

ERROR StatusLogger No Log4j 2 configuration file found. Using default configuration 
(logging only errors to the console), or user programmatically provided configurations.

Set system property 'log4j2.debug' to show Log4j 2 internal initialization logging. 

**Solution:

If you don't use maven, you will need to put the file under src folder. Remember, the file should be stay on the classpath.

If you are maven user, put it in src/main/resources or src/test/resources. Please, be careful with the name of the file, Log4j will look at several names to find the property file.

[+ info](https://logging.apache.org/log4j/2.0/manual/configuration.html)

