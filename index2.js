const fs = require('fs');
let rawdata = fs.readFileSync('user.json');
let users = JSON.parse(rawdata);
console.log(users)


const content = Math.random()+"";

fs.writeFile(Math.random()+.'txt', content, (err) => {
  if (err) {
    console.error('An error occurred:', err);
  } else {
    console.log('File "hello.txt" has been created with the content: "Hello, World!"');
  }
});

