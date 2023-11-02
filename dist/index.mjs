import fs from 'fs';
import path from 'path';

var Javascript = {exports: {}};

/*
Developped by zakaria elaloui
Github : https://github.com/zakarialaoui10
*/

(function (module, exports) {
	function flat_obj(obj,depth=Infinity,separator = '.', replacement = '_') {
	    const result = {};
	    let i=0;
	    function recurse(current, path = []) {
	        if(i===depth){
	            Object.assign(result,current);
	            return ;
	        }
	      for (const key in current) {
	        const value = current[key];
	        const newPath = [...path, key];
	        if (typeof value === 'object' && !Array.isArray(value)) {
	          recurse(value, newPath);
	        } else {
	          const flatKey = newPath.join(separator).replace(new RegExp(`\\${separator}`, 'g'), replacement);
	          result[flatKey] = value;
	        }
	        i++;
	      }
	    }
	    recurse(obj);
	    return result;
	}
	const mapfun = (fun, { skip = [], key = false, value = true } = {}, ...X) => {
	  const Y = X.map((x) => {
	    if (typeof skip === 'string'||[null,undefined].includes(skip))skip=[skip];
	      const skipPrimitives = [];
	      const skipObjects = [];
	      skip.forEach((element) =>(typeof element==="object"&&element !==null)?skipObjects.push(element):skipPrimitives.push(element));
	        if(skipPrimitives.includes(typeof x)||skipPrimitives.includes(x)) return x;
	        if(skipObjects.some(n=>x instanceof n))return x;
	    if (x === null) return fun(null);
	    if (['number', 'string', 'boolean', 'bigint', 'undefined'].includes(typeof x)) return fun(x);
	    if (typeof(x)==="symbol") throw new Error('symbols are not supported yet !');
	    if (x instanceof Array) return x.map((n) => mapfun(fun,{},n));
	    if (ArrayBuffer.isView(x)) return Array.from(x).map((n) => fun(n));
	    if (x instanceof Set) return new Set(mapfun(fun,{},...[...x]));
	    if (x instanceof WeakSet) throw new Error('WeakSets not supported yet !');
	    if (x instanceof WeakMap) throw new Error('WeakMaps not supported yet !');
	    if (x instanceof Map) return new Map([...x].map(n =>{
	        return [
	            key ? mapfun(fun,{},n[0]) : n[0],
	            value ? mapfun(fun,{},n[1]) : n[1],
	            ]
	    }));
	    if (x instanceof Object) return Object.fromEntries(
	      Object.entries(x).map(([KEY, VALUE]) => [
	        key?mapfun(fun,{},KEY):KEY,
	        value?mapfun(fun,{},VALUE):VALUE
	      ])
	    )
	    else throw new Error('Uncategorised data');
	  });
	    return Y.length === 1 ? Y[0] : Y;
	};
	{
	  module.exports = {mapfun,flat_obj} ;
	} 
} (Javascript));

var JavascriptExports = Javascript.exports;

function should_skip_file(filePath) {
    const normalizedPath = path.normalize(filePath);
    if (
      this?.options?.skip?.folder?.includes(path.basename(normalizedPath)) ||
      this?.options?.skip?.file?.includes(path.basename(normalizedPath)) ||
      this?.options?.skip?.extension?.includes(
        path.extname(normalizedPath).slice(1)
      )
    )return true;
    return false;
  }
function should_skip_folder(filePath) {
  if (typeof filePath !== 'string') return false;
  const normalizedPath = path.normalize(filePath);
  if (this?.options?.skipFolder?.includes(path.basename(normalizedPath)))
    return true;
  return false;
  }

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
  }, this._tree);
}

function sort_files(files, order = 1) {
    return files.sort((a, b) => {
      const filePathA = path.join(this.root, a);
      const filePathB = path.join(this.root, b);
  
      // Check if either of the files is a directory and handle accordingly
      const isDirectoryA = is_directory(filePathA);
      const isDirectoryB = is_directory(filePathB);
  
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

function file_metadata(filePath) {
    const stats = fs.statSync(filePath);
    const metadata = {
      created: Date.parse(stats.birthtime),
      modified: Date.parse(stats.mtime),
    };
    return metadata;
  }

function clean_object(obj, keyToRemove) {
    if (typeof obj !== 'object' || obj === null) {
      return obj;
    }  
    const result = {};
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (key !== keyToRemove) {
          result[key] = clean_object(obj[key], keyToRemove);
        }
      }
    }
    return result;
  }

class Dir2Tree {
  constructor(root, options = {}, callbacks = {}) {
    this.root = root;
    this.options = options;
    this.callbacks = callbacks;
    this._tree = {};
    this.sortBy = options.sortBy || "name";
    this.generate();
  }
  get tree(){
    return clean_object(this._tree,"content")
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
        Object.assign(this._tree,{[path.basename(filePath)]:subDirectory.tree});
        return this
      }
      const fileName = path.parse(file).name;
      if (should_skip_file.call(this, filePath)) return;
        if (this.options?.fileContent) {
          this.addFileInfo(filePath, fileName);
        }
      
    });
    //this._tree=tree;
    return this._tree;
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
    add_to_tree.call(this,fileName+"_"+extension, fileInfo);
  }
  
  write(Target, filename) {
    const jsonTree = JSON.stringify(this._tree, null, 2); // Pretty-print the JSON
    const filePath = path.join(Target, filename); // Construct the file path
    fs.writeFileSync(filePath, jsonTree, 'utf8');
    console.log(`Tree written to ${filePath}`);
    return this;
  }
  flat(depth=1,separator="_"){
    this._tree=JavascriptExports.flat_obj(this._tree,depth,separator);
    return this;
  }
  reduce(){
    return this;
  }
  sort(){
    return this;
  }
  filter(){
    return this;
  }
  map(callback,options={}){
    this._tree=JavascriptExports.mapfun(callback,options,this._tree);
    return this;
  }
}
const dir2tree = (root, options, callbacks=[]) => new Dir2Tree(root, options, callbacks);

export { dir2tree as default };
