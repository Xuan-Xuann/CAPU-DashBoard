<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  isMobile?: boolean
}>()

const currentYear = new Date().getFullYear()
const currentTime = ref(new Date().toLocaleString('zh-CN'))

// 时钟指针（仅桌面端显示）
const hourAngle = ref(0)
const minuteAngle = ref(0)
const secondAngle = ref(0)

let timer: number

function updateClock() {
  const now = new Date()
  currentTime.value = now.toLocaleString('zh-CN')
  
  if (!props.isMobile) {
    const hours = now.getHours() % 12
    const minutes = now.getMinutes()
    const seconds = now.getSeconds()
    
    hourAngle.value = (hours + minutes / 60) * 30
    minuteAngle.value = (minutes + seconds / 60) * 6
    secondAngle.value = seconds * 6
  }
}

onMounted(() => {
  updateClock()
  timer = setInterval(updateClock, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<template>
  <footer class="app-footer" :class="{ 'is-mobile': isMobile }">
    <div class="footer-inner">
      <!-- 桌面端光晕（移动端不需要） -->
      <div v-if="!isMobile" class="glow glow-left"></div>
      <div v-if="!isMobile" class="glow glow-right"></div>
      
      <!-- 第一行：版权 + 品牌 -->
      <div class="footer-row">
        <span class="copyright">©Rinty Developer {{ currentYear }}</span>
        <span class="separator">/</span>
        <span class="brand">
          <span class="brand-letter">C</span>
          <span class="brand-letter">A</span>
          <span class="brand-letter">P</span>
          <span class="brand-letter">U</span>
        </span>
        <span class="separator">/</span>
        <span class="school">成都航空职业技术大学</span>
      </div>
      
      <!-- 第二行：时间（移动端只显示文字，桌面端显示时钟+文字） -->
      <div class="footer-row footer-time-row">
        <template v-if="!isMobile">
          <div class="live-clock">
            <div class="clock-face">
              <div class="clock-hour" :style="{ transform: `rotate(${hourAngle}deg)` }"></div>
              <div class="clock-minute" :style="{ transform: `rotate(${minuteAngle}deg)` }"></div>
              <div class="clock-second" :style="{ transform: `rotate(${secondAngle}deg)` }"></div>
              <div class="clock-center"></div>
            </div>
          </div>
        </template>
        <span class="time">{{ currentTime }}</span>
        <span v-if="!isMobile" class="time-pulse"></span>
      </div>
      
      <!-- 第三行：链接 + 状态 -->
      <div class="footer-row footer-links-row">
        <a href="#" class="footer-link">
          <span class="link-text">关于</span>
          <span v-if="!isMobile" class="link-underline"></span>
        </a>
        <span class="link-separator">·</span>
        <a href="#" class="footer-link">
          <span class="link-text">隐私</span>
          <span v-if="!isMobile" class="link-underline"></span>
        </a>
        <span class="link-separator">·</span>
        <a href="#" class="footer-link">
          <span class="link-text">条款</span>
          <span v-if="!isMobile" class="link-underline"></span>
        </a>
        <div v-if="!isMobile" class="status-indicator" title="系统运行中">
          <span class="status-dot"></span>
          <span class="status-ripple"></span>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
@import '../../styles/layout/footer.css';
</style>