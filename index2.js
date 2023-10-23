const fs = require('fs');
const content = 'Hello, World! ' + Math.random();

fs.writeFile('hello.txt', content, (err) => {
  if (err) {
    console.error('An error occurred:', err);
  } else {
    console.log(`File "hello.txt" has been created with the content: ${content}`);
  }
});

