import fs from 'fs';

try {
  const buffer = fs.readFileSync('src/pages/home/HomePage.tsx');
  let nullPositions = [];
  for (let i = 0; i < buffer.length; i++) {
    if (buffer[i] === 0x00) {
      nullPositions.push(i);
    }
  }
  console.log("Total null bytes found:", nullPositions.length);
  if (nullPositions.length > 0) {
    console.log("Null byte positions:", nullPositions.slice(0, 50));
  }
} catch (err) {
  console.error("Error inspecting:", err);
}
