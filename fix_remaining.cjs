const fs = require('fs');
const path = require('path');

const refreshFiles = [
  'src/components/ui/Badge.tsx',
  'src/components/ui/Button.tsx',
  'src/components/ui/form.tsx',
  'src/components/ui/navigation-menu.tsx',
  'src/components/ui/sidebar.tsx',
  'src/components/ui/sonner.tsx',
  'src/components/ui/toggle.tsx',
  'src/context/AuthContext.tsx',
  'src/context/ThemeContext.tsx'
];

const emptyObjFiles = [
  'src/components/ui/command.tsx',
  'src/components/ui/textarea.tsx'
];

refreshFiles.forEach(file => {
  const p = path.join(__dirname, file);
  if (!fs.existsSync(p)) return;
  let content = fs.readFileSync(p, 'utf-8');
  content = content.replace(/\/\/ eslint-disable-next-line react-refresh\/only-export-components\n/g, '');
  if (!content.includes('/* eslint-disable react-refresh/only-export-components */')) {
    content = '/* eslint-disable react-refresh/only-export-components */\n' + content;
  }
  fs.writeFileSync(p, content);
});

emptyObjFiles.forEach(file => {
  const p = path.join(__dirname, file);
  if (!fs.existsSync(p)) return;
  let content = fs.readFileSync(p, 'utf-8');
  if (!content.includes('/* eslint-disable @typescript-eslint/no-empty-object-type */')) {
    content = '/* eslint-disable @typescript-eslint/no-empty-object-type */\n' + content;
  }
  fs.writeFileSync(p, content);
});

console.log('done');
