/*
Developped by zakaria elaloui
Github : https://github.com/zakarialaoui10
*/
/*
const fs = require('fs');
const path = require('path');
*/
const Dir2Tree=require("./src/dir2tree.js")
const dir2tree = (root, options, callbacks=[]) => new Dir2Tree(root, options, callbacks);

const fs=require("fs")
const path=require("path")

const ROOT = path.join(__dirname,'.',"Articles");
const TARGET = path.join(__dirname,"Target");

const MyTree = dir2tree(ROOT,{
  fileContent:true,
  sortBy:"extension",
  skipFile:["ger.md"],
  skipFolder:["to be skipped"],
  skipExtension:["sd"],
});

console.log(MyTree.tree)
MyTree.write(__dirname,"generated.json")

module.exports=dir2tree
