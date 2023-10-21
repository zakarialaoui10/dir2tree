const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'example.txt');
const content = 'Hello';

fs.writeFile(filePath, content, (err) => {
  if (err) {
    console.error('Error creating the file:', err);
  } else {
    console.log('File created with content:', content);
  }
});
