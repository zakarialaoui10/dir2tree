const fs=require("fs")
const path=require("path")
const Dir2Tree=require("../src/index.js")
const dir2tree = (root, options, callbacks=[]) => new Dir2Tree(root, options, callbacks);
const ROOT = path.join(process.cwd(),'.',"Articles");
const TARGET = path.join(process.cwd(),"Target");
console.log({ROOT,TARGET})
const MyTree = dir2tree(ROOT,{
  fileContent:true,
  sortBy:"extension",
  skipFile:["ger.md"],
  skipFolder:["to be skipped"],
  skipExtension:["sd"],
});

console.log(MyTree.tree)
MyTree.write(process.cwd(),"generated.json")

