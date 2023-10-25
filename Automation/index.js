const path=require("path")
const dir2tree=require("../src/index.js")
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

