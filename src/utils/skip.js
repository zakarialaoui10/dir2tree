const path = require("path");
function should_skip_file(filePath) {
    const normalizedPath = path.normalize(filePath);
    if (
      this?.options?.skipFolder?.includes(path.basename(normalizedPath)) ||
      this?.options?.skipFile?.includes(path.basename(normalizedPath)) ||
      this?.options?.skipExtension?.includes(
        path.extname(normalizedPath).slice(1)
      )
    )return true;
    return false;
  }
function should_skip_folder(filePath) {
    if (typeof filePath !== 'string') {
      return false;
    }
  
    const normalizedPath = path.normalize(filePath);
  
    if (this?.options?.skipFolder?.includes(path.basename(normalizedPath))) {
      return true;
    }
  
    return false;
  }
module.exports={should_skip_file,should_skip_folder}
