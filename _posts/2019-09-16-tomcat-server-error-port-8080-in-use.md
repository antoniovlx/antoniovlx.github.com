---
title: "Tomcat Server Error - Port 8080 already in use"
date: 2019-09-16T18:10:30-04:00
categories:
  - blog
tags:
  - Tomcat
---

When you want to run your app configured with Spring Boot and it appear this message:

```
Description:

The Tomcat connector configured to listen on port 8080 failed to start. The port may already be in use or the connector may be misconfigured.
```

The port may already be in use or the connector may be misconfigured.

We have two options in this case:

1) Change the port number throught application properties file, adding  the next line:

```
server.port=8081 #Whatever port you want to use
```

2) Check if there is a process listening on the port 8080. Identify and stop it.

Open a new cdm window and write:

```
netstat -ano | findstr :8080
```

Verify the process that is listening on port 8080 and find out its process id.

Kill the process passing the process id (PID). For example, you get this result:

```
TCP 0.0.0.0:8080 0.0.0.0:0 LISTENING 20044
```

You have to execute this command, because there is a process listening with the PID 20044.

```
taskkill /PID 20044 /F
```

#More info:

https://linux.die.net/man/8/netstat

https://docs.microsoft.com/en-us/windows server/administration/windows-commands/taskkill

