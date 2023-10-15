const fs = require("fs");
const path = require("path");
function shouldSkipPath(filePath) {
  const normalizedPath = path.normalize(filePath);
  if (
    this?.options?.skipFolder?.includes(path.basename(normalizedPath)) ||
    this?.options?.skipFile?.includes(path.basename(normalizedPath)) ||
    this?.options?.skipExtension?.includes(
      path.extname(normalizedPath).slice(1)
    )
  )
    return true;
  return false;
}
function file_metadata(filePath) {
  const stats = fs.statSync(filePath);
  const metadata = {
    created: stats.birthtime,
    modified: stats.mtime,
    permissions: stats.mode,
  };
  return metadata;
}
function filter_files(files) {
  return files.filter((file) => {
    const filePath = path.join(this.root, file);
    const shouldSkip = shouldSkipPath.call(this, filePath);
    return !shouldSkip;
  });
}
function sort_files(files, order = 1) {
  return files.sort((a, b) => {
    const filePathA = path.join(this.root, a);
    const filePathB = path.join(this.root, b);
    const statsA = fs.statSync(filePathA);
    const statsB = fs.statSync(filePathB);
    const extensionA = path.extname(filePathA).slice(1);
    const extensionB = path.extname(filePathB).slice(1);
    const linesA = fs.readFileSync(filePathA, "utf8").split("\n").length;
    const linesB = fs.readFileSync(filePathB, "utf8").split("\n").length;

    // Customize sorting based on sortBy option (name, size, modified, etc.)
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
    // Filter files and directories based on options
    const FILTRED_FILES = filter_files.call(this, files);
    // Sort the filtered files and directories
    const SORTED_FILES = sort_files.call(this, FILTRED_FILES);

    SORTED_FILES.forEach((file) => {
      const filePath = path.join(this.root, file);
      const fileStats = fs.statSync(filePath);
      const fileName = path.parse(file).name;
      //const shouldSkip = shouldSkipPath.call(this,filePath);
      if (shouldSkipPath.call(this, filePath)) return;
      if (fileStats.isDirectory()) {
        const subDirectory = new Dir2Tree(
          filePath,
          this.options,
          this.callbacks
        );
        const subTree = subDirectory.generate();
        this.addToTree(this.tree, fileName, subTree);
      } else {
        if (this.options?.fileContent) {
          this.addFileInfo(filePath, fileName);
        }
      }
    });
    //this.tree=tree;
    return this;
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
    this.addToTree(fileName, fileInfo);
  }
  addToTree(key, value) {
    const keys = key.split(path.sep);
    const lastKeyIndex = keys.length - 1;
    keys.reduce((subtree, currentKey, index) => {
      if (!subtree[currentKey]) {
        subtree[currentKey] = index === lastKeyIndex ? value : {};
      }
      return subtree[currentKey];
    }, this.tree);
  }
}
module.exports = Dir2Tree;
