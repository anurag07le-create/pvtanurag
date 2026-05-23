const fs = require('fs');
const path = require('path');

const dir = 'src/components/cinematic';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

const replacements = [
  { from: /#050505/g, to: '#FDFBF7' }, // Black to Ivory
  { from: /text-white/g, to: 'text-[#1B4332]' }, // White text to Emerald
  { from: /bg-white/g, to: 'bg-[#1B4332]' }, // White backgrounds to Emerald
  { from: /border-white/g, to: 'border-[#1B4332]' }, // White borders to Emerald
  { from: /fill="white"/g, to: 'fill="#1B4332"' }, // SVG fills
  { from: /rgba\(255,255,255,/g, to: 'rgba(27,67,50,' }, // RGBA whites to RGBA emerald
];

files.forEach(file => {
  if (file === 'StackingEvents.tsx') return; // Skip to handle manually
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  replacements.forEach(r => {
    content = content.replace(r.from, r.to);
  });
  
  fs.writeFileSync(filePath, content);
});

// Also handle page.tsx and CinematicExperience.tsx manually or let script do it?
// CinematicExperience.tsx is in components/cinematic so it will be hit.
console.log('Colors replaced in most files');
