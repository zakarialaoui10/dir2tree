var $c5L0i$process = require("process");
require("fs");
var $c5L0i$path = require("path");
var $c5L0i$dir2tree = require("dir2tree");





const $43d7963e56408b24$var$ROOT = $c5L0i$path.join($c5L0i$process.cwd(), ".", "Articles");
const $43d7963e56408b24$var$TARGET = $c5L0i$path.join($c5L0i$process.cwd(), "Target");
console.log({
    ROOT: $43d7963e56408b24$var$ROOT,
    TARGET: $43d7963e56408b24$var$TARGET
});
const $43d7963e56408b24$var$MyTree = $c5L0i$dir2tree($43d7963e56408b24$var$ROOT, {
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
