const fs=require("fs");
const path=require("path");
const dir2tree=require("dir2tree");
const {markdown_to_html}=require("../addons/marked.js")
const ROOT = path.join(process.cwd(),'.');
const TARGET = path.join(process.cwd(),".");
const MyTree = dir2tree(ROOT,{
  fileContent:true,
  sortBy:"extension",
  skipFile:["ger.md"],
  skipFolder:[".git","node_modules"],
  skipExtension:["json"],
},[markdown_to_html]);

console.log(MyTree.tree)
MyTree.write(TARGET,"generated.json")

