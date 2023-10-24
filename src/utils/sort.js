const path=require("path");
const fs=require("fs")
const {is_directory}=require("./general.js");
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

module.exports={sort_files}
