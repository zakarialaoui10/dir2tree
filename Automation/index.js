import fs from "fs"
import path from "path" 
import dir2tree from "../dist/index.mjs"
const ROOT = path.join(process.cwd(),'.');
const TARGET = path.join(process.cwd(),".");
const MyTree = dir2tree(ROOT,{
  fileContent:false,
  sortBy:"extension",
  skipFile:["ger.md"],
  skipFolder:[".git","node_modules"],
  skipExtension:["json"],
},[]);

console.log(MyTree.tree)
MyTree.write(TARGET,"generated.json")
