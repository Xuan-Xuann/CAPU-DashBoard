---

<div align="center">
  <h1>📡 CAPU Dashboard</h1>
  <p>
    <strong>成都航空职业技术大学 · 校园数据聚合看板</strong>
  </p>
  <p>
    <img src="https://img.shields.io/badge/Vue-3.5-4FC08D?logo=vue.js&logoColor=white" alt="Vue 3">
    <img src="https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white" alt="TypeScript">
    <img src="https://img.shields.io/badge/Vite-6.3-646CFF?logo=vite&logoColor=white" alt="Vite">
    <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License MIT">
  </p>
  <p>
    <a href="https://capu.rinty.xyz"><strong>🌐 在线体验</strong></a>
    ·
    <a href="https://github.com/Xuan-Xuann/CAPU-DashBoard/releases"><strong>📦 下载 Release</strong></a>
  </p>
</div>

---

## 📋 项目简介

**CAPU Dashboard** 是为成都航空职业技术大学打造的校园数据聚合看板。

将学校分散的服务信息（图书馆入馆人数、校园天气、系统状态、公告等）集中展示在一个统一的界面上，让师生**一眼看清校园动态**。

### ✨ 核心特性

- **数据实时聚合**：图书馆人数、校园天气、系统状态等数据同屏展示，自动刷新
- **新生引导系统**：图书馆借书、座位预约、食堂支付等校园生活指南，支持分类筛选和详情查看
- **响应式设计**：桌面端侧边栏导航，移动端底部导航栏，完美适配各尺寸屏幕
- **毛玻璃 UI**：现代化的半透明模糊效果，视觉清爽
- **自动化部署**：推送代码自动构建并发布 Release，支持一键部署

---

## 🛠 技术栈

| 角色 | 技术 |
| :--- | :--- |
| **前端框架** | Vue 3 (Composition API) + TypeScript |
| **构建工具** | Vite |
| **HTTP 客户端** | Axios |
| **样式方案** | 纯 CSS（模块化分离） |
| **后端 API** | Python FastAPI（独立仓库部署） |
| **CI/CD** | GitHub Actions 自动构建发布 |

---

## 📁 项目结构

```text
CAPU-DashBoard/
├── .github/workflows/        # GitHub Actions 自动构建
├── public/
│   └── 404.html              # 自定义 404 页面
├── src/
│   ├── api/                  # API 请求封装
│   ├── components/
│   │   ├── cards/            # 数据卡片组件
│   │   │   ├── guidepage/    # 新生引导组件
│   │   │   ├── LibraryCard.vue
│   │   │   ├── WeatherCard.vue
│   │   │   └── PlaceholderCard.vue
│   │   └── layout/           # 布局组件
│   │       ├── AppHeader.vue
│   │       ├── AppSidebar.vue
│   │       └── AppFooter.vue
│   ├── data/
│   │   ├── guide.data.yaml   # 引导内容数据
│   │   └── guideLoader.ts    # 数据加载器
│   ├── views/                # 页面视图
│   │   ├── Dashboard.vue     # 数据看板首页
│   │   ├── Guide.vue         # 新生引导
│   │   ├── GuideDetail.vue   # 引导详情
│   │   ├── Announcements.vue # 校园公告
│   │   ├── Community.vue     # 用户交流
│   │   └── NotFound.vue      # 404 页面
│   ├── styles/               # 样式文件（模块化）
│   ├── router/               # 路由配置
│   ├── App.vue
│   └── main.ts
├── index.html
├── vite.config.ts
└── package.json
```

---

🚀 快速开始

1️ 环境准备

· Node.js: 18.0 或更高版本
· 包管理器: npm

2️ 克隆与安装

```bash
git clone https://github.com/Xuan-Xuann/CAPU-DashBoard.git
cd CAPU-DashBoard
npm install
```

3️ 配置环境变量

复制 .env.example 为 .env.local：

```dotenv
VITE_API_BASE_URL=http://127.0.0.1:8000
```

4️ 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:5173

5️ 构建生产版本

```bash
npm run build
npm run preview
```

---

📡 已接入 API

接口 说明 状态
GET /api/v1/library/stats 图书馆入馆人数 ✅ 已接入
GET /api/v1/weather/temperature 校园实时温度 ✅ 已接入
GET /api/v1/status/summary 系统运行状态 ✅ 已接入
GET /api/v1/canteen/stats 食堂拥挤度 🚧 规划中
GET /api/v1/vpn/status WebVPN 状态 🚧 规划中

---

🔧 新增功能卡片指南

得益于模块化设计，添加新数据卡片只需三步：

1. 创建样式：在 src/styles/card/ 下新建 xxx-card.css
2. 创建组件：在 src/components/cards/ 下新建 XxxCard.vue
3. 注册到首页：在 src/views/Dashboard.vue 中引入组件并添加到网格中

---

🚢 部署

GitHub Actions 自动构建

推送代码到 master 分支会自动触发构建并发布 Release，包含打包好的 dist/ 文件。

OpenResty/Nginx 部署

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/capu-dashboard;

    # SPA 路由支持
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 自定义 404
    error_page 404 /404.html;
}
```

---

📄 许可证

MIT License

---

👨‍💻 作者

Xuan-Xuann

· GitHub: @Xuan-Xuann
· 在线地址: capu.rinty.xyz

```

---

这份 README 涵盖了项目简介、技术栈、项目结构、快速开始、API 状态、扩展指南、部署方法，适合放在 GitHub 仓库首页。需要调整任何部分告诉我。
