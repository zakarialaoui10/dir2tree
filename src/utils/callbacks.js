// Native 

// Marked
const markdown_to_html=(filePath,fileInfo)=>{
  if(marked){
  return fileInfo.extension==="md"?marked.parse(fs.readFileSync(filePath,"utf-8"))
    }
}
// Highlight
const highlight=()=>
// Crypto
const crypt=()=>{}
const decrypt=()=>{}
