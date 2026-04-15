import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 样式
import './styles/global.css'
import './styles/card-base.css'
import './styles/card/library-card.css'
import './styles/app.css'

const app = createApp(App)
app.use(router)
app.mount('#app')