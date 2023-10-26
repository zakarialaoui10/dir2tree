var $cFoub$fs = require("fs");
var $cFoub$path = require("path");



var $697a68694f2aacad$exports = {};
/*
Developped by zakaria elaloui
Github : https://github.com/zakarialaoui10
*/ function $697a68694f2aacad$var$flat_obj(obj, depth = Infinity, separator = ".", replacement = "_") {
    const result = {};
    let i = 0;
    function recurse(current, path = []) {
        if (i === depth) {
            Object.assign(result, current);
            return;
        }
        for(const key in current){
            const value = current[key];
            const newPath = [
                ...path,
                key
            ];
            if (typeof value === "object" && !Array.isArray(value)) recurse(value, newPath);
            else {
                const flatKey = newPath.join(separator).replace(new RegExp(`\\${separator}`, "g"), replacement);
                result[flatKey] = value;
            }
            i++;
        }
    }
    recurse(obj);
    return result;
}
const $697a68694f2aacad$var$mapfun = (fun, { skip: skip = [], key: key = false, value: value = true } = {}, ...X)=>{
    const Y = X.map((x)=>{
        if (typeof skip === "string" || [
            null,
            undefined
        ].includes(skip)) skip = [
            skip
        ];
        const skipPrimitives = [];
        const skipObjects = [];
        skip.forEach((element)=>typeof element === "object" && element !== null ? skipObjects.push(element) : skipPrimitives.push(element));
        if (skipPrimitives.includes(typeof x) || skipPrimitives.includes(x)) return x;
        if (skipObjects.some((n)=>x instanceof n)) return x;
        if (x === null) return fun(null);
        if ([
            "number",
            "string",
            "boolean",
            "bigint",
            "undefined"
        ].includes(typeof x)) return fun(x);
        if (typeof x === "symbol") throw new Error("symbols are not supported yet !");
        if (x instanceof Array) return x.map((n)=>$697a68694f2aacad$var$mapfun(fun, {}, n));
        if (ArrayBuffer.isView(x)) return Array.from(x).map((n)=>fun(n));
        if (x instanceof Set) return new Set($697a68694f2aacad$var$mapfun(fun, {}, ...[
            ...x
        ]));
        if (x instanceof WeakSet) throw new Error("WeakSets not supported yet !");
        if (x instanceof WeakMap) throw new Error("WeakMaps not supported yet !");
        if (x instanceof Map) return new Map([
            ...x
        ].map((n)=>{
            return [
                key ? $697a68694f2aacad$var$mapfun(fun, {}, n[0]) : n[0],
                value ? $697a68694f2aacad$var$mapfun(fun, {}, n[1]) : n[1]
            ];
        }));
        if (x instanceof Object) return Object.fromEntries(Object.entries(x).map(([KEY, VALUE])=>[
                key ? $697a68694f2aacad$var$mapfun(fun, {}, KEY) : KEY,
                value ? $697a68694f2aacad$var$mapfun(fun, {}, VALUE) : VALUE
            ]));
        else throw new Error("Uncategorised data");
    });
    return Y.length === 1 ? Y[0] : Y;
};
$697a68694f2aacad$exports = {
    mapfun: $697a68694f2aacad$var$mapfun,
    flat_obj: $697a68694f2aacad$var$flat_obj
};


var $2776a60caf88deef$require$mapfun = $697a68694f2aacad$exports.mapfun;
var $2776a60caf88deef$require$flat_obj = $697a68694f2aacad$exports.flat_obj;
var $3d93cec531ae9d4c$exports = {};

function $3d93cec531ae9d4c$var$should_skip_file(filePath) {
    const normalizedPath = $cFoub$path.normalize(filePath);
    if (this?.options?.skip?.folder?.includes($cFoub$path.basename(normalizedPath)) || this?.options?.skip?.file?.includes($cFoub$path.basename(normalizedPath)) || this?.options?.skip?.extension?.includes($cFoub$path.extname(normalizedPath).slice(1))) return true;
    return false;
}
function $3d93cec531ae9d4c$var$should_skip_folder(filePath) {
    if (typeof filePath !== "string") return false;
    const normalizedPath = $cFoub$path.normalize(filePath);
    if (this?.options?.skipFolder?.includes($cFoub$path.basename(normalizedPath))) return true;
    return false;
}
$3d93cec531ae9d4c$exports = {
    should_skip_file: $3d93cec531ae9d4c$var$should_skip_file,
    should_skip_folder: $3d93cec531ae9d4c$var$should_skip_folder
};


