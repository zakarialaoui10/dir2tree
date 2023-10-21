/*
Developped by zakaria elaloui
Github : https://github.com/zakarialaoui10
*/
const fs = require('fs');
const path = require('path');
const Dir2Tree=require("./src/dir2tree.js")
const dir2tree = (root, options, callbacks=[]) => new Dir2Tree(root, options, callbacks);
//const ROOT = path.join(__dirname,'.',"Examples");
const ROOT="/home/runner/work/_actions/zakarialaoui10/action-test/main"
const TARGET = path.join(__dirname, 'generated2.json');
console.log({ROOT,TARGET})
const tree = dir2tree(__dirname,{fileContent:true,sortBy:"extension",skipFile:["hh.txt"]});
console.log(process.cwd())
console.log(__dirname)

console.log(tree.tree)
tree.write("gen.json")
console.log("end")
module.exports=dir2tree
