const fs = require('fs');
const path = require('path');
const dir2tree=require("../index.js")
const ROOT = path.join(__dirname,'.',"Js");
const TARGET = path.join(__dirname, 'generated2.json');
//const W=watch(ROOT).start()
const callbacks = [
    a=(filePath, fileInfo) => {
      fileInfo.content2=fs.readFileSync(filePath, 'utf8');
    },
  ]
const tree = dir2tree(ROOT,{fileContent:true,sortBy:"created"},callbacks);
tree.write("gen.json")
//fs.writeFileSync(TARGET,JSON.stringify(tree,null,2));
//console.log(1111111111)
//console.log(tree);
//console.log(1111111111111)
//console.log(asm)
console.log(1)
