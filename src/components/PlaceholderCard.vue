<!-- 
  PlaceholderCard — 占位卡片
  用于展示"即将上线"的功能模块
-->
<script setup lang="ts">
defineProps<{
  emoji: string
  title: string
  description: string
  badge: string
}>()
</script>

<template>
  <div class="card card-placeholder">
    <span class="emoji">{{ emoji }}</span>
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
    <span class="badge">{{ badge }}</span>
  </div>
</template>
