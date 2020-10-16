---
title: "Tomcat Server Error - Port 8080 already in use"
date: 2019-09-16T18:10:30-04:00
redirect_from:
  - /2019/09/16/tomcat-server-error-port-8080-already-in-use/
categories:
  - blog
tags:
  - Tomcat
---

When you want to run your app configured with *Spring Boot* and it appears this message:

```
Description:

The Tomcat connector configured to listen on port 8080 failed to start. The port may already be in use or the connector may be misconfigured.
```

It is caused because of the port may already be in use or the connector may be misconfigured.

We have two options in this case:

1. Change the port number throught application properties file, adding  the next line:
    ```
    server.port=8081 #Whatever port you want to use
    ```
2. Check if there is a process listening on the port 8080. Identify and stop it.
   1. Open a new cdm window and write:
        ```
        netstat -ano | findstr :8080
        ```
   2. Verify the process that is listening on port 8080 and find out its process id.
   3. Kill the process passing the process id (PID). For example, you get this result:
        ```
        TCP 0.0.0.0:8080 0.0.0.0:0 LISTENING 20044
        ```
   4. You have to execute this command, because there is a process listening with the PID 20044.
        ```
        taskkill /PID 20044 /F
        ```

### More info:

* [https://linux.die.net/man/8/netstat](https://linux.die.net/man/8/netstat)
* [https://docs.microsoft.com/en-us/windowsserver/administration/windows-commands/taskkill](https://docs.microsoft.com/en-us/windowsserver/administration/windows-commands/taskkill)

