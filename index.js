/*
Developped by zakaria elaloui
Github : https://github.com/zakarialaoui10
*/
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'example.txt');

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
  } else {
    console.log('File content:', data);
  }
});
/*
console.log("start")
const Dir2Tree=require("./src/dir2tree.js")
console.log(Dir2Tree)
const dir2tree = (root, options, callbacks) => new Dir2Tree(root, options, callbacks);
const ROOT = path.join(process.cwd(),'.',"Examples");
const TARGET = path.join(process.cwd(), 'generated2.json');
const tree = dir2tree(ROOT,{fileContent:true,sortBy:"extension",skipFile:["hh.txt"]});
tree.write("gen.json")
consol.log("end")
*/
module.exports=dir2tree

