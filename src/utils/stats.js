const fs=require("fs");
function file_metadata(filePath) {
    const stats = fs.statSync(filePath);
    const metadata = {
      created: stats.birthtime,
      modified: stats.mtime,
      permissions: stats.mode,
    };
    return metadata;
  }
module.exports={file_metadata}
