<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

defineProps<{
  isMobile?: boolean
}>()

const currentTime = ref(new Date().toLocaleString('zh-CN'))
let timer: number

onMounted(() => {
  timer = setInterval(() => {
    currentTime.value = new Date().toLocaleString('zh-CN')
  }, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<template>
  <header class="app-header" :class="{ 'is-mobile': isMobile }">
    <div class="header-left">
      <h2>校园服务平台</h2>
    </div>
    <div class="header-right">
      <span class="time">{{ currentTime }}</span>
    </div>
  </header>
</template>

<style scoped>
@import '../../styles/layout/header.css';
</style>