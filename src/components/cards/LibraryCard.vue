<script setup lang="ts">
import { inject, type Ref } from 'vue'
import type { LibraryStats } from '../../api/library'

// 从父组件注入数据，不再自己请求 以免增加一次请求
const libData = inject<Ref<Partial<LibraryStats>>>('libraryStats')
const lastUpdate = inject<Ref<string>>('libraryLastUpdate')
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

    <div class="card-footer">
      <span class="source-tag">数据源: api.rinty.xyz</span>
    </div>
  </div>
</template>

<style scoped>
@import '../../styles/card/library-card.css';
</style>