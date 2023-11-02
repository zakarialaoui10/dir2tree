import path from "path" 
import dir2tree from "../dist/index.mjs"
const ROOT = path.join(process.cwd(),'.');
const TARGET = path.join(process.cwd(),".");
const MyTree = dir2tree(ROOT,{
  fileContent:true,
  sortBy:"extension",
  skipFile:["ger.md"],
  skipFolder:[".git","node_modules"],
  skipExtension:["json"],
},[]);
console.log(MyTree.tree2)
//MyTree.write(TARGET,"generated.json")

