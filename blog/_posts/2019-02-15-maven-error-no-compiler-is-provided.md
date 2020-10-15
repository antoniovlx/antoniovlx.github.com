---
title: "Maven error : No compiler is provided in this environment."
date: 2019-02-15T17:10:30-04:00
header:
  teaser: /assets/images/2019-02-15-maven-error-no-compiler-is-provided/maven-error1.jpg
  imgcredit: Photo by picjumbo.com from Pexels, https://www.pexels.com/photo/white-printer-paper-196645/, cropped and resized
excerpt_separator: <!--more-->  
categories:
  - blog
tags:
  - maven
  - eclipse
  - jdk
---

That is a typical scenario when we are using maven and refers to a problem with its configuration. 

Your **JAVA_HOME** environment variable or your IDE are pointing to a JRE rather than a JDK.  In this case
it is neccesary to set the correct path of your _Java JDK_.

<!--more-->

There are several ways to do that and configure maven correctly:

## Running Maven on command line.

Maven looks at the _JAVA_HOME environment variable_ to use the rigth JAVA compiler.
Therefore, you need to **check the path configured** in this variable since must refer
to a JDK (JAVA Development Kit) and not a JRE (Java Runtime Environment).

To verify that, you can type in the command line: `mvn --version`

If It isn't pointing to a JDK, you can update the value in the following ways:

+ **On Windows**: 

	- Go to **System properties** > **Advanced system settings** > **Advanced** > **environment variable** and
on the _System variables_ section select the JAVA_HOME variable and click on _EDIT_.
	- Write the **absolute path to the JDK**.
	
![Solve Maven Error in Eclipse]({{ site.baseurl }}/assets/images/2019-02-15-maven-error-no-compiler-is-provided/maven-error.jpg "an image title")

	
+ **Command Line On Windows**

You can set the variable before running the build as following

`set JAVA_HOME=<ABSOLUTE_PATH_TO_JDK>`

+ **Command Line On Linux**

`export JAVA_HOME="<ABSOLUTE_PATH_TO_JDK>"`

## Running Maven in Eclipse:

+ Click on **Windows** > **Preferences** > **Java** > **Installed JREs**
+ Verify the correct JDK path selected.

![Solve Maven Error in Eclipse]({{ site.baseurl }}/assets/images/2019-02-15-maven-error-no-compiler-is-provided/maven-error1.jpg "an image title")

## Use maven-compiler-plugin and add it in the pom.xml

Another way is use the **maven-compiler-plugin** in your project adding it in the pom.xml.
In the tag _executable_ you have to **set the full path** to the correct _JAVA JDK_.
	
	{% highlight xml %}
<plugins>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-compiler-plugin</artifactId>
        <version>3.8.1</version>
        <configuration>
          <verbose>true</verbose>
          <fork>true</fork>
          <executable><!-- path-to-javac --></executable>
          <compilerVersion>1.3</compilerVersion>
        </configuration>
      </plugin>
    </plugins>
}
{% endhighlight %}

### References:

[3 ways to solve the Maven error : No compiler is provided in this environment.](http://roufid.com/no-compiler-is-provided-in-this-environment/)
