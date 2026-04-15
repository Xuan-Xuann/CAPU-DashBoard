<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import GuideCategory from '@/components/cards/guidepage/GuideCategory.vue'
import GuideCard from '@/components/cards/guidepage/GuideCard.vue'
import { fetchGuideData } from '@/data/guideLoader'
import type { GuideItem } from '@/data/types/guide'
import type { GuideCategory as CategoryType } from '@/data/types/guide'

const guideItems = ref<GuideItem[]>([])
const loading = ref(true)
const activeCategory = ref<CategoryType | 'all'>('all')
const expandedId = ref<string | null>(null)

const categories = [
  { id: 'all' as const, label: '全部', icon: '📋' },
  { id: 'library' as const, label: '图书馆', icon: '📚' },
  { id: 'canteen' as const, label: '食堂', icon: '🍜' },
  { id: 'dorm' as const, label: '宿舍', icon: '🏠' },
  { id: 'transport' as const, label: '交通', icon: '🚌' },
  { id: 'map' as const, label: '地图', icon: '🗺️' },
  { id: 'process' as const, label: '入学流程', icon: '✅' },
]

const filteredItems = computed(() => {
  if (activeCategory.value === 'all') {
    return guideItems.value.filter(item => item.status === 'published')
  }
  return guideItems.value.filter(
    item => item.category === activeCategory.value && item.status === 'published'
  )
})

function handleCategoryChange(category: CategoryType | 'all') {
  activeCategory.value = category
  expandedId.value = null
}

function handleCardToggle(id: string) {
  expandedId.value = expandedId.value === id ? null : id
}

onMounted(async () => {
  guideItems.value = await fetchGuideData()
  loading.value = false
})
</script>

<template>
  <div class="guide-page">
    <div class="page-header">
      <h1>🎓 新生引导</h1>
      <p class="subtitle">快速了解校园生活，一站式完成入学准备</p>
    </div>

    <GuideCategory
      :categories="categories"
      :active-category="activeCategory"
      @change="handleCategoryChange"
    />

    <div v-if="loading" class="loading-state">
      <div class="loading-spinner"></div>
      <span>加载引导内容...</span>
    </div>

    <div v-else class="guide-grid">
      <GuideCard
        v-for="item in filteredItems"
        :key="item.id"
        :item="item"
        :is-expanded="expandedId === item.id"
        @toggle="handleCardToggle"
      />
      
      <div v-if="filteredItems.length === 0" class="empty-state">
        <span class="empty-icon">📭</span>
        <p>该分类下暂无引导内容</p>
        <p class="empty-hint">欢迎提交你的建议！</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.guide-page {
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 24px;
}

.page-header h1 {
  font-size: 32px;
  font-weight: 700;
  background: linear-gradient(135deg, #1e293b 0%, #4a4a6a 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 8px;
}

.subtitle {
  color: #64748b;
  font-size: 15px;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px;
  color: #64748b;
  gap: 16px;
}

.loading-spinner {
  width: 36px;
  height: 36px;
  border: 3px solid rgba(79, 70, 229, 0.1);
  border-top-color: #4f46e5;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.guide-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #64748b;
}

.empty-icon {
  font-size: 48px;
  opacity: 0.5;
  display: block;
  margin-bottom: 16px;
}

.empty-hint {
  font-size: 13px;
  color: #94a3b8;
  margin-top: 8px;
}

@media (max-width: 768px) {
  .page-header h1 {
    font-size: 26px;
  }
  
  .subtitle {
    font-size: 14px;
  }
}
</style>