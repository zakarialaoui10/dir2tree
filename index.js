/*
Developped by zakaria elaloui
Github : https://github.com/zakarialaoui10
*/
const fs = require('fs');
const path = require('path');
const Dir2Tree=require("./src/dir2tree.js")
const dir2tree = (root, options, callbacks=[]) => new Dir2Tree(root, options, callbacks);
const ROOT = path.join(__dirname,'.',"Examples");
const TARGET = path.join(__dirname, 'generated2.json');
const tree = dir2tree(__dirname,{fileContent:true,sortBy:"extension",skipFile:["hh.txt"]});
console.log(process.cwd())
console.log(__dirname)
tree.write("gen.json")
console.log("end")
module.exports=dir2tree
