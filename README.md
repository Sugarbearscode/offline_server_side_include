# Offline Server Side Include NODE.JS script

The background to this project is that back in 2006 I worked on an inhouse website using Microsoft IIS and I found that server side includes were amazing.

Fast forward to 2025 and I needed to build a website using some templates. There are many templating tools out there but I can't use open source in the environment I am allowed/wanted to build things in so my only option was to hack together a simple node.js/javascript program to do it for me. 

In simple terms this program does what a server would do, it adds include files into HTML content using the include directive. The difference is that it then writes out the files to a directory that you can then use. It's ideal for websites where you have many pages that use common elements. In my case I have a header template, footer template and sidebar template which are common across all the pages. I can then concentrate on the content (I used https://html5-editor.net/ to generate the meat of the content). If any tweaks are needed or new pages it's simple to amend the template and generate the whole set of pages again. **

---

The way to build a file is to create a .con file for each web page you want and then to insert server side includes and any inline HTML you want. 

The format of the server side iclude is ... ```<!--#include file="main_template_header.tpl" -->```

The NODE.JS script will then read through each .con file, convert it into a .htm file and replace any #include directives with the content of the associated file that you want (and replace the include directive). I chose to use .tpl as the naming convention for the templates but it would be simple to change to an alternative if needed.

Just be aware that it doesn't check for recursion so I have avoided adding any include directives into the templates files that I am using.  

---
How to make it all work
1. download all the attached files
2. make sure you have downloaded Microsoft VSCODE (so you can run the node.js script)
3. create a directory called "C:\Temp\Web_Service_Web_Demo\templates\output"
3. create a directory called "C:\Temp\Web_Service_Web_Demo\templates"
4. copy the example.con and exampletemplate.tpl files to the \templates directory
5. Run the .js script in VCODE..
6. Watch the magic happen.. (or fix any bugs)
7. Check there are no error messages from the script (fix those and move back two steps)
8. Click on the example.htm file in the output directory to open the web page in a browser
9. You should see a web page with the following '''and this my first include!! Hello World !!'''
10. Start building a real website using template files and .con files!! 

---
It's a simple script, it doesn't do much and relies on you to run and debug if there are any errors (i.e. if you use a file in a directive it will error) but it's relatively small and simple and it can be run from vscode. 

---
It was all built on windows 11 (sorry about that) so it will almost certainly need tweaking to work on macos or linux. 
