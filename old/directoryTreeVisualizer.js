const fs = require('fs');

// Function to recursively generate the directory tree
function generateTree(basePath) {
  const stat = fs.statSync(basePath);

  if (stat.isDirectory()) {
    const result = { name: basePath, children: [] };

    const files = fs.readdirSync(basePath);
    files.forEach((file) => {
      const filePath = `${basePath}/${file}`;
      result.children.push(generateTree(filePath));
    });

    return result;
  }

  return { name: basePath, type: 'file' };
}

// Specify the root folder path (change this to your desired directory)
const rootPath = "E:\studio"

// Generate the directory tree
const directoryTree = generateTree(rootPath);

// Save the directory tree to a JSON file
const jsonFilePath = `${__dirname}/directoryTree.json`;
fs.writeFileSync(jsonFilePath, JSON.stringify(directoryTree, null, 2));

console.log(`Directory tree saved to ${jsonFilePath}`);
