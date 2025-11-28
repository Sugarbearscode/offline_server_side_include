# Offline Server Side Include NODE.JS script

The background to this project is that back in 2006 I worked on an inhouse website using Microsoft IIS and I found that server side includes were amazing.

Fast forward to 2025 and I needed to build an offline website and really needed to use includes as there was so much common .htm There are many templating tools out there but I can't use open source in the environment I am allowed/wanted to build things in so my only option was to hack together a simple node.js/javascript program to do it for me. And here it is. 

In simple terms this program does what a server would do, it adds #include files into HTML content using the include directive. The difference is that it then writes out the files to a directory that you can then use. It's ideal for websites where you have many pages that use common elements. In my case I have a header template, footer template and sidebar template which are common across all the pages. I can then concentrate on the content (I used https://html5-editor.net/ OR or https://www.tiny.cloud/docs/tinymce/latest/classic-demo/ to generate the meat of the content). If any tweaks are needed or new pages it's simple to amend the template and generate the whole set of pages again. **

---

The way to build a website is to create a .htm file for each web page you want and then to insert server side includes and any inline HTML you want. 

You can then create templates files that you can copy into your .htm files by using the #include directive (See note below). Note that I chose .tpl for the templates but the file can be any name you like as long as it doesn't end with .htm

The format of the server side iclude within your .htm pages is standard i.e. ```<!--#include file="exampletemplate.tpl" -->``` Note the use of double quotes and a space after the second double quote - in this case the contents of exampletemplate.tpl will be copied into the .htm file and will replace the include directive. 

The script itself will iterate through all the .htm files, find the include directives within each, copy/replace the include directive with the file content and then write out a new .htm file to the output directory. 

Just be aware that it doesn't check for recursion so I have avoided adding any include directives into the templates files that I am using. It might work, it might go into an endless loop. One day I might test it. 

---
How to make it all work
1. download all the attached files
2. make sure you have downloaded Microsoft VSCODE (so you can run the node.js script)
3. create a directory called "C:\Temp\Web_Service_Web_Demo\templates\output" - you can all the directory what you like, just make you sure you change the script
3. create a directory called "C:\Temp\Web_Service_Web_Demo\templates"        - as above. but the output directory should be the input directory name plus \output
4. copy the example.htm and exampletemplate.tpl files to the \templates directory (or whatver you have decided to call the directory)
5. Run the .js script in VCODE..
6. Watch the magic happen.. (and/or fix any bugs)
7. Check there are no error messages from the script (fix those and move back two steps)
8. Click on the example.htm file in the **output** directory to open the web page in a browser
9. You should see a web page with the following '''and this my first include!! Hello World !!'''
10. Start building a real website using template files and .htm files!! 

---
It's a simple script, it doesn't do much and relies on you to run and debug if there are any errors (i.e. if you use a file that doesnt exist in an #include directive it will error) but it's relatively small and simple and it can be run from vscode. 

---
It was all built on windows 10/11 (sorry about that) so it will almost certainly need tweaking to work on macos or linux (I have not tested yet). 
