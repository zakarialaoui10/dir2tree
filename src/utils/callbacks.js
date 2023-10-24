const fs=require("fs")
const path=require("path")
// Native 

// Marked
const markdown_to_html=(filePath,fileInfo)=>{
    const extension = path.basename(filePath).split(".")[1];
    if(marked && extension=="md")fileInfo.html=marked.parse(fs.readFileSync(filePath,"utf-8"));
}
// Highlight
const highlight=()=>
// Crypto
const crypt=()=>{}
const decrypt=()=>{}
