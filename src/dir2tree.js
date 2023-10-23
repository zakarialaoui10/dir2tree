const fs = require("fs");
const path = require("path");
const {should_skip_file,should_skip_folder}=require("./utils/skip.js")

function isDirectory(filePath) {
  return fs.statSync(filePath).isDirectory();
}
function filter_files(files) {
  return files.filter((file) => {
    if (isDirectory(path.join(this.root, file))) {
      return true; // Skip directories
    }
    const filePath = path.join(this.root, file);
    const shouldSkip = should_skip_file.call(this, filePath);
    return !shouldSkip;
  });
}
function sort_files(files, order = 1) {
  return files.sort((a, b) => {
    const filePathA = path.join(this.root, a);
    const filePathB = path.join(this.root, b);

    // Check if either of the files is a directory and handle accordingly
    const isDirectoryA = isDirectory(filePathA);
    const isDirectoryB = isDirectory(filePathB);

    if (isDirectoryA && !isDirectoryB) {
      return -1; // Directories come before files
    } else if (!isDirectoryA && isDirectoryB) {
      return 1; // Files come after directories
    }

    if (isDirectoryA && isDirectoryB) {
      return a.localeCompare(b); // Sort directories by name
    }

    // If both are files, perform the sorting based on your criteria
    const statsA = fs.statSync(filePathA);
    const statsB = fs.statSync(filePathB);
    const extensionA = path.extname(filePathA).slice(1);
    const extensionB = path.extname(filePathB).slice(1);
    const linesA = fs.readFileSync(filePathA, "utf8").split("\n").length;
    const linesB = fs.readFileSync(filePathB, "utf8").split("\n").length;

    // Customize sorting based on sortBy option (name, size, created, modified, extension, lines, path, etc.)
    switch (this.sortBy.toLowerCase()) {
      case "name":
        return order * a.localeCompare(b);
      case "size":
        return order * (statsA.size - statsB.size);
      case "created":
        return order * (statsA.birthtime - statsB.birthtime);
      case "modified":
        return order * (statsA.mtime.getTime() - statsB.mtime.getTime());
      case "extension":
        return order * extensionA.localeCompare(extensionB);
      case "lines":
        return order * (linesA - linesB);
      case "path":
        return order * filePathB.localeCompare(filePathA);
      default:
        return 0;
    }
  });
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
  
  write(filename) {
    const jsonTree = JSON.stringify(this.tree, null, 2); // Pretty-print the JSON
    const filePath = path.join(__dirname, filename); // Construct the file path using __dirname
    fs.writeFileSync(filePath, jsonTree, 'utf8');
    console.log(`Tree written to ${filePath}`);
    return this;
  }
}
module.exports = Dir2Tree;
