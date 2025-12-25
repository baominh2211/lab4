import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const requiredFiles = [
  'index.html',
  'src/main.jsx',
  'src/App.jsx',
  'src/App.css',
  'vite.config.js',
  'package.json'
];

const requiredComponents = [
  'src/components/Section1/MouseTracker.jsx',
  'src/components/Section2/UncontrolledLogin.jsx',
  'src/components/Section3/PostFetcher.jsx',
  'src/components/Section4/ControlledSignup.jsx',
  'src/components/Section6/ThemeDemo.jsx',
  'src/components/Section7/LocalStorageDemo.jsx',
  'src/components/BlogDash/Login.jsx',
  'src/components/BlogDash/Layout.jsx',
  'src/components/BlogDash/Dashboard.jsx',
  'src/components/BlogDash/PostDetail.jsx',
  'src/components/BlogDash/ProtectedRoute.jsx',
  'src/components/RouterDemo/Home.jsx',
  'src/components/RouterDemo/About.jsx',
  'src/components/RouterDemo/UserProfile.jsx',
  'src/components/RouterDemo/RouterLayout.jsx'
];

const requiredContext = [
  'src/context/AuthContext.jsx',
  'src/context/ThemeContext.jsx'
];

const requiredHooks = [
  'src/hooks/useFetch.js',
  'src/hooks/useLocalStorage.js'
];

console.log('🔍 Verifying React Lab 4 project structure...\n');

let allFilesExist = true;

// Check required files
console.log('📄 Checking core files...');
requiredFiles.forEach(file => {
  const filePath = join(__dirname, file);
  const exists = existsSync(filePath);
  console.log(`${exists ? '✅' : '❌'} ${file}`);
  if (!exists) allFilesExist = false;
});

// Check components
console.log('\n🧩 Checking components...');
requiredComponents.forEach(file => {
  const filePath = join(__dirname, file);
  const exists = existsSync(filePath);
  console.log(`${exists ? '✅' : '❌'} ${file}`);
  if (!exists) allFilesExist = false;
});

// Check context
console.log('\n🎨 Checking context files...');
requiredContext.forEach(file => {
  const filePath = join(__dirname, file);
  const exists = existsSync(filePath);
  console.log(`${exists ? '✅' : '❌'} ${file}`);
  if (!exists) allFilesExist = false;
});

// Check hooks
console.log('\n🪝 Checking custom hooks...');
requiredHooks.forEach(file => {
  const filePath = join(__dirname, file);
  const exists = existsSync(filePath);
  console.log(`${exists ? '✅' : '❌'} ${file}`);
  if (!exists) allFilesExist = false;
});

if (allFilesExist) {
  console.log('\n✅ All files verified! Project structure is correct.');
  console.log('🚀 Ready to build and deploy!');
  process.exit(0);
} else {
  console.log('\n❌ Some files are missing! Please check the structure.');
  console.log('📖 See README.md for required project structure.');
  process.exit(1);
}
