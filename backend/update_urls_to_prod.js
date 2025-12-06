const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../src');
const PROD_URL = 'https://natura-jl7g.onrender.com';
const LOCAL_URL = 'http://localhost:5000';

function walk(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            walk(filePath);
        } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
            let content = fs.readFileSync(filePath, 'utf8');
            if (content.includes(LOCAL_URL)) {
                // Replace strictly match to avoid double replacement
                const newContent = content.split(LOCAL_URL).join(PROD_URL);
                fs.writeFileSync(filePath, newContent, 'utf8');
                console.log(`Updated: ${filePath}`);
            }
        }
    });
}

console.log('Starting URL update...');
walk(srcDir);
console.log('URL update complete.');
