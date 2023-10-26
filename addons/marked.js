const {require_if_installed}=require("./utils.js");
const path=require("path");
const fs=require("fs");
const marked=require_if_installed("marked");
const markdown_to_html=(filePath,fileInfo)=>{
  const extension = path.basename(filePath).split(".")[1];
  if(marked && extension=="md")fileInfo.html=marked.parse(fs.readFileSync(filePath,"utf-8"));
}
module.exports={markdown_to_html}