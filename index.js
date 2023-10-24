/*
Developped by zakaria elaloui
Github : https://github.com/zakarialaoui10
*/
/*
const fs = require('fs');
const path = require('path');
*/
const Dir2Tree=require("./src/dir2tree.js")
const dir2tree = (root, options, callbacks=[]) => new Dir2Tree(root, options, callbacks);

module.exports=dir2tree
