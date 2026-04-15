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

<style scoped>
.card {
  background: linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 24px;
  padding: 28px;
  box-shadow: 0 8px 32px rgba(79, 70, 229, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.6);
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 260px;
}

.card-placeholder {
  text-align: center;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(248,250,255,0.6) 100%);
}

.card-placeholder .emoji {
  font-size: 52px;
  margin-bottom: 16px;
  filter: drop-shadow(0 4px 8px rgba(79, 70, 229, 0.15));
  display: block;
}

.card-placeholder h3 {
  font-size: 18px;
  font-weight: 700;
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 8px;
}

.card-placeholder p {
  color: #6b7280;
  font-size: 14px;
  margin-bottom: 16px;
}

.badge {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color: white;
  padding: 6px 16px;
  border-radius: 30px;
  font-size: 12px;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
  display: inline-block;
}
</style>