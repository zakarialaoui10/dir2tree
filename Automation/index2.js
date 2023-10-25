var $gXNCa$fs = require("fs");
var $gXNCa$path = require("path");
var $gXNCa$mapfun = require("mapfun");




var $4fa36e821943b400$require$mapfun = $gXNCa$mapfun.mapfun;
var $4fa36e821943b400$require$flat_obj = $gXNCa$mapfun.flat_obj;
var $083da0a6cb76564f$exports = {};

function $083da0a6cb76564f$var$should_skip_file(filePath) {
    const normalizedPath = $gXNCa$path.normalize(filePath);
    if (this?.options?.skip?.folder?.includes($gXNCa$path.basename(normalizedPath)) || this?.options?.skip?.file?.includes($gXNCa$path.basename(normalizedPath)) || this?.options?.skip?.extension?.includes($gXNCa$path.extname(normalizedPath).slice(1))) return true;
    return false;
}
function $083da0a6cb76564f$var$should_skip_folder(filePath) {
    if (typeof filePath !== "string") return false;
    const normalizedPath = $gXNCa$path.normalize(filePath);
    if (this?.options?.skipFolder?.includes($gXNCa$path.basename(normalizedPath))) return true;
    return false;
}
$083da0a6cb76564f$exports = {
    should_skip_file: $083da0a6cb76564f$var$should_skip_file,
    should_skip_folder: $083da0a6cb76564f$var$should_skip_folder
};


var $4fa36e821943b400$require$should_skip_file = $083da0a6cb76564f$exports.should_skip_file;
var $4fa36e821943b400$require$should_skip_folder = $083da0a6cb76564f$exports.should_skip_folder;
var $368f798d88c5e03a$exports = {};


var $7d0016d2d3b14ec6$exports = {};


function $7d0016d2d3b14ec6$var$is_directory(filePath) {
    return $gXNCa$fs.statSync(filePath).isDirectory();
}
function $7d0016d2d3b14ec6$var$add_to_tree(key, value) {
    const keys = key.split($gXNCa$path.sep);
    const lastKeyIndex = keys.length - 1;
    keys.reduce((subtree, currentKey, index)=>{
        if (!subtree[currentKey]) subtree[currentKey] = index === lastKeyIndex ? value : {};
        return subtree[currentKey];
    }, this.tree);
}
$7d0016d2d3b14ec6$exports = {
    is_directory: $7d0016d2d3b14ec6$var$is_directory,
    add_to_tree: $7d0016d2d3b14ec6$var$add_to_tree
};


