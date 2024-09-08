const getRelativePath = (baseDir, absolutePath) => {
    baseDir = baseDir.replace(/\\/g, '/').replace(/\/$/, '');
    absolutePath = absolutePath.replace(/\\/g, '/');  
    if (absolutePath.startsWith(baseDir)) {
      return absolutePath.substring(baseDir.length).replace(/^\/+/, '');
    } else {
      throw new Error(`The path does not start with the base directory.`);
    }
};
export {
  getRelativePath
}  

  
  // // Example usage
  // const baseDir = 'C:/Users/zakar/OneDrive/Bureau/ALL-ZIKO-REPO/dir2tree/articles';
  // const absolutePaths = [
  //   'C:/Users/zakar/OneDrive/Bureau/ALL-ZIKO-REPO/dir2tree/articles/a/m.c',
  //   'C:/Users/zakar/OneDrive/Bureau/ALL-ZIKO-REPO/dir2tree/articles/a/b.rs',
  //   'C:/Users/zakar/OneDrive/Bureau/ALL-ZIKO-REPO/dir2tree/articles/a/m.c',
  //   'C:/Users/zakar/OneDrive/Bureau/ALL-ZIKO-REPO/dir2tree/articles/a/b.rs'
  // ];
  
  // // Convert to relative paths
  // const relativePaths = absolutePaths.map(path => getRelativePath(baseDir, path));
  
  // // Print results
  // relativePaths.forEach(relativePath => console.log(relativePath));
  