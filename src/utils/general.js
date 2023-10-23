const fs=require("fs");
function isDirectory(filePath) {
    return fs.statSync(filePath).isDirectory();
  }
module.exports={isDirectory}
