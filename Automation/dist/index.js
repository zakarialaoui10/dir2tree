var $c5L0i$process = require("process");
var $c5L0i$fs = require("fs");
var $c5L0i$path = require("path");
var $c5L0i$mapfun = require("mapfun");




var $acd214a17c1b7398$exports = {};



var $acd214a17c1b7398$require$mapfun = $c5L0i$mapfun.mapfun;
var $acd214a17c1b7398$require$flat_obj = $c5L0i$mapfun.flat_obj;
var $c02e55c5993a1e05$exports = {};

function $c02e55c5993a1e05$var$should_skip_file(filePath) {
    const normalizedPath = $c5L0i$path.normalize(filePath);
    if (this?.options?.skip?.folder?.includes($c5L0i$path.basename(normalizedPath)) || this?.options?.skip?.file?.includes($c5L0i$path.basename(normalizedPath)) || this?.options?.skip?.extension?.includes($c5L0i$path.extname(normalizedPath).slice(1))) return true;
    return false;
}
function $c02e55c5993a1e05$var$should_skip_folder(filePath) {
    if (typeof filePath !== "string") return false;
    const normalizedPath = $c5L0i$path.normalize(filePath);
    if (this?.options?.skipFolder?.includes($c5L0i$path.basename(normalizedPath))) return true;
    return false;
}
$c02e55c5993a1e05$exports = {
    should_skip_file: $c02e55c5993a1e05$var$should_skip_file,
    should_skip_folder: $c02e55c5993a1e05$var$should_skip_folder
};


var $acd214a17c1b7398$require$should_skip_file = $c02e55c5993a1e05$exports.should_skip_file;
var $acd214a17c1b7398$require$should_skip_folder = $c02e55c5993a1e05$exports.should_skip_folder;
var $f3a0f1246671b32f$exports = {};


var $ebf6a5f0fca43f45$exports = {};


function $ebf6a5f0fca43f45$var$is_directory(filePath) {
    return $c5L0i$fs.statSync(filePath).isDirectory();
}
function $ebf6a5f0fca43f45$var$add_to_tree(key, value) {
    const keys = key.split($c5L0i$path.sep);
    const lastKeyIndex = keys.length - 1;
    keys.reduce((subtree, currentKey, index)=>{
        if (!subtree[currentKey]) subtree[currentKey] = index === lastKeyIndex ? value : {};
        return subtree[currentKey];
    }, this.tree);
}
$ebf6a5f0fca43f45$exports = {
    is_directory: $ebf6a5f0fca43f45$var$is_directory,
    add_to_tree: $ebf6a5f0fca43f45$var$add_to_tree
};


