const dir2tree=require("dir2tree")
const fs=require("fs")
const path=require("path")

const ROOT = path.join(__dirname,'.',"Articles");
const TARGET = path.join(__dirname,"Target");

const MyTree = dir2tree(__dirname,{
  fileContent:true,
  sortBy:"extension",
  skipFile:["ger.md"],
  skipFolder:["to be skipped"],
  skipExtension:["sd"],
});

console.log(MyTree.tree)
MyTree.write(__dirname,"generated.json")
