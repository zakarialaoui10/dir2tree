const fs = require('fs');

try {
  const data = fs.readFileSync('user.json', 'utf8');
  console.log(data);
} catch (error) {
  console.error('Error reading the file:', error);
}

const content = 'Hello, World! ' + Math.random();
fs.writeFile('hello.txt', content, (err) => {
  if (err) {
    console.error('An error occurred:', err);
  } else {
    console.log(`File "hello.txt" has been created with the content: ${content}`);
  }
});

