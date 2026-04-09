# CAPU Dashboard

校园数据聚合看板 · 实时监控图书馆、食堂、VPN 等服务状态

## 技术栈

- **前端**：Vue 3 + TypeScript + Vite
- **后端**：Python FastAPI（暂不提供相关代码）
- **样式**：纯 CSS（模块化分离）

## 项目结构
CAPU-DashBoard/
├── src/
│ ├── api/ # API 请求封装
│ ├── components/ # Vue 组件（无 style 标签）
│ ├── styles/ # 所有样式文件
│ │ ├── global.css # 全局重置
│ │ ├── layout.css # 看板布局
│ │ ├── card-base.css # 卡片基础样式
│ │ └── library-card.css
│ ├── App.vue # 主容器
│ └── main.ts # 入口，统一引入样式
├── index.html
├── package.json
└── vite.config.ts

text

## 快速开始

### 1. 安装依赖

```bash
npm install
2. 启动后端 API
bash
cd ../CAPU-API
uvicorn app.main:app --reload --port 8000
3. 启动前端
bash
npm run dev
访问 http://localhost:5173

添加新卡片
在 src/styles/ 新建 xxx-card.css

在 src/components/ 新建 XxxCard.vue

在 src/main.ts 添加 import './styles/xxx-card.css'

在 App.vue 中引入并使用组件

API 接口
接口	说明	状态
GET /api/v1/library/stats	图书馆实时人数	✅ 已接入
GET /api/v1/canteen/stats	食堂拥挤度	🚧 规划中
GET /api/v1/vpn/status	WebVPN 状态	🚧 规划中
环境变量
复制 .env.example 为 .env 并配置：

text
VITE_API_BASE=http://127.0.0.1:8000