const fs = require('fs');
const path = require('path');
class Dir2Tree {
    constructor(root, options = {}={}, callbacks = {}) {
      this.root = root;
      this.options = options;
      this.callbacks = callbacks;
      this.tree={}
      this.generate()
    }
    generate() {
      const stats = fs.statSync(this.root);
      if (!stats.isDirectory())return null; 
      const files = fs.readdirSync(this.root);
      files.forEach((file) => {
        const filePath = path.join(this.root, file);
        const fileStats = fs.statSync(filePath);
        const fileName = path.parse(file).name;
        const shouldSkip = this.shouldSkipPath(filePath);
        if (shouldSkip)return;
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
          if(this.options?.fileContent)Object.assign(fileInfo,{content}); 
          if(this.options?.fileExtension)Object.assign(fileInfo,{extension});
          if(this.options?.fileName)Object.assign(fileInfo,{name});  
          Object.assign(stats,{length})
          Object.assign(stats,{size:length/1024});
          Object.assign(stats,{lines});  
          Object.assign(fileInfo,{stats})
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
    shouldSkipPath(filePath) {
      const normalizedPath = path.normalize(filePath);
        if (
        (this.options.skipFolder && this.options.skipFolder.includes(path.basename(normalizedPath))) ||
        (this.options.skipFile && this.options.skipFile.includes(path.basename(normalizedPath))) ||
        (this.options.skipExtension && this.options.skipExtension.includes(path.extname(normalizedPath).slice(1)))
      ) {
        return true;
      }  
      return false;
    }
  }
const dir2tree=(root, options, callbacks)=>new Dir2Tree(root, options, callbacks);
module.exports=dir2tree;
