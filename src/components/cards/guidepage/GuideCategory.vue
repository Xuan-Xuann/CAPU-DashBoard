<script setup lang="ts">
import type { GuideCategory as CategoryType } from '@/data/types/guide'

defineProps<{
  categories: { id: CategoryType | 'all'; label: string; icon: string }[]
  activeCategory: CategoryType | 'all'
}>()

const emit = defineEmits<{
  'change': [category: CategoryType | 'all']
}>()
</script>

<template>
  <div class="guide-category">
    <button
      v-for="cat in categories"
      :key="cat.id"
      class="category-btn"
      :class="{ active: activeCategory === cat.id }"
      @click="emit('change', cat.id)"
    >
      <span class="cat-icon">{{ cat.icon }}</span>
      <span class="cat-label">{{ cat.label }}</span>
    </button>
  </div>
</template>

<style scoped>
.guide-category {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 28px;
}

.category-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 18px;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 40px;
  font-size: 14px;
  font-weight: 500;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s ease;
}

.category-btn:hover {
  background: rgba(255, 255, 255, 0.8);
  color: #4f46e5;
}

.category-btn.active {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color: white;
  border-color: transparent;
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.25);
}

.cat-icon {
  font-size: 16px;
}

.cat-label {
  font-size: 14px;
}

@media (max-width: 768px) {
  .guide-category {
    gap: 6px;
    margin-bottom: 20px;
  }
  
  .category-btn {
    padding: 8px 14px;
  }
  
  .cat-label {
    font-size: 13px;
  }
}
</style>