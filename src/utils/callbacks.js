const fs=require("fs")
const path=require("path")
// Native 

// Marked.js
const markdown_to_html=(filePath,fileInfo)=>{
    const extension = path.basename(filePath).split(".")[1];
    if(marked && extension=="md")fileInfo.html=marked.parse(fs.readFileSync(filePath,"utf-8"));
}
// Highlight.js
const highlight=()=>
// Crypto.js
const crypt=()=>{}
const decrypt=()=>{}
// Sheet.js
const xls2json=()={}
const json2xls=()={}
// 
const img2x=()=>{}
