import { createApp } from 'vue'
import App from './App.vue'

// 1. 全局重置 — 最底层
import './styles/global.css'

// 2. 卡片基础 — 所有卡片都依赖这个
import './styles/card-base.css'

// 3. 卡片特有样式 — 每个卡片自己独立的样式
import './styles/card/library-card.css'
// 未来新增卡片在这里继续加：
// import './styles/vpn-card.css'
// import './styles/canteen-card.css'

// 4. 布局样式 — 最后加载，可以覆盖前面的
import './styles/layout.css'

createApp(App).mount('#app')