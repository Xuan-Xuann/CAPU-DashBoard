<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import type { GuideItem } from '@/data/types/guide'

const props = defineProps<{
  item: GuideItem
  isExpanded: boolean
}>()

const emit = defineEmits<{
  'toggle': [id: string]
}>()

const router = useRouter()

// 预览步骤（最多3步）
const previewSteps = computed(() => props.item.steps.slice(0, 3))

function handleCardClick() {
  emit('toggle', props.item.id)
}

function handleViewDetail(e: Event) {
  e.stopPropagation()
  router.push(`/guide/${props.item.id}`)
}
</script>

<template>
  <div class="guide-card" :class="{ expanded: isExpanded }">
    <!-- 卡片主体 -->
    <div class="card-main" @click="handleCardClick">
      <div class="card-header">
        <span class="card-icon">{{ item.icon }}</span>
        <div class="card-title-wrapper">
          <h3 class="card-title">{{ item.title }}</h3>
          <p class="card-description">{{ item.description }}</p>
        </div>
      </div>
      
      <div class="card-tags">
        <span v-for="tag in item.tags.slice(0, 2)" :key="tag" class="tag">
          #{{ tag }}
        </span>
        <span class="step-count">{{ item.steps.length }}个步骤</span>
      </div>
      
      <div class="card-meta">
        <span v-if="item.contributor" class="contributor">
          💡 {{ item.contributor }}
        </span>
      </div>
    </div>
    
    <!-- 展开区域 -->
    <Transition name="expand">
      <div v-if="isExpanded" class="card-expand">
        <div class="expand-divider"></div>
        
        <!-- 步骤预览 -->
        <div class="steps-preview">
          <div v-for="step in previewSteps" :key="step.step" class="step-item">
            <span class="step-number">{{ step.step }}</span>
            <div class="step-content">
              <span class="step-title">{{ step.title }}</span>
              <span class="step-desc">{{ step.description }}</span>
            </div>
          </div>
        </div>
        
        <!-- 查看完整教程 -->
        <button class="view-detail-btn" @click="handleViewDetail">
          查看完整教程 →
        </button>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.guide-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  transition: all 0.25s ease;
  overflow: hidden;
}

.guide-card:hover {
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 8px 24px rgba(79, 70, 229, 0.08);
}

.card-main {
  padding: 22px 24px;
  cursor: pointer;
}

.card-header {
  display: flex;
  gap: 14px;
  margin-bottom: 14px;
}

.card-icon {
  font-size: 32px;
  line-height: 1;
}

.card-title-wrapper {
  flex: 1;
}

.card-title {
  font-size: 18px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 4px;
}

.card-description {
  font-size: 13px;
  color: #64748b;
}

.card-tags {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 10px;
}

.tag {
  font-size: 12px;
  color: #4f46e5;
  background: rgba(79, 70, 229, 0.08);
  padding: 3px 10px;
  border-radius: 20px;
}

.step-count {
  font-size: 12px;
  color: #94a3b8;
  margin-left: auto;
}

.card-meta {
  font-size: 12px;
  color: #94a3b8;
}

/* 展开区域 */
.expand-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(79, 70, 229, 0.15), transparent);
  margin: 0 24px;
}

.card-expand {
  padding: 18px 24px 22px;
  background: rgba(255, 255, 255, 0.3);
}

.steps-preview {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 20px;
}

.step-item {
  display: flex;
  gap: 12px;
}

.step-number {
  width: 24px;
  height: 24px;
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color: white;
  font-size: 12px;
  font-weight: 600;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.step-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.step-title {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
}

.step-desc {
  font-size: 13px;
  color: #64748b;
}

.view-detail-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 20px;
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color: white;
  font-size: 14px;
  font-weight: 600;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.2);
}

.view-detail-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(79, 70, 229, 0.3);
}

/* 展开动画 */
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* 移动端 */
@media (max-width: 768px) {
  .card-main {
    padding: 18px 20px;
  }
  
  .card-icon {
    font-size: 28px;
  }
  
  .card-title {
    font-size: 16px;
  }
  
  .card-expand {
    padding: 16px 20px 20px;
  }
}
</style>