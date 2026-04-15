<script setup lang="ts">
import { ref, onMounted, onUnmounted} from 'vue'
import { RouterView, useRouter, useRoute } from 'vue-router'
import AppSidebar from './components/layout/AppSidebar.vue'
import AppHeader from './components/layout/AppHeader.vue'
import AppFooter from './components/layout/AppFooter.vue'

const router = useRouter()
const route = useRoute()
const isMobile = ref(false)

function checkMobile() {
  isMobile.value = window.innerWidth <= 768
}

function navigateTo(path: string) {
  router.push(path)
}

function isActive(path: string): boolean {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})

const mobileMenuItems = [
  { path: '/', label: '看板', icon: '📊' },
  { path: '/announcements', label: '公告', icon: '📢' },
  { path: '/guide', label: '引导', icon: '🎓' },
  { path: '/community', label: '交流', icon: '💬' },
]
</script>

<template>
  <div class="app-layout" :class="{ 'is-mobile': isMobile }">
    <!-- 桌面端侧边栏 -->
    <AppSidebar v-if="!isMobile" />
    
    <div class="main-content">
      <!-- 全局 Header：桌面端和移动端都显示 -->
      <AppHeader :is-mobile="isMobile" />
      
      <div class="page-container">
        <RouterView />
      </div>
      
      <!-- Footer：始终显示 -->
      <AppFooter :is-mobile="isMobile" />
      
      <!-- 移动端底部导航栏 -->
      <nav v-if="isMobile" class="mobile-nav">
        <div 
          v-for="item in mobileMenuItems" 
          :key="item.path"
          class="mobile-nav-item"
          :class="{ active: isActive(item.path) }"
          @click="navigateTo(item.path)"
        >
          <span class="mobile-nav-icon">{{ item.icon }}</span>
          <span class="mobile-nav-label">{{ item.label }}</span>
        </div>
      </nav>
    </div>
  </div>
</template>

<style scoped>
@import './styles/app.css';
</style>