import path from "path" 
import dir2tree from "../dist/index.mjs"
import { getRelativePath } from "../dist/index.mjs";
const BaseDir = process.cwd();
const ROOT = path.join(process.cwd(),'./articles');
const TARGET = path.join(process.cwd(),".");

// const ROOT = path.join(import.meta.url, ".", "Articles");
// const TARGET = path.join(import.meta.url, "Target");
console.log(BaseDir)

const MyTree = dir2tree(ROOT,{
  fileContent:true,
  // sortBy:"extension",
  // skipFile:["ger.md"],
  // skipFolder:[".git","node_modules"],
  // skipExtension:["json"],
}
,[e=>console.log(getRelativePath(BaseDir,e))]
// [(_,b)=>console.log(_,b)]
);
MyTree.generate()
// console.log(MyTree.tree)
// MyTree.write(TARGET,"generated.json")
// MyTree.map(n=>console.log(n))
