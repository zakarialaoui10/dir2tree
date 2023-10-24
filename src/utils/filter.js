const path=require("path");
const {is_directory}=require("./general.js");
const {should_skip_file}=require("./skip.js")
function filter_files(files) {
    return files.filter((file) => {
      if (is_directory(path.join(this.root, file))) {
        return true; // Skip directories
      }
      const filePath = path.join(this.root, file);
      const shouldSkip = should_skip_file.call(this, filePath);
      return !shouldSkip;
    });
  }
module.exports={filter_files}
