<script setup lang="ts">
import { inject, ref, onMounted, computed, type Ref } from 'vue'
import type { LibraryStats, HistoryPoint } from '../../api/library'
import { fetchLibraryHistory } from '../../api/library'

// 从父组件注入数据
const libData = inject<Ref<Partial<LibraryStats>>>('libraryStats')
const lastUpdate = inject<Ref<string>>('libraryLastUpdate')

// 入馆趋势数据
const historyData = ref<HistoryPoint[]>([])
const trendLoaded = ref(false)

onMounted(async () => {
  const data = await fetchLibraryHistory()
  if (data.length > 0) {
    historyData.value = data
    trendLoaded.value = true
  }
})

// 计算趋势图表的 SVG 路径
const chartHeight = 60
const chartWidth = 100

function buildTrendPath(points: HistoryPoint[]): string {
  if (points.length < 2) return ''
  
  const values = points.map(p => p.today)
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1
  
  return points.map((p, i) => {
    const x = (i / (points.length - 1)) * chartWidth
    const y = chartHeight - ((p.today - min) / range) * (chartHeight - 10) - 5
    return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`
  }).join(' ')
}

const trendPath = computed(() => buildTrendPath(historyData.value))

// 趋势方向
const trendDirection = computed(() => {
  if (historyData.value.length < 2) return 'stable'
  const recent = historyData.value.slice(-3)
  const earlier = historyData.value.slice(0, 3)
  const recentAvg = recent.reduce((s, p) => s + p.today, 0) / recent.length
  const earlierAvg = earlier.reduce((s, p) => s + p.today, 0) / earlier.length
  if (recentAvg > earlierAvg * 1.05) return 'up'
  if (recentAvg < earlierAvg * 0.95) return 'down'
  return 'stable'
})

const trendEmoji = computed(() => {
  return trendDirection.value === 'up' ? '📈' : trendDirection.value === 'down' ? '📉' : '➡️'
})

const trendText = computed(() => {
  return trendDirection.value === 'up' ? '上升' : trendDirection.value === 'down' ? '下降' : '平稳'
})
</script>

<template>
  <div class="card library-card">
    <div class="card-header">
      <span class="card-title">📚 图书馆入馆数据</span>
      <span class="card-badge">{{ lastUpdate || '--:--:--' }}</span>
    </div>
    
    <div class="library-stats">
      <div class="stat-item">
        <span class="stat-label">今日入馆</span>
        <div class="stat-value">
          <span class="stat-number">{{ libData?.today ?? '--' }}</span>
          <span class="stat-unit">人</span>
        </div>
      </div>
      <div class="stat-item">
        <span class="stat-label">本周累计</span>
        <div class="stat-value">
          <span class="stat-number">{{ libData?.week ?? '--' }}</span>
          <span class="stat-unit">人</span>
        </div>
      </div>
      <div class="stat-item">
        <span class="stat-label">本月累计</span>
        <div class="stat-value">
          <span class="stat-number">{{ libData?.month ?? '--' }}</span>
          <span class="stat-unit">人</span>
        </div>
      </div>
    </div>

    <!-- 入馆趋势图 -->
    <div class="trend-section" v-if="trendLoaded && historyData.length >= 2">
      <div class="trend-header">
        <span class="trend-title">📊 今日入馆趋势</span>
        <span class="trend-direction">{{ trendEmoji }} {{ trendText }}</span>
      </div>
      <svg class="trend-chart" :viewBox="`0 0 ${chartWidth} ${chartHeight}`" preserveAspectRatio="none">
        <defs>
          <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="var(--accent-color, #3b82f6)" stop-opacity="0.3"/>
            <stop offset="100%" stop-color="var(--accent-color, #3b82f6)" stop-opacity="0"/>
          </linearGradient>
        </defs>
        <path v-if="trendPath" :d="`${trendPath} L ${chartWidth} ${chartHeight} L 0 ${chartHeight} Z`" fill="url(#trendGradient)"/>
        <path v-if="trendPath" :d="trendPath" fill="none" stroke="var(--accent-color, #3b82f6)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <div class="trend-labels">
        <span>{{ historyData[0]?.time || '' }}</span>
        <span>{{ historyData[Math.floor(historyData.length / 2)]?.time || '' }}</span>
        <span>{{ historyData[historyData.length - 1]?.time || '' }}</span>
      </div>
    </div>

    <div class="card-footer">
      <span class="source-tag">🏛️ 图书馆系统 · FanStudio API</span>
    </div>
  </div>
</template>

<style scoped>
@import '../../styles/card/library-card.css';

.trend-section {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid var(--border-color, rgba(255,255,255,0.08));
}

.trend-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-size: 0.75rem;
}

.trend-title {
  color: var(--text-secondary, #94a3b8);
  font-weight: 500;
}

.trend-direction {
  color: var(--text-secondary, #94a3b8);
}

.trend-chart {
  width: 100%;
  height: 60px;
  opacity: 0.9;
}

.trend-labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.65rem;
  color: var(--text-secondary, #64748b);
  margin-top: 4px;
}
</style>