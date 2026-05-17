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
    <span class="placeholder-icon">{{ emoji }}</span>
    <h3 class="placeholder-title">{{ title }}</h3>
    <p class="placeholder-desc">{{ description }}</p>
    <span class="placeholder-badge">{{ badge }}</span>
  </div>
</template>

<style scoped>
.card-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 24px 20px;
  min-height: 180px;
  background: linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(248,250,255,0.5) 100%);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-style: dashed;
  transition: all 0.3s ease;
}

.card-placeholder:hover {
  background: linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(248,250,255,0.7) 100%);
  border-color: rgba(124, 58, 237, 0.3);
  transform: translateY(-3px);
  box-shadow: 0 12px 28px rgba(79, 70, 229, 0.06);
}

.placeholder-icon {
  font-size: 40px;
  margin-bottom: 14px;
  display: block;
  filter: grayscale(0.3);
  opacity: 0.8;
}

.placeholder-title {
  font-size: 16px;
  font-weight: 700;
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 6px;
}

.placeholder-desc {
  color: #94a3b8;
  font-size: 13px;
  margin-bottom: 14px;
  line-height: 1.4;
}

.placeholder-badge {
  background: linear-gradient(135deg, #a5b4fc 0%, #c4b5fd 100%);
  color: #4f46e5;
  padding: 4px 14px;
  border-radius: 30px;
  font-size: 11px;
  font-weight: 600;
  display: inline-block;
}
</style>
