const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, '..', 'src', 'asset', 'img');
const files = fs.readdirSync(imgDir);

console.log('Image dimensions and size report:');
console.log('=================================');

files.forEach(file => {
  if (path.extname(file).toLowerCase() === '.png') {
    const filePath = path.join(imgDir, file);
    const stats = fs.statSync(filePath);
    try {
      const buffer = fs.readFileSync(filePath);
      // Check PNG signature
      if (buffer.readUInt32BE(0) === 0x89504E47 && buffer.readUInt32BE(12) === 0x49484452) {
        const width = buffer.readUInt32BE(16);
        const height = buffer.readUInt32BE(20);
        const aspect = (width / height).toFixed(2);
        console.log(`${file}: ${width}x${height} (Aspect: ${aspect}), Size: ${(stats.size / 1024).toFixed(1)} KB`);
      } else {
        console.log(`${file}: Invalid PNG format, Size: ${(stats.size / 1024).toFixed(1)} KB`);
      }
    } catch (err) {
      console.log(`${file}: Error reading file - ${err.message}`);
    }
  }
});
