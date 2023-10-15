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
- **`OPTIONS`** : An object containing various configuration options to control the behavior of the tree generation.it's ***`optional`*** , These options might include :
  - **`fileContent`** : (***Boolean***)
  - **`fileName`** : (***Boolean***)
  - **`fileExtension`** : (***Boolean***)
  - **`length`** : (***Boolean***)
  - **`size`** : (***Boolean***)
  - **`linesCount`** : (***Boolean***)
  - **`created`** : (***Boolean***)
  - **`lastModified`** : (***Boolean***)
  - **`skip`** :
    - **`folder`** : (***String[]***)
    - **`file`** : (***String[]***)
    - **`extension`** : (***String[]***)
  - **`sortBy`** : (***String***) , possible values : `"names"`,`"extension"`,`"size"`,`"lines"`,`"created"`,`"lastmodified"`,
  - **`order`** : (***Number***)
- **`CALLBACKS`** : it's ***`optional`***
## Methodes
