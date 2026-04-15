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
</script>

<template>
  <div class="card weather-card">
    <div class="card-header">
      <span class="card-title">
        <span class="weather-icon">{{ tempData ? getWeatherIcon(tempData.temperature) : '🌡️' }}</span>
        {{ tempData?.station_name || '天气' }}
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
      </div>
      
      <div class="weather-time">
        <span class="time-icon">🕐</span>
        <span>数据时间: {{ tempData.update_time }}</span>
        <span> 龙泉驿中学就在附近</span>
      </div>
    </div>
    
    <div v-else class="weather-error">
      <span>暂无天气数据</span>
    </div>

    <div class="card-footer">
      <span class="source-tag">数据源: 国家气象站(Fan API)</span>

    </div>
    
    
    
  </div>
</template>

<style scoped>
@import '../../styles/card/weather-card.css';
</style>