const fs=require("fs")
const path=require("path")
const dir2tree=require("dir2tree")
const ROOT = path.join(process.cwd(),'.');
const TARGET = path.join(process.cwd(),".");
const MyTree = dir2tree(ROOT,{
  fileContent:true,
  sortBy:"extension",
  skipFile:["ger.md"],
  skipFolder:["to be skipped"],
  skipExtension:["json"],
});

console.log(MyTree.tree)
MyTree.write(TARGET,"generated.json")

