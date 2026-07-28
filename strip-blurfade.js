const fs = require('fs');
const path = require('path');
const dir = './components/landing';
const files = fs.readdirSync(dir);
for (const file of files) {
  if (file === 'HeroSection.tsx') continue;
  if (!file.endsWith('.tsx')) continue;
  let content = fs.readFileSync(path.join(dir, file), 'utf8');
  if (content.includes('BlurFade')) {
    // remove import
    content = content.replace(/import\s*{\s*BlurFade\s*}\s*from\s*['"]@\/components\/BlurFade['"];?\n?/g, '');
    // remove opening tags
    content = content.replace(/<BlurFade[^>]*>/g, '');
    // remove closing tags
    content = content.replace(/<\/BlurFade>/g, '');
    fs.writeFileSync(path.join(dir, file), content);
    console.log(`Stripped BlurFade from ${file}`);
  }
}
