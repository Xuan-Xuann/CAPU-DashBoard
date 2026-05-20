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

将学校分散的服务信息（图书馆入馆人数、校园天气、系统状态、校园公告等）集中展示在一个统一的界面上，让师生**一眼看清校园动态**。

### ✨ 核心特性

- **数据实时聚合**：图书馆人数、校园天气、系统状态等数据同屏展示，自动刷新
- **入馆趋势分析**：图书馆入馆人数趋势折线图，展示一天内的入馆人数变化走势
- **API 前端缓存**：内置内存缓存机制，减少重复请求，提升访问速度
- **校园公告系统**：支持多数据源新闻公告抓取与展示，带分页浏览
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
├── .github/
│   ├── workflows/              # GitHub Actions CI/CD
│   │   ├── deploy.yml          # 自动构建 & 发布 Release
│   │   └── check-pr-source.yml # 推送分支检查
│   └── pull_request_template.md # PR 模板
├── public/
│   ├── 404.html                # 自定义 404 页面
│   └── icons.svg               # 图标雪碧图
├── src/
│   ├── api/                    # API 请求封装（含缓存）
│   │   ├── library.ts          # 图书馆数据 + 历史趋势
│   │   ├── news.ts             # 校园新闻公告
│   │   ├── status.ts           # 系统状态
│   │   └── weather.ts          # 天气数据
│   ├── components/
│   │   ├── cards/              # 数据卡片组件
│   │   │   ├── guidepage/      # 新生引导组件
│   │   │   ├── LibraryCard.vue # 图书馆卡片（含趋势图）
│   │   │   ├── WeatherCard.vue # 天气卡片
│   │   │   └── PlaceholderCard.vue
│   │   └── layout/             # 布局组件
│   │       ├── AppHeader.vue
│   │       ├── AppSidebar.vue
│   │       └── AppFooter.vue
│   ├── data/
│   │   ├── guide.data.yaml     # 引导内容数据
│   │   └── guideLoader.ts      # 数据加载器
│   ├── views/                  # 页面视图
│   │   ├── DashBoard.vue       # 数据看板首页
│   │   ├── Guide.vue           # 新生引导
│   │   ├── GuideDetail.vue     # 引导详情
│   │   ├── Announcements.vue   # 校园公告
│   │   ├── Community.vue       # 用户交流
│   │   └── NotFound.vue        # 404 页面
│   ├── styles/                 # 样式文件（模块化）
│   ├── router/                 # 路由配置
│   ├── App.vue
│   └── main.ts
├── scripts/
│   └── sync-version.cjs        # 版本号同步脚本
├── index.html
├── vite.config.ts
└── package.json
```

---

## 🚀 快速开始

### 1️⃣ 环境准备

- **Node.js**: 18.0 或更高版本
- **包管理器**: npm

### 2️⃣ 克隆与安装

```bash
git clone https://github.com/Xuan-Xuann/CAPU-DashBoard.git
cd CAPU-DashBoard
npm install
```

### 3️⃣ 配置环境变量

复制 `.env.example` 为 `.env`：

```dotenv
VITE_API_BASE_URL=http://127.0.0.1:8000
```

### 4️⃣ 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:5173

### 5️⃣ 构建生产版本

```bash
npm run build
npm run preview
```

---

## 📡 已接入 API

| 接口 | 说明 | 状态 |
| :--- | :--- | :--- |
| `GET /api/v1/library/stats` | 图书馆入馆人数（今日/本周/本月） | ✅ 已接入 |
| `GET /api/v1/library/history` | 图书馆入馆历史趋势数据 | ✅ 已接入 |
| `GET /api/v1/weather/temperature` | 校园实时温度 | ✅ 已接入 |
| `GET /api/v1/status/summary` | 系统运行状态 | ✅ 已接入 |
| `GET /api/v1/news/{source}/list` | 校园新闻公告列表 | ✅ 已接入 |
| `GET /api/v1/news/{source}/latest` | 最新公告（增量更新） | ✅ 已接入 |
| `GET /api/v1/news/{source}/article/{id}` | 公告详情 | ✅ 已接入 |
| `GET /api/v1/news/sources` | 可用新闻数据源列表 | ✅ 已接入 |
| `GET /api/v1/canteen/stats` | 食堂拥挤度 | 🚧 规划中 |
| `GET /api/v1/vpn/status` | WebVPN 状态 | 🚧 规划中 |

---

## 🔧 新增功能卡片指南

得益于模块化设计，添加新数据卡片只需三步：

1. **创建样式**：在 `src/styles/card/` 下新建 `xxx-card.css`
2. **创建组件**：在 `src/components/cards/` 下新建 `XxxCard.vue`
3. **注册到首页**：在 `src/views/DashBoard.vue` 中引入组件并添加到网格中

---

## 🚢 部署

### GitHub Actions 自动构建

推送代码到 `Dev` 分支后，通过 Pull Request 合并到 `master` 分支会自动触发构建并发布 Release。

> ⚠️ 禁止直接推送到 `master` 分支，所有改动需通过 PR 合并。

### OpenResty/Nginx 部署

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

## 📄 许可证

MIT License

---

## 👨‍💻 作者

**Xuan-Xuann**

- GitHub: [@Xuan-Xuann](https://github.com/Xuan-Xuann)
- 在线地址: [capu.rinty.xyz](https://capu.rinty.xyz)