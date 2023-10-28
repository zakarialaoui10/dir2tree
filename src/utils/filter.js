import path from 'path';
import {is_directory} from "./general.js";
import {should_skip_file} from "./skip.js";
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
export{filter_files}
