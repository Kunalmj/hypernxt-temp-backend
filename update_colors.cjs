const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'pages');
const targetFiles = [
  'ScholarshipResults.jsx',
  'AgricultureResults.jsx',
  'StartupGrantResults.jsx',
  'TenderResults.jsx',
  'ResearchResults.jsx',
  'WomenResults.jsx',
  'SchemeDetails.jsx'
];

const replacements = [
  // Emerald
  { from: 'emerald-50', to: 'blue-50' },
  { from: 'emerald-100', to: 'blue-100' },
  { from: 'emerald-400', to: 'blue-400' },
  { from: 'emerald-500', to: 'blue-500' },
  { from: 'emerald-600', to: 'blue-600' },
  { from: 'emerald-700', to: 'blue-700' },
  // Red
  { from: 'red-50', to: 'blue-50' },
  { from: 'red-100', to: 'blue-100' },
  { from: 'red-400', to: 'blue-400' },
  { from: 'red-600', to: 'blue-600' },
  // Purple
  { from: 'purple-50', to: 'blue-50' },
  { from: 'purple-100', to: 'blue-100' },
  { from: 'purple-400', to: 'blue-400' },
  { from: 'purple-600', to: 'blue-600' },
  { from: 'purple-700', to: 'blue-700' },
  // Amber
  { from: 'amber-50', to: 'blue-50' },
  { from: 'amber-100', to: 'blue-100' },
  { from: 'amber-600', to: 'blue-600' },
  { from: 'amber-700', to: 'blue-700' },
  { from: 'amber-800', to: 'blue-800' },
  // Indigo
  { from: 'indigo-50', to: 'blue-50' },
  { from: 'indigo-100', to: 'blue-100' },
  { from: 'indigo-600', to: 'blue-600' },
  { from: 'to-indigo-50', to: 'to-blue-100' }
];

for (const file of targetFiles) {
  const filePath = path.join(dir, file);
  if (!fs.existsSync(filePath)) continue;

  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  for (const rep of replacements) {
    const regex = new RegExp(rep.from, 'g');
    content = content.replace(regex, rep.to);
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated colors in ${file}`);
  }
}
