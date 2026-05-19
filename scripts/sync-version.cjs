const fs = require('fs');
const path = require('path');

// 读取版本号：优先 .env，其次 .env.example，最后 package.json，最后默认值
const rootDir = path.join(__dirname, '..');
const envPath = path.join(rootDir, '.env');
const envExamplePath = path.join(rootDir, '.env.example');
const packageJsonPath = path.join(rootDir, 'package.json');

// CI 环境：如果 .env 不存在，从 .env.example 复制一份
if (!fs.existsSync(envPath) && fs.existsSync(envExamplePath)) {
  fs.copyFileSync(envExamplePath, envPath);
  console.log('📋 CI 环境检测: 从 .env.example 创建 .env');
}

let version = '1.0.0'; // 默认版本

// 优先从 .env 读取
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const match = envContent.match(/VITE_APP_VERSION=(.+)/);
  if (match) {
    version = match[1].trim();
  }
} else if (fs.existsSync(packageJsonPath)) {
  // .env 不存在时从 package.json 读取
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  if (packageJson.version) {
    version = packageJson.version;
  }
}

// 同步到 package.json（保持一致性）
if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  if (packageJson.version !== version) {
    packageJson.version = version;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
    console.log(`✅ package.json 版本号已同步: ${version}`);
  }
}

// 同步到 .env.example（如果存在）
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
