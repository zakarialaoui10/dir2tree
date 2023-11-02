import fs from 'fs';
import path from 'path';
import { mapfun, flat_obj } from 'mapfun';
import { should_skip_file, should_skip_folder } from './utils/skip.js';
import { sort_files } from './utils/sort.js';
import { filter_files } from './utils/filter.js';
import { add_to_tree } from './utils/general.js';
import { file_metadata } from './utils/stats.js';
import { clean_object } from './utils/object.js';

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
        Object.assign(this._tree,{[path.basename(filePath)]:subDirectory.tree})
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
    this._tree=flat_obj(this._tree,depth,separator);
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
    this._tree=mapfun(callback,options,this._tree);
    return this;
  }
}
const dir2tree = (root, options, callbacks=[]) => new Dir2Tree(root, options, callbacks);
export default dir2tree;
