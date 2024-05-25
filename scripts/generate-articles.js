/// Dynamically generating required exported articles from assets in build time.

const fs = require('fs');

const articlesDir = './assets/articles';
const outputPath = './assets/articles/generated-articles.js';

const articleFiles = fs.readdirSync(articlesDir).filter(fileName => fileName.endsWith('.mdx'));
const articleImports = articleFiles.map(fileName => `require('./${fileName}')`);

const fileContent = `module.exports = [${articleImports.join(', ')}]`;
fs.writeFileSync(outputPath, fileContent);
