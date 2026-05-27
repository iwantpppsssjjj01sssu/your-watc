const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, '..', 'src', 'asset', 'img');
const files = fs.readdirSync(imgDir);

console.log('PNG Metadata & Chunk Inspection:');
console.log('================================');

files.forEach(file => {
  if (path.extname(file).toLowerCase() === '.png') {
    const filePath = path.join(imgDir, file);
    try {
      const buffer = fs.readFileSync(filePath);
      
      let offset = 8; // skip PNG signature
      let foundText = [];
      
      while (offset < buffer.length) {
        if (offset + 8 > buffer.length) break;
        const length = buffer.readUInt32BE(offset);
        const type = buffer.toString('ascii', offset + 4, offset + 8);
        
        if (type === 'tEXt' || type === 'zTXt' || type === 'iTXt') {
          const chunkData = buffer.slice(offset + 8, offset + 8 + length);
          // Extract printable characters
          let textStr = '';
          for (let i = 0; i < chunkData.length; i++) {
            if (chunkData[i] >= 32 && chunkData[i] <= 126) {
              textStr += String.fromCharCode(chunkData[i]);
            } else if (chunkData[i] === 0) {
              textStr += ': ';
            }
          }
          foundText.push(`${type} -> ${textStr.trim()}`);
        }
        
        offset += 12 + length; // 4 length + 4 type + data + 4 CRC
      }
      
      if (foundText.length > 0) {
        console.log(`\n[${file}]`);
        foundText.forEach(t => console.log(`  ${t}`));
      }
    } catch (err) {
      console.log(`Error reading ${file}: ${err.message}`);
    }
  }
});
