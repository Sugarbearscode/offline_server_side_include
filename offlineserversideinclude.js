const { readdir } = require("node:fs/promises");
const fs = require('fs');
const { exit } = require("node:process");

function writeoutfile(content,name){
  // writes out the htm file (if it is to be included)
  console.log("Writing FIle >".concat(name));
  fs.writeFile(name, content, err => {
    if (err) {
            console.log("Error Writing this file :".concat(name));            
            console.error(err);
          } else {
            console.log("File Written Written : ".concat(name));
          } 
        });
   }  
   
function readinfile(name){
  // writes out the htm file (if it is to be included)
  console.log("Reading File >".concat(name));
    try {
        data2 = fs.readFileSync(name, { encoding: 'utf8'});
        //console.log('input2.txt content:', data2);
    } catch (err) {
        console.error('Error reading file:'.concat(name), err);
    }
    return data2;
}

function Processtheincludes(htmlcontent,includedirectory) {
    // this section will replace the html includes with the include file
    // match all the includes using the regex express 
    console.log("Processing Includes");
    let text = htmlcontent;
    let newtext = text;
    let texttoreplace = '';
    let spattern = '<!--#include file="';
    let epattern = '" -->';

    i = 0;                                 // this is the index point in the file
    indexstart = 0;
    console.log();
    while (i <= text.length) {
        console.log("i ".concat(i).concat(" text length ").concat(text.length));
        indexstart = text.indexOf(spattern,i);    // find the start pattern
        indexend = text.indexOf(epattern,i);      // find the end pattern  

        if (indexstart >=0 && indexend >=0 && indexend > indexstart)  {     // means we have found a match..
            console.log("Processing an include");
            indexlength = indexend-indexstart; 
            console.log("Start > ".concat(indexstart).concat(" > end > ").concat(indexend).concat(" > length > ").concat(indexlength));           
            replacestring = text.slice(indexstart,indexend+epattern.length);                                // this is the thing that needs replacing..     
            includefilename = includedirectory.concat(text.slice(indexstart+spattern.length,indexend));     // this is the file name in the replace.   
            console.log("INCLUDE FILE NAME : ".concat(includefilename));  
            texttoreplace = readinfile(includefilename);     // get the text to replace the string 
            // could add something here to check if the texttoreplace field contains any includes which wont get processed 
            newtext = newtext.replace(replacestring,texttoreplace);  // then replace the text in here 
            i = i + indexend + epattern.length;
        }
        if (indexstart == -1){
          i = text.length + 1
        }
    }
    return newtext;
}

async function getFiles(input_file_directory,output_file_directory) {
  const files = await readdir(input_file_directory, { recursive: false });
  const file_nm = files.map((filename) => `${filename}`);    
  file_nm.sort(); //sort the file names into order
  console.log("Starting");
  console.log("There are ".concat(file_nm.length).concat(" file(s) found")); // write out how many files there are
 // these are used to store the old and new file names which are used later on 
  const old_name = [];
  const new_name = [];
 // the main loop to process each file, read it in, change the content and then write it out  
  console.log("Starting to read Files") 
  for (let i = 0; i < file_nm.length; i++) {
    // I only want to change .con files
    if ((file_nm[i].slice(-4)) == ".con") {
      full_path = input_file_directory.concat(file_nm[i]);
      const data = fs.readFileSync(full_path, 'utf8');           // read the contents of the file into the variable data
      new_file_name = output_file_directory.concat(file_nm[i].slice(0,-4).concat('.htm'));  // this is the output directory / file name     
      console.log("File Name to process : ".concat(file_nm[i]));            // this is full path of the .con file that we want to process
      //console.log("New File Name : ".concat(new_file_name));     // this is full path of the file that we want to write out
      //console.log("Content of file".concat(data));               // this contains the data within the file 
      new_data = Processtheincludes(data,input_file_directory);                     // process all the includes within the file by calling the function
      //new_data = data;
      writeoutfile(new_data,new_file_name);               // now write out the data to the output directory
      //new_name.push(new_file_name);
      //old_name.push(file_nm[i]);
      // send the html markup data off to be spruced up into a lovely format
      //new_data = cleanupHTMLcontent(data);   
      // write out the file here (new file ending with .htm but in the same directory) 
      //console.log("Write out file");     
      //url_written_out.push(writeouthmtlfile(new_data, new_file_name));
   }
  }
  //console.log("this is what is in URLWRITTENOUIT".concat(url_written_out));
  //writeoutindexfile();
} 

console.log("static_ssi (C) 2025 - V1");
// this section can be used to put out a client specific version of the web services that are actually requied.

input_file_directory = "C:/Temp/Web_Service_Web_Demo/templates/"
output_file_directory = input_file_directory.concat("output").concat("/"); //  will be written out to whatever directory is in the first element in the client_file array
// now go process those files! 
getFiles(input_file_directory,output_file_directory);

console.log("Completed")
