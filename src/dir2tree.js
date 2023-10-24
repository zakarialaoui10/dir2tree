const fs = require("fs");
const path = require("path");
const {should_skip_file,should_skip_folder}=require("./utils/skip.js");
const {sort_files}=require("./utils/sort.js");
const {filter_files}=require("./utils/filter.js");
const {isDirectory}=require("./utils/general.js");
const {file_metadata}=require("./utils/stats.js");

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
class Dir2Tree {
  constructor(root, options = {}, callbacks = {}) {
    this.root = root;
    this.options = options;
    this.callbacks = callbacks;
    this.tree = {};
    this.sortBy = options.sortBy || "name";
    this.generate();
  }
  generate() {
    const stats = fs.statSync(this.root);
    if (!stats.isDirectory()) return null;
    const files = fs.readdirSync(this.root);
    const FILTRED_FILES = filter_files.call(this, files);
    const SORTED_FILES = sort_files.call(this, FILTRED_FILES);

    SORTED_FILES.forEach((file) => {
      const filePath = path.join(this.root, file);
      if(should_skip_folder.call(this,file))return;
      const fileStats = fs.statSync(filePath);
      if(fileStats.isDirectory()){
        const subDirectory = new Dir2Tree(
          filePath,
          this.options,
          this.callbacks
        );
        Object.assign(this.tree,{[path.basename(filePath)]:subDirectory.tree})
        return this
      }
      const fileName = path.parse(file).name;
      if (should_skip_file.call(this, filePath)) return;
        if (this.options?.fileContent) {
          this.addFileInfo(filePath, fileName);
        }
      
    });
    //this.tree=tree;
    return this.tree;
  }
  addFileInfo(filePath, fileName) {
    const content = fs.readFileSync(filePath, "utf8");
    const fileInfo = {};
    const stats = {};
    const fullName = path.basename(filePath);
    const [name, extension] = fullName.split(".");
    const length = fs.statSync(filePath).size;
    const lines = content.split("\n").length;
    const metadata = file_metadata.call(this, filePath);
    if (this.options?.fileContent) Object.assign(fileInfo, { content });
    if (this.options?.fileExtension) Object.assign(fileInfo, { extension });
    if (this.options?.fileName) Object.assign(fileInfo, { name });
    Object.assign(stats, { length });
    Object.assign(stats, { size: length / 1024 });
    Object.assign(stats, { lines });
    Object.assign(fileInfo, { stats });
    Object.assign(fileInfo, { metadata });
    this?.callbacks?.map((n) => n(filePath, fileInfo));
    add_to_tree.call(this,fileName, fileInfo);
  }
  
  write(Target, filename) {
    const jsonTree = JSON.stringify(this.tree, null, 2); // Pretty-print the JSON
    const filePath = path.join(Target, filename); // Construct the file path
    fs.writeFileSync(filePath, jsonTree, 'utf8');
    console.log(`Tree written to ${filePath}`);
    return this;
  }
}
module.exports = Dir2Tree;
