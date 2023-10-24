const fs = require('fs');
const path = require('path');
console.log(__dirname)
console.log('Current working directory:', process.cwd());
try {
  const data = fs.readFileSync('user.json', 'utf8');
fs.writeFile('hello.txt', data, (err) => {
  if (err) {
    console.error('An error occurred:', err);
  } else {
    console.log(`File "hello.txt" has been created with the content: ${data}`);
  }
});

} catch (error) {
  console.error('Error reading the file:', error);
}


