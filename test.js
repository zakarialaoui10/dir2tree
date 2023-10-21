/*
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'example.txt');
 
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
  } else {
    console.log('File content:', data);
  }
});
*/
const { Octokit } = require('@octokit/rest');

async function readSlaveFile() {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN_MASTER, // Use your GitHub token secret from the master repository.
  });

  try {
    const response = await octokit.repos.getContent({
      owner: 'slave-repo-owner',
      repo: 'slave-repo-name',
      path: 'path/in/slave-repo/example.txt',
    });

    const fileContent = Buffer.from(response.data.content, 'base64').toString();
    console.log('File Content:', fileContent);
  } catch (error) {
    console.error('Error reading file:', error.message);
  }
}

readSlaveFile();
