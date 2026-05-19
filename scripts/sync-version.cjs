const fs = require('fs');
const path = require('path');

// 读取 .env 获取版本号（唯一来源）
const envPath = path.join(__dirname, '..', '.env');
let version = '1.0.0'; // 默认版本

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const match = envContent.match(/VITE_APP_VERSION=(.+)/);
  if (match) {
    version = match[1].trim();
  }
}

// 同步到 package.json（保持一致性）
const packageJsonPath = path.join(__dirname, '..', 'package.json');
if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  if (packageJson.version !== version) {
    packageJson.version = version;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
    console.log(`✅ package.json 版本号已同步: ${version}`);
  }
}

// 同步到 .env.example（如果存在）
const envExamplePath = path.join(__dirname, '..', '.env.example');
if (fs.existsSync(envExamplePath)) {
  let exampleContent = fs.readFileSync(envExamplePath, 'utf8');
  if (exampleContent.includes('VITE_APP_VERSION=')) {
    exampleContent = exampleContent.replace(
      /VITE_APP_VERSION=.*/,
      `VITE_APP_VERSION=${version}`
    );
  } else {
    exampleContent += `\nVITE_APP_VERSION=${version}\n`;
  }
  fs.writeFileSync(envExamplePath, exampleContent);
}

console.log(`版本号: ${version}`);