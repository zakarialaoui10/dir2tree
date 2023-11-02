import fs from 'fs';
function file_metadata(filePath) {
    const stats = fs.statSync(filePath);
    const metadata = {
      created: Date.parse(stats.birthtime),
      modified: Date.parse(stats.mtime),
    };
    return metadata;
  }
export{file_metadata}