var $f3a0f1246671b32f$require$is_directory = $ebf6a5f0fca43f45$exports.is_directory;
function $f3a0f1246671b32f$var$sort_files(files, order = 1) {
    return files.sort((a, b)=>{
        const filePathA = $c5L0i$path.join(this.root, a);
        const filePathB = $c5L0i$path.join(this.root, b);
        // Check if either of the files is a directory and handle accordingly
        const isDirectoryA = $f3a0f1246671b32f$require$is_directory(filePathA);
        const isDirectoryB = $f3a0f1246671b32f$require$is_directory(filePathB);
        if (isDirectoryA && !isDirectoryB) return -1; // Directories come before files
        else if (!isDirectoryA && isDirectoryB) return 1; // Files come after directories
        if (isDirectoryA && isDirectoryB) return a.localeCompare(b); // Sort directories by name
        // If both are files, perform the sorting based on your criteria
        const statsA = $c5L0i$fs.statSync(filePathA);
        const statsB = $c5L0i$fs.statSync(filePathB);
        const extensionA = $c5L0i$path.extname(filePathA).slice(1);
        const extensionB = $c5L0i$path.extname(filePathB).slice(1);
        const linesA = $c5L0i$fs.readFileSync(filePathA, "utf8").split("\n").length;
        const linesB = $c5L0i$fs.readFileSync(filePathB, "utf8").split("\n").length;
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
$f3a0f1246671b32f$exports = {
    sort_files: $f3a0f1246671b32f$var$sort_files
};


var $acd214a17c1b7398$require$sort_files = $f3a0f1246671b32f$exports.sort_files;
var $a5f01444f2798fbe$exports = {};


var $a5f01444f2798fbe$require$is_directory = $ebf6a5f0fca43f45$exports.is_directory;

var $a5f01444f2798fbe$require$should_skip_file = $c02e55c5993a1e05$exports.should_skip_file;
function $a5f01444f2798fbe$var$filter_files(files) {
    return files.filter((file)=>{
        if ($a5f01444f2798fbe$require$is_directory($c5L0i$path.join(this.root, file))) return true; // Skip directories
        const filePath = $c5L0i$path.join(this.root, file);
        const shouldSkip = $a5f01444f2798fbe$require$should_skip_file.call(this, filePath);
        return !shouldSkip;
    });
}
$a5f01444f2798fbe$exports = {
    filter_files: $a5f01444f2798fbe$var$filter_files
};


var $acd214a17c1b7398$require$filter_files = $a5f01444f2798fbe$exports.filter_files;

var $acd214a17c1b7398$require$add_to_tree = $ebf6a5f0fca43f45$exports.add_to_tree;
var $2f6f2e19b56a8270$exports = {};

function $2f6f2e19b56a8270$var$file_metadata(filePath) {
    const stats = $c5L0i$fs.statSync(filePath);
    const metadata = {
        created: stats.birthtime,
        modified: stats.mtime,
        permissions: stats.mode
    };
    return metadata;
}
$2f6f2e19b56a8270$exports = {
    file_metadata: $2f6f2e19b56a8270$var$file_metadata
};


var $acd214a17c1b7398$require$file_metadata = $2f6f2e19b56a8270$exports.file_metadata;
class $acd214a17c1b7398$var$Dir2Tree {
    constructor(root, options = {}, callbacks = {}){
        this.root = root;
        this.options = options;
        this.callbacks = callbacks;
        this.tree = {};
        this.sortBy = options.sortBy || "name";
        this.generate();
    }
    generate() {
        const stats = $c5L0i$fs.statSync(this.root);
        if (!stats.isDirectory()) return null;
        const files = $c5L0i$fs.readdirSync(this.root);
        const FILTRED_FILES = $acd214a17c1b7398$require$filter_files.call(this, files);
        const SORTED_FILES = $acd214a17c1b7398$require$sort_files.call(this, FILTRED_FILES);
        SORTED_FILES.forEach((file)=>{
            const filePath = $c5L0i$path.join(this.root, file);
            if ($acd214a17c1b7398$require$should_skip_folder.call(this, file)) return;
            const fileStats = $c5L0i$fs.statSync(filePath);
            if (fileStats.isDirectory()) {
                const subDirectory = new $acd214a17c1b7398$var$Dir2Tree(filePath, this.options, this.callbacks);
                Object.assign(this.tree, {
                    [$c5L0i$path.basename(filePath)]: subDirectory.tree
                });
                return this;
            }
            const fileName = $c5L0i$path.parse(file).name;
            if ($acd214a17c1b7398$require$should_skip_file.call(this, filePath)) return;
            if (this.options?.fileContent) this.addFileInfo(filePath, fileName);
        });
        //this.tree=tree;
        return this.tree;
    }
    addFileInfo(filePath, fileName) {
        const content = $c5L0i$fs.readFileSync(filePath, "utf8");
        const fileInfo = {};
        const stats = {};
        const fullName = $c5L0i$path.basename(filePath);
        const [name, extension] = fullName.split(".");
        const length = $c5L0i$fs.statSync(filePath).size;
        const lines = content.split("\n").length;
        const metadata = $acd214a17c1b7398$require$file_metadata.call(this, filePath);
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
        $acd214a17c1b7398$require$add_to_tree.call(this, fileName + "_" + extension, fileInfo);
    }
    write(Target, filename) {
        const jsonTree = JSON.stringify(this.tree, null, 2); // Pretty-print the JSON
        const filePath = $c5L0i$path.join(Target, filename); // Construct the file path
        $c5L0i$fs.writeFileSync(filePath, jsonTree, "utf8");
        console.log(`Tree written to ${filePath}`);
        return this;
    }
    flat(depth = 1, separator = "_") {
        this.tree = $acd214a17c1b7398$require$flat_obj(this.tree, depth, separator);
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
        this.tree = $acd214a17c1b7398$require$mapfun(callback, options, this.tree);
        return this;
    }
}
const $acd214a17c1b7398$var$dir2tree = (root, options, callbacks = [])=>new $acd214a17c1b7398$var$Dir2Tree(root, options, callbacks);
$acd214a17c1b7398$exports = $acd214a17c1b7398$var$dir2tree;


const $43d7963e56408b24$var$ROOT = $c5L0i$path.join($c5L0i$process.cwd(), ".", "Articles");
const $43d7963e56408b24$var$TARGET = $c5L0i$path.join($c5L0i$process.cwd(), "Target");
console.log({
    ROOT: $43d7963e56408b24$var$ROOT,
    TARGET: $43d7963e56408b24$var$TARGET
});
const $43d7963e56408b24$var$MyTree = $acd214a17c1b7398$exports($43d7963e56408b24$var$ROOT, {
    fileContent: true,
    sortBy: "extension",
    skipFile: [
        "ger.md"
    ],
    skipFolder: [
        "to be skipped"
    ],
    skipExtension: [
        "sd"
    ]
});
console.log($43d7963e56408b24$var$MyTree.tree);
$43d7963e56408b24$var$MyTree.write($c5L0i$process.cwd(), "generated.json");


//# sourceMappingURL=index.js.map
