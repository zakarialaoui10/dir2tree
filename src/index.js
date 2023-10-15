const fs = require('fs');
const path = require('path');
function shouldSkipPath(filePath){
  const normalizedPath = path.normalize(filePath);
  if(
  (this?.options?.skipFolder?.includes(path.basename(normalizedPath))) ||
  (this?.options?.skipFile?.includes(path.basename(normalizedPath))) ||
  (this?.options?.skipExtension?.includes(path.extname(normalizedPath).slice(1)))
)return true;
return false;
}
function filter_files(files){
  return files.filter((file) => {
    const filePath = path.join(this.root, file);
    const shouldSkip = shouldSkipPath.call(this, filePath);
    return !shouldSkip;
  });
}
function sort_files(files){
  return files.sort((a, b) => {
    const filePathA = path.join(this.root, a);
    const filePathB = path.join(this.root, b);
    const statsA = fs.statSync(filePathA);
    const statsB = fs.statSync(filePathB);

    // Customize sorting based on sortBy option (name, size, modified, etc.)
    if (this.sortBy === 'name') {
      return a.localeCompare(b);
    } else if (this.sortBy === 'size') {
      return statsA.size - statsB.size;
    } else if (this.sortBy === 'modified') {
      return statsA.mtime.getTime() - statsB.mtime.getTime();
    }
    // Add other sorting options as needed

    return 0; // No sorting
  });
}
class Dir2Tree {
    constructor(root, options = {}={}, callbacks = {}) {
      this.root = root;
      this.options = options;
      this.callbacks = callbacks;
      this.tree={};
      this.sortBy = options.sortBy || 'name'; // Default to sorting by name
      this.generate()
    }
    generate() {
      const stats = fs.statSync(this.root);
      if (!stats.isDirectory())return null; 
      const files = fs.readdirSync(this.root);
  // Filter files and directories based on options
  const FILTRED_FILES = filter_files.call(this,files)
  // Sort the filtered files and directories
  const SORTED_FILES = sort_files.call(this,FILTRED_FILES)


  SORTED_FILES.forEach((file) => {
        const filePath = path.join(this.root, file);
        const fileStats = fs.statSync(filePath);
        const fileName = path.parse(file).name;
        //const shouldSkip = shouldSkipPath.call(this,filePath);
        if (shouldSkipPath.call(this,filePath))return;
        if (fileStats.isDirectory()) {
          const subDirectory = new Dir2Tree(filePath, this.options, this.callbacks);
          const subTree = subDirectory.generate(); 
          this.addToTree(this.tree, fileName, subTree); 
        } else {         
          if(this.options?.fileContent){
           this.addFileInfo(filePath,fileName);
          }
        }
      }); 
      //this.tree=tree;
      return this;
    }
    addFileInfo(filePath,fileName){
          const content = fs.readFileSync(filePath, 'utf8');
          const fileInfo = {};
          const stats={}
          const fullName=path.basename(filePath);
          const [name,extension]=fullName.split(".");
          const length=fs.statSync(filePath).size;
          const lines=content.split("\n").length;
          const metadata = this.getMetadata(filePath);
          if(this.options?.fileContent)Object.assign(fileInfo,{content}); 
          if(this.options?.fileExtension)Object.assign(fileInfo,{extension});
          if(this.options?.fileName)Object.assign(fileInfo,{name});  
          Object.assign(stats,{length})
          Object.assign(stats,{size:length/1024});
          Object.assign(stats,{lines});  
          Object.assign(fileInfo,{stats});
          Object.assign(fileInfo, { metadata });
          this?.callbacks?.map(n=>n(filePath, fileInfo));
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
    getMetadata(filePath) {
      const stats = fs.statSync(filePath);
      const metadata = {
        created: stats.birthtime,
        modified: stats.mtime,
        permissions: stats.mode,
      };
      return metadata;
    }
  }
const dir2tree=(root, options, callbacks)=>new Dir2Tree(root, options, callbacks);
module.exports=dir2tree;
