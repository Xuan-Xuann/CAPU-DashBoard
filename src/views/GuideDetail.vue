<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchGuideById } from '@/data/guideLoader'
import type { GuideItem } from '@/data/types/guide'

const route = useRoute()
const router = useRouter()

// 改前：const guideItem = ref<GuideItem | null>(null)
// 改后：允许 undefined
const guideItem = ref<GuideItem | null | undefined>(null)
const loading = ref(true)

function goBack() {
  router.push('/guide')
}

onMounted(async () => {
  const id = route.params.id as string
  // fetchGuideById 返回 GuideItem | undefined
  guideItem.value = await fetchGuideById(id)
  loading.value = false
})


</script>

<template>
  <div class="guide-detail-page">
    <button class="back-btn" @click="goBack">
      ← 返回引导首页
    </button>

    <div v-if="loading" class="loading-state">
      <div class="loading-spinner"></div>
      <span>加载中...</span>
    </div>

    <div v-else-if="guideItem" class="detail-content">
  <!-- 头部 -->
  <div class="detail-header">
    <span class="detail-icon">{{ guideItem.icon }}</span>
    <h1>{{ guideItem.title }}</h1>
  </div>

  <!-- 元信息 -->
  <div class="detail-meta">
    <span v-if="guideItem.contributor">💡 {{ guideItem.contributor }}</span>
    <span v-if="guideItem.updatedAt">📅 更新于 {{ guideItem.updatedAt }}</span>
    <span>👁 {{ guideItem.viewCount || 0 }} 次浏览</span>
    <span>👍 {{ guideItem.helpfulCount || 0 }} 人觉得有用</span>
  </div>

  <!-- 标签 -->
  <div class="detail-tags">
    <span v-for="tag in guideItem.tags" :key="tag" class="tag">#{{ tag }}</span>
  </div>

  <!-- 内容区域 -->
  <div class="detail-body">
    <template v-for="(block, index) in guideItem.content" :key="index">
      <!-- 段落 -->
      <p v-if="block.type === 'paragraph'" class="content-paragraph">
        {{ block.content }}
      </p>
      
      <!-- 提示 -->
      <div v-else-if="block.type === 'tip'" class="content-tip">
        <span class="tip-icon">💡</span>
        <span>{{ block.content }}</span>
      </div>
      
      <!-- 步骤 -->
      <div v-else-if="block.type === 'steps'" class="content-steps">
        <h3>📋 详细步骤</h3>
        <div v-for="step in (block.content as any[])" :key="step.step" class="detail-step">
          <span class="step-num">{{ step.step }}</span>
          <div class="step-info">
            <span class="step-name">{{ step.title }}</span>
            <span class="step-text">{{ step.description }}</span>
          </div>
        </div>
      </div>
    </template>
  </div>

  <!-- 有帮助按钮 -->
  <div class="helpful-section">
    <span>这篇指南对你有帮助吗？</span>
    <button class="helpful-btn">👍 有帮助</button>
  </div>
</div>

    <div v-else class="error-state">
      <span>😵 未找到该引导内容</span>
      <button @click="goBack">返回首页</button>
    </div>
  </div>
</template>

<style scoped>
.guide-detail-page {
  max-width: 800px;
  margin: 0 auto;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 0;
  background: none;
  border: none;
  color: #4f46e5;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 24px;
  transition: transform 0.2s;
}

.back-btn:hover {
  transform: translateX(-4px);
}

.loading-state,
.error-state {
  text-align: center;
  padding: 80px 20px;
  color: #64748b;
}

.loading-spinner {
  width: 36px;
  height: 36px;
  margin: 0 auto 16px;
  border: 3px solid rgba(79, 70, 229, 0.1);
  border-top-color: #4f46e5;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.detail-content {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 28px;
  padding: 32px;
  border: 1px solid rgba(255, 255, 255, 0.5);
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.detail-icon {
  font-size: 48px;
}

.detail-header h1 {
  font-size: 28px;
  font-weight: 700;
  color: #1e293b;
}

.detail-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  font-size: 13px;
  color: #64748b;
  margin-bottom: 16px;
}

.detail-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 28px;
}

.tag {
  font-size: 12px;
  color: #4f46e5;
  background: rgba(79, 70, 229, 0.08);
  padding: 4px 12px;
  border-radius: 20px;
}

.detail-body {
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  padding-top: 28px;
}

.content-paragraph {
  line-height: 1.8;
  color: #334155;
  margin-bottom: 20px;
}

.content-tip {
  display: flex;
  gap: 12px;
  background: rgba(79, 70, 229, 0.06);
  padding: 16px 20px;
  border-radius: 16px;
  margin-bottom: 20px;
  color: #4f46e5;
}

.tip-icon {
  font-size: 20px;
}

.content-steps h3 {
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 20px;
}

.detail-step {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
}

.step-num {
  width: 28px;
  height: 28px;
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color: white;
  font-size: 14px;
  font-weight: 600;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.step-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.step-name {
  font-weight: 600;
  color: #1e293b;
}

.step-text {
  color: #64748b;
  line-height: 1.6;
}

.helpful-section {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  color: #64748b;
}

.helpful-btn {
  padding: 10px 24px;
  background: white;
  border: 1px solid rgba(79, 70, 229, 0.2);
  border-radius: 30px;
  color: #4f46e5;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.helpful-btn:hover {
  background: #4f46e5;
  color: white;
}

.error-state button {
  margin-top: 20px;
  padding: 10px 24px;
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .detail-content {
    padding: 20px;
  }
  
  .detail-header h1 {
    font-size: 22px;
  }
  
  .detail-meta {
    gap: 12px;
  }
}
</style>