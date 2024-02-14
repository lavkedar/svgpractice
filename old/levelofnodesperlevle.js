


const fs = require('fs');

// Function to recursively generate the directory tree
function generateTree(basePath, level, summary) {
  const stat = fs.statSync(basePath);

  if (stat.isDirectory()) {
    const result = { name: basePath, type: 'directory', level };
    const files = fs.readdirSync(basePath);

    result.totalNodes = files.length;
    summary[level] = (summary[level] || 0) + result.totalNodes;

    files.forEach((file) => {
      const filePath = `${basePath}/${file}`;
      generateTree(filePath, level + 1, summary);
    });
  } else {
    summary[level] = (summary[level] || 0) + 1;
  }
}

// Specify the root folder path (change this to your desired directory)
const rootPath = "E:\studio"

// Generate the directory tree and summary
const summary = {};
generateTree(rootPath, 1, summary);

// Save the summary to a JSON file
const jsonFilePath = `${__dirname}/levels.json`;
fs.writeFileSync(jsonFilePath, JSON.stringify(summary, null, 2));

console.log(`Directory tree summary saved to ${jsonFilePath}`);
