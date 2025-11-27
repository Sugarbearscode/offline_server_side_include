**The background to this project is that back in 2006 I worked on an inhouse website using Microsoft IIS and I found that server side includes were amazing.**

Fast forward to 2025 and I needed to build a website using some templates. There are many templating tools out there but I can't use open source in the environment I am allowed/wanted to build things in so my only option was to hack together a simple node.js/javascript program to do it for me. 

**In simple terms this program does what a server would do, it adds include files into HTML. The difference is that it then writes out the files to a directory that you can then use. It's ideal for websites where you have many pages that use common elements. In my case I have a header template, footer template and sidebar template which are common across all the pages. I can then concentrate on the content (I used https://html5-editor.net/ to generate the meat of the content). If any tweaks are needed or new pages it's simple to amend the template and generate the whole set of pages again. **

The way to build file is to create a .con file for each web page you want and then to insert server side includes and any inline HTML you want. 

The format of the servier side iclude is ... [code]<!--#include file="main_template_header.tpl" -->[/code]

The NODE.JS script will then read through each .con file, convert it into a .htm file and replace any #include directives with the associated file that you want. I chose to use .tpl but you can use whatever you like.

Just be aware that it doesn't check for recursion so I have avoided adding any include directives into the templates files that I am using.  

Once that is all done it will write the files out to a directory called /output and dump all the .htm files there ready for you to use. 

It's simple, it doesn't do much and relies on you to run and debug if there are any errors (i.e. if you use a file in a directive it will error) but it's relatively small and simple and it can be run from vscode. 

and example.con file is include which includes a single include file to get you started. 

It was all built on windows (sorry about that) so it will almost certainly need tweaking to work on macos or linux. 

Just change the value of "C:\Temp\Web_Service_Web_Demo\templates" (And a "C:\Temp\Web_Service_Web_Demo\templates\output" directory) to whatever directory you are using and off you go. 

