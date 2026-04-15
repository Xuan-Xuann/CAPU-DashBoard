<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const menuItems = [
  { path: '/', label: '数据看板', icon: '📊' },
  { path: '/announcements', label: '校园公告', icon: '📢' },
  { path: '/guide', label: '新生引导', icon: '🎓' },
  { path: '/community', label: '用户交流', icon: '💬' },
]

const sliderTop = ref(0)
const navRefs = ref<HTMLElement[]>([])

function setNavRef(el: HTMLElement | null, index: number) {
  if (el) navRefs.value[index] = el
}

function updateSliderPosition() {
  nextTick(() => {
    const currentPath = route.path
    const activeIndex = menuItems.findIndex(item => 
      currentPath === '/' ? item.path === '/' : item.path !== '/' && currentPath.startsWith(item.path)
    )
    
    if (activeIndex !== -1 && navRefs.value[activeIndex]) {
      const activeEl = navRefs.value[activeIndex]
      sliderTop.value = activeEl.offsetTop
    }
  })
}

function navigateTo(path: string) {
  router.push(path)
}

function isActive(path: string): boolean {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}

watch(() => route.path, updateSliderPosition)
nextTick(updateSliderPosition)
</script>

<template>
  <aside class="app-sidebar">
    <div class="sidebar-header" @click="navigateTo('/')">
      <span class="logo-emoji">🏫</span>
      <span class="logo-text">CAPU</span>
    </div>
    
    <nav ref="navContainer" class="sidebar-nav">
      <div class="nav-slider" :style="{ transform: `translateY(${sliderTop}px)` }"></div>
      
      <div 
        v-for="(item, index) in menuItems" 
        :key="item.path"
        :ref="(el) => setNavRef(el as HTMLElement, index)"
        class="nav-item"
        :class="{ active: isActive(item.path) }"
        @click="navigateTo(item.path)"
      >
        <span class="nav-icon">{{ item.icon }}</span>
        <span class="nav-label">{{ item.label }}</span>
      </div>
    </nav>
  </aside>
</template>

<style scoped>
@import '../../styles/layout/sidebar.css';
</style>