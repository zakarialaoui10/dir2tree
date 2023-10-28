import fs from 'fs';
import path from 'path';
function is_directory(filePath) {
    return fs.statSync(filePath).isDirectory();
  }
function add_to_tree(key, value) {
  const keys = key.split(path.sep);
  const lastKeyIndex = keys.length - 1;
  keys.reduce((subtree, currentKey, index) => {
    if (!subtree[currentKey]) {
      subtree[currentKey] = index === lastKeyIndex ? value : {};
    }
    return subtree[currentKey];
  }, this.tree);
}
export{is_directory,add_to_tree}
