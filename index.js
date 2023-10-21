/*
Developped by zakaria elaloui
Github : https://github.com/zakarialaoui10
*/
console.log("start")
const Dir2Tree=require("./src/dir2tree.js")
const dir2tree = (root, options, callbacks) => new Dir2Tree(root, options, callbacks);
const ROOT = path.join(__dirname,'.',"Examples");
const TARGET = path.join(__dirname, 'generated2.json');
const tree = dir2tree(ROOT,{fileContent:true,sortBy:"extension",skipFile:["hh.txt"]});
tree.write("gen.json")
consol.log("end")
module.exports=dir2tree

