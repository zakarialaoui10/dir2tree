# Install
```bash
npm install dir2tree
```
# Import
## Common Js
```js
const dir2tree=require("dir2tree")
```
## Es Module
```js
import dir2tree from dir2tree
```
# Syntaxe
## Initialise
```js
const MyTree=dire2tree(ROOT,OPTIONS,CALLBACKS)
MyTree.write("generated_file.json")
```
## Arguments
- **`ROOT`** : The path to the root directory that we want handle. it's ***`required`***
- **`OPTIONS`** : it's ***`optional`***
- **`CALLBACKS`** : it's ***`optional`*** 
