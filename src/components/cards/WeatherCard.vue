<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { fetchTemperature } from '../../api/weather'

const tempData = ref<{
  temperature: string
  station_name: string
  update_time: string
} | null>(null)
const loading = ref(true)
const lastUpdate = ref('--:--:--')
let timer: number

async function refreshData() {
  loading.value = true
  const data = await fetchTemperature()
  if (data) {
    tempData.value = data
  }
  loading.value = false
  lastUpdate.value = new Date().toLocaleTimeString('zh-CN', { hour12: false })
}

onMounted(() => {
  refreshData()
  timer = setInterval(refreshData, 600000) // 10分钟刷新
})

onUnmounted(() => {
  clearInterval(timer)
})

function getWeatherIcon(temp: string): string {
  const t = parseFloat(temp)
  if (t >= 30) return '☀️'
  if (t >= 20) return '🌤️'
  if (t >= 10) return '⛅'
  if (t >= 0) return '🌥️'
  return '❄️'
}

function getFeelsLike(temp: string): string {
  const t = parseFloat(temp)
  if (t >= 35) return '酷热'
  if (t >= 28) return '炎热'
  if (t >= 22) return '温暖'
  if (t >= 15) return '舒适'
  if (t >= 8) return '凉爽'
  if (t >= 0) return '寒冷'
  return '严寒'
}
</script>

<template>
  <div class="card weather-card">
    <div class="card-header">
      <span class="card-title">
        <span class="weather-icon">{{ tempData ? getWeatherIcon(tempData.temperature) : '🌡️' }}</span>
        {{ tempData?.station_name || '龙泉驿 · 天气' }}
      </span>
      <span class="card-badge">{{ lastUpdate }}</span>
    </div>
    
    <div v-if="loading" class="weather-loading">
      <span class="loading-text">加载中...</span>
    </div>
    
    <div v-else-if="tempData" class="weather-content">
      <div class="weather-main">
        <div class="temp-block">
          <span class="temp-value">{{ tempData.temperature }}</span>
          <span class="temp-unit">°C</span>
        </div>
        <div class="feels-like">
          <span class="feels-icon">🌡️</span>
          <span class="feels-text">{{ getFeelsLike(tempData.temperature) }}</span>
        </div>
      </div>

      <div class="weather-details">
        <div class="detail-item">
          <span class="detail-icon">🕐</span>
          <span class="detail-label">数据时间</span>
          <span class="detail-value">{{ tempData.update_time }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-icon">📍</span>
          <span class="detail-label">监测站</span>
          <span class="detail-value">龙泉驿</span>
        </div>
      </div>
    </div>
    
    <div v-else class="weather-error">
      <span>暂无天气数据</span>
    </div>

    <div class="card-footer">
      <span class="source-tag">📡 国家气象站 · FanStudio API</span>
    </div>
  </div>
</template>

<style scoped>
@import '../../styles/card/weather-card.css';
</style>