var $368f798d88c5e03a$require$is_directory = $7d0016d2d3b14ec6$exports.is_directory;
function $368f798d88c5e03a$var$sort_files(files, order = 1) {
    return files.sort((a, b)=>{
        const filePathA = $gXNCa$path.join(this.root, a);
        const filePathB = $gXNCa$path.join(this.root, b);
        // Check if either of the files is a directory and handle accordingly
        const isDirectoryA = $368f798d88c5e03a$require$is_directory(filePathA);
        const isDirectoryB = $368f798d88c5e03a$require$is_directory(filePathB);
        if (isDirectoryA && !isDirectoryB) return -1; // Directories come before files
        else if (!isDirectoryA && isDirectoryB) return 1; // Files come after directories
        if (isDirectoryA && isDirectoryB) return a.localeCompare(b); // Sort directories by name
        // If both are files, perform the sorting based on your criteria
        const statsA = $gXNCa$fs.statSync(filePathA);
        const statsB = $gXNCa$fs.statSync(filePathB);
        const extensionA = $gXNCa$path.extname(filePathA).slice(1);
        const extensionB = $gXNCa$path.extname(filePathB).slice(1);
        const linesA = $gXNCa$fs.readFileSync(filePathA, "utf8").split("\n").length;
        const linesB = $gXNCa$fs.readFileSync(filePathB, "utf8").split("\n").length;
        // Customize sorting based on sortBy option (name, size, created, modified, extension, lines, path, etc.)
        switch(this.sortBy.toLowerCase()){
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
$368f798d88c5e03a$exports = {
    sort_files: $368f798d88c5e03a$var$sort_files
};


var $4fa36e821943b400$require$sort_files = $368f798d88c5e03a$exports.sort_files;
var $8634600a4677fd2c$exports = {};


var $8634600a4677fd2c$require$is_directory = $7d0016d2d3b14ec6$exports.is_directory;

var $8634600a4677fd2c$require$should_skip_file = $083da0a6cb76564f$exports.should_skip_file;
function $8634600a4677fd2c$var$filter_files(files) {
    return files.filter((file)=>{
        if ($8634600a4677fd2c$require$is_directory($gXNCa$path.join(this.root, file))) return true; // Skip directories
        const filePath = $gXNCa$path.join(this.root, file);
        const shouldSkip = $8634600a4677fd2c$require$should_skip_file.call(this, filePath);
        return !shouldSkip;
    });
}
$8634600a4677fd2c$exports = {
    filter_files: $8634600a4677fd2c$var$filter_files
};


var $4fa36e821943b400$require$filter_files = $8634600a4677fd2c$exports.filter_files;

var $4fa36e821943b400$require$add_to_tree = $7d0016d2d3b14ec6$exports.add_to_tree;
var $977d2a143a124b57$exports = {};

function $977d2a143a124b57$var$file_metadata(filePath) {
    const stats = $gXNCa$fs.statSync(filePath);
    const metadata = {
        created: stats.birthtime,
        modified: stats.mtime,
        permissions: stats.mode
    };
    return metadata;
}
$977d2a143a124b57$exports = {
    file_metadata: $977d2a143a124b57$var$file_metadata
};


var $4fa36e821943b400$require$file_metadata = $977d2a143a124b57$exports.file_metadata;
class $4fa36e821943b400$var$Dir2Tree {
    constructor(root, options = {}, callbacks = {}){
        this.root = root;
        this.options = options;
        this.callbacks = callbacks;
        this.tree = {};
        this.sortBy = options.sortBy || "name";
        this.generate();
    }
    generate() {
        const stats = $gXNCa$fs.statSync(this.root);
        if (!stats.isDirectory()) return null;
        const files = $gXNCa$fs.readdirSync(this.root);
        const FILTRED_FILES = $4fa36e821943b400$require$filter_files.call(this, files);
        const SORTED_FILES = $4fa36e821943b400$require$sort_files.call(this, FILTRED_FILES);
        SORTED_FILES.forEach((file)=>{
            const filePath = $gXNCa$path.join(this.root, file);
            if ($4fa36e821943b400$require$should_skip_folder.call(this, file)) return;
            const fileStats = $gXNCa$fs.statSync(filePath);
            if (fileStats.isDirectory()) {
                const subDirectory = new $4fa36e821943b400$var$Dir2Tree(filePath, this.options, this.callbacks);
                Object.assign(this.tree, {
                    [$gXNCa$path.basename(filePath)]: subDirectory.tree
                });
                return this;
            }
            const fileName = $gXNCa$path.parse(file).name;
            if ($4fa36e821943b400$require$should_skip_file.call(this, filePath)) return;
            if (this.options?.fileContent) this.addFileInfo(filePath, fileName);
        });
        //this.tree=tree;
        return this.tree;
    }
    addFileInfo(filePath, fileName) {
        const content = $gXNCa$fs.readFileSync(filePath, "utf8");
        const fileInfo = {};
        const stats = {};
        const fullName = $gXNCa$path.basename(filePath);
        const [name, extension] = fullName.split(".");
        const length = $gXNCa$fs.statSync(filePath).size;
        const lines = content.split("\n").length;
        const metadata = $4fa36e821943b400$require$file_metadata.call(this, filePath);
        if (this.options?.fileContent) Object.assign(fileInfo, {
            content: content
        });
        if (this.options?.fileExtension) Object.assign(fileInfo, {
            extension: extension
        });
        if (this.options?.fileName) Object.assign(fileInfo, {
            name: name
        });
        Object.assign(stats, {
            length: length
        });
        Object.assign(stats, {
            size: length / 1024
        });
        Object.assign(stats, {
            lines: lines
        });
        Object.assign(fileInfo, {
            stats: stats
        });
        Object.assign(fileInfo, {
            metadata: metadata
        });
        this?.callbacks?.map((n)=>n(filePath, fileInfo));
        $4fa36e821943b400$require$add_to_tree.call(this, fileName + "_" + extension, fileInfo);
    }
    write(Target, filename) {
        const jsonTree = JSON.stringify(this.tree, null, 2); // Pretty-print the JSON
        const filePath = $gXNCa$path.join(Target, filename); // Construct the file path
        $gXNCa$fs.writeFileSync(filePath, jsonTree, "utf8");
        console.log(`Tree written to ${filePath}`);
        return this;
    }
    flat(depth = 1, separator = "_") {
        this.tree = $4fa36e821943b400$require$flat_obj(this.tree, depth, separator);
        return this;
    }
    reduce() {
        return this;
    }
    sort() {
        return this;
    }
    filter() {
        return this;
    }
    map(callback, options = {}) {
        this.tree = $4fa36e821943b400$require$mapfun(callback, options, this.tree);
        return this;
    }
}
const $4fa36e821943b400$var$dir2tree = (root, options, callbacks = [])=>new $4fa36e821943b400$var$Dir2Tree(root, options, callbacks);
module.exports = $4fa36e821943b400$var$dir2tree;


//# sourceMappingURL=index_bundle.js.map

const fs=require("fs")
const path=require("path")
const dir2tree=$4fa36e821943b400$var$dir2tree;
const ROOT = path.join(process.cwd(),'..',"Articles");
const TARGET = path.join(process.cwd(),"..");
console.log({ROOT,TARGET})
const MyTree = dir2tree(ROOT,{
  fileContent:true,
  sortBy:"extension",
  skipFile:["ger.md"],
  skipFolder:["to be skipped"],
  skipExtension:["sd"],
});

console.log(MyTree.tree)
MyTree.write(TARGET,"generated.json")
