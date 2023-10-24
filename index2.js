const fs = require('fs');

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