var $2776a60caf88deef$require$should_skip_file = $3d93cec531ae9d4c$exports.should_skip_file;
var $2776a60caf88deef$require$should_skip_folder = $3d93cec531ae9d4c$exports.should_skip_folder;
var $82c6becc65ef4e6c$exports = {};


var $29ba264081b04b00$exports = {};


function $29ba264081b04b00$var$is_directory(filePath) {
    return $cFoub$fs.statSync(filePath).isDirectory();
}
function $29ba264081b04b00$var$add_to_tree(key, value) {
    const keys = key.split($cFoub$path.sep);
    const lastKeyIndex = keys.length - 1;
    keys.reduce((subtree, currentKey, index)=>{
        if (!subtree[currentKey]) subtree[currentKey] = index === lastKeyIndex ? value : {};
        return subtree[currentKey];
    }, this.tree);
}
$29ba264081b04b00$exports = {
    is_directory: $29ba264081b04b00$var$is_directory,
    add_to_tree: $29ba264081b04b00$var$add_to_tree
};


var $82c6becc65ef4e6c$require$is_directory = $29ba264081b04b00$exports.is_directory;
function $82c6becc65ef4e6c$var$sort_files(files, order = 1) {
    return files.sort((a, b)=>{
        const filePathA = $cFoub$path.join(this.root, a);
        const filePathB = $cFoub$path.join(this.root, b);
        // Check if either of the files is a directory and handle accordingly
        const isDirectoryA = $82c6becc65ef4e6c$require$is_directory(filePathA);
        const isDirectoryB = $82c6becc65ef4e6c$require$is_directory(filePathB);
        if (isDirectoryA && !isDirectoryB) return -1; // Directories come before files
        else if (!isDirectoryA && isDirectoryB) return 1; // Files come after directories
        if (isDirectoryA && isDirectoryB) return a.localeCompare(b); // Sort directories by name
        // If both are files, perform the sorting based on your criteria
        const statsA = $cFoub$fs.statSync(filePathA);
        const statsB = $cFoub$fs.statSync(filePathB);
        const extensionA = $cFoub$path.extname(filePathA).slice(1);
        const extensionB = $cFoub$path.extname(filePathB).slice(1);
        const linesA = $cFoub$fs.readFileSync(filePathA, "utf8").split("\n").length;
        const linesB = $cFoub$fs.readFileSync(filePathB, "utf8").split("\n").length;
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
$82c6becc65ef4e6c$exports = {
    sort_files: $82c6becc65ef4e6c$var$sort_files
};


var $2776a60caf88deef$require$sort_files = $82c6becc65ef4e6c$exports.sort_files;
var $0b90f1fd7064b3da$exports = {};


var $0b90f1fd7064b3da$require$is_directory = $29ba264081b04b00$exports.is_directory;

var $0b90f1fd7064b3da$require$should_skip_file = $3d93cec531ae9d4c$exports.should_skip_file;
function $0b90f1fd7064b3da$var$filter_files(files) {
    return files.filter((file)=>{
        if ($0b90f1fd7064b3da$require$is_directory($cFoub$path.join(this.root, file))) return true; // Skip directories
        const filePath = $cFoub$path.join(this.root, file);
        const shouldSkip = $0b90f1fd7064b3da$require$should_skip_file.call(this, filePath);
        return !shouldSkip;
    });
}
$0b90f1fd7064b3da$exports = {
    filter_files: $0b90f1fd7064b3da$var$filter_files
};


var $2776a60caf88deef$require$filter_files = $0b90f1fd7064b3da$exports.filter_files;

var $2776a60caf88deef$require$add_to_tree = $29ba264081b04b00$exports.add_to_tree;
var $30fb452386496690$exports = {};

function $30fb452386496690$var$file_metadata(filePath) {
    const stats = $cFoub$fs.statSync(filePath);
    const metadata = {
        created: stats.birthtime,
        modified: stats.mtime,
        permissions: stats.mode
    };
    return metadata;
}
$30fb452386496690$exports = {
    file_metadata: $30fb452386496690$var$file_metadata
};


var $2776a60caf88deef$require$file_metadata = $30fb452386496690$exports.file_metadata;
class $2776a60caf88deef$var$Dir2Tree {
    constructor(root, options = {}, callbacks = {}){
        this.root = root;
        this.options = options;
        this.callbacks = callbacks;
        this.tree = {};
        this.sortBy = options.sortBy || "name";
        this.generate();
    }
    generate() {
        const stats = $cFoub$fs.statSync(this.root);
        if (!stats.isDirectory()) return null;
        const files = $cFoub$fs.readdirSync(this.root);
        const FILTRED_FILES = $2776a60caf88deef$require$filter_files.call(this, files);
        const SORTED_FILES = $2776a60caf88deef$require$sort_files.call(this, FILTRED_FILES);
        SORTED_FILES.forEach((file)=>{
            const filePath = $cFoub$path.join(this.root, file);
            if ($2776a60caf88deef$require$should_skip_folder.call(this, file)) return;
            const fileStats = $cFoub$fs.statSync(filePath);
            if (fileStats.isDirectory()) {
                const subDirectory = new $2776a60caf88deef$var$Dir2Tree(filePath, this.options, this.callbacks);
                Object.assign(this.tree, {
                    [$cFoub$path.basename(filePath)]: subDirectory.tree
                });
                return this;
            }
            const fileName = $cFoub$path.parse(file).name;
            if ($2776a60caf88deef$require$should_skip_file.call(this, filePath)) return;
            if (this.options?.fileContent) this.addFileInfo(filePath, fileName);
        });
        //this.tree=tree;
        return this.tree;
    }
    addFileInfo(filePath, fileName) {
        const content = $cFoub$fs.readFileSync(filePath, "utf8");
        const fileInfo = {};
        const stats = {};
        const fullName = $cFoub$path.basename(filePath);
        const [name, extension] = fullName.split(".");
        const length = $cFoub$fs.statSync(filePath).size;
        const lines = content.split("\n").length;
        const metadata = $2776a60caf88deef$require$file_metadata.call(this, filePath);
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
        $2776a60caf88deef$require$add_to_tree.call(this, fileName + "_" + extension, fileInfo);
    }
    write(Target, filename) {
        const jsonTree = JSON.stringify(this.tree, null, 2); // Pretty-print the JSON
        const filePath = $cFoub$path.join(Target, filename); // Construct the file path
        $cFoub$fs.writeFileSync(filePath, jsonTree, "utf8");
        console.log(`Tree written to ${filePath}`);
        return this;
    }
    flat(depth = 1, separator = "_") {
        this.tree = $2776a60caf88deef$require$flat_obj(this.tree, depth, separator);
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
        this.tree = $2776a60caf88deef$require$mapfun(callback, options, this.tree);
        return this;
    }
}
const $2776a60caf88deef$var$dir2tree = (root, options, callbacks = [])=>new $2776a60caf88deef$var$Dir2Tree(root, options, callbacks);
module.exports = $2776a60caf88deef$var$dir2tree;


//# sourceMappingURL=index_bundle.js.map

const fs=require("fs")
const path=require("path")
const dir2tree=$2776a60caf88deef$var$dir2tree;
const ROOT = path.join(process.cwd(),'.');
const TARGET = path.join(process.cwd(),".");
console.log({ROOT,TARGET})
const config = JSON.parse(process.env.CONFIG);
console.log(config.key1);
const MyTree = dir2tree(ROOT,{
  fileContent:true,
  sortBy:"extension",
  skipFile:["ger.md"],
  skipFolder:["to be skipped"],
  skipExtension:["json"],
});

//console.log(MyTree.tree)
MyTree.write(TARGET,"generated.json")
