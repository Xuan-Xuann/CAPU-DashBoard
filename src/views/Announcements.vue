<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import {
  fetchNewsList,
  fetchNewsDetail,
  type NewsArticle,
  type NewsDetail,
} from '../api/news'

// ===== 数据源 Tab 配置 =====
const tabs = [
  { key: 'announcements', label: '通知公告', icon: '📢' },
  { key: 'campus-news', label: '学校要闻', icon: '📰' },
  { key: 'academic', label: '教务处', icon: '📋' },
]

// ===== 状态 =====
const activeTab = ref('announcements')
const articles = ref<NewsArticle[]>([])
const loading = ref(true)
const currentPage = ref(1)
const totalPages = ref(1)
const totalArticles = ref(0)
const expandedId = ref<number | null>(null)
const detailCache = ref<Record<number, NewsDetail>>({})
const detailLoading = ref(false)

// ===== 方法 =====
async function loadPage(source: string, page: number) {
  loading.value = true
  expandedId.value = null
  const data = await fetchNewsList(source, page)
  if (data) {
    articles.value = data.articles
    currentPage.value = data.page
    totalPages.value = data.total_pages
    totalArticles.value = data.total_articles
  } else {
    articles.value = []
  }
  loading.value = false
}

async function toggleDetail(article: NewsArticle) {
  const id = article.article_id
  if (expandedId.value === id) {
    expandedId.value = null
    return
  }
  expandedId.value = id
  if (!detailCache.value[id]) {
    detailLoading.value = true
    const detail = await fetchNewsDetail(activeTab.value, id)
    if (detail) {
      detailCache.value[id] = detail
      if (!article.summary) {
        article.summary = stripHtml(detail.content, 100)
      }
    }
    detailLoading.value = false
  }
}

function goPage(page: number) {
  if (page < 1 || page > totalPages.value || page === currentPage.value) return
  loadPage(activeTab.value, page)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// ===== 分页按钮 =====
const pageButtons = computed(() => {
  const pages: (number | string)[] = []
  const total = totalPages.value
  const cur = currentPage.value
  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i)
  } else {
    pages.push(1)
    if (cur > 3) pages.push('...')
    const start = Math.max(2, cur - 1)
    const end = Math.min(total - 1, cur + 1)
    for (let i = start; i <= end; i++) pages.push(i)
    if (cur < total - 2) pages.push('...')
    pages.push(total)
  }
  return pages
})

// ===== 格式化 =====
function fmtDate(date: string) {
  if (!date) return ''
  const d = date.replace(/(\d{4})-(\d{2})-(\d{2})/, '$1/$2/$3')
  return d
}

function stripHtml(html: string, maxLen = 200) {
  const text = html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
  return text.length > maxLen ? text.slice(0, maxLen) + '…' : text
}

// ===== 切换 Tab =====
watch(activeTab, (tab) => {
  currentPage.value = 1
  detailCache.value = {}
  loadPage(tab, 1)
})

onMounted(() => loadPage(activeTab.value, 1))
</script>

<template>
  <div class="news-page">
    <!-- 头部 -->
    <div class="page-header">
      <h1>📢 校园公告</h1>
      <p class="subtitle">来自学校官网的最新通知与要闻</p>
    </div>

    <!-- Tab 切换栏 -->
    <div class="tab-bar">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        class="tab-btn"
        :class="{ active: activeTab === tab.key }"
        @click="activeTab = tab.key"
      >
        <span class="tab-icon">{{ tab.icon }}</span>
        <span class="tab-label">{{ tab.label }}</span>
      </button>
    </div>

    <!-- 加载状态 -->
    <div v-if="loading" class="loading-area">
      <div v-for="i in 5" :key="i" class="skeleton-card">
        <div class="skeleton-line w-70"></div>
        <div class="skeleton-line w-40"></div>
        <div class="skeleton-line w-100"></div>
      </div>
    </div>

    <!-- 文章列表 -->
    <div v-else class="article-list">
      <article
        v-for="item in articles"
        :key="item.article_id"
        class="article-card"
        :class="{ expanded: expandedId === item.article_id }"
      >
        <!-- 卡片头部：标题 + 元信息 -->
        <div class="card-main" @click="toggleDetail(item)">
          <div class="card-top">
            <h2 class="card-title">{{ item.title }}</h2>
            <span class="expand-icon">{{ expandedId === item.article_id ? '▲' : '▼' }}</span>
          </div>
          <div class="card-meta">
            <span class="meta-date">📅 {{ fmtDate(item.date) }}</span>
            <span class="meta-summary" :class="{ 'no-summary': !item.summary }" :title="item.summary || ''">
              {{ item.summary || '暂无摘要' }}
            </span>
          </div>
        </div>

        <!-- 展开详情 -->
        <div v-if="expandedId === item.article_id" class="card-detail">
          <div v-if="detailLoading" class="detail-loading">
            <span class="spinner"></span> 加载中…
          </div>
          <div v-else-if="detailCache[item.article_id]" class="detail-body">
            <div class="detail-header">
              <h3 class="detail-title">{{ detailCache[item.article_id].title }}</h3>
              <div class="detail-meta-bar">
                <span>📅 {{ fmtDate(detailCache[item.article_id].date) }}</span>
                <span v-if="detailCache[item.article_id].source">📌 {{ detailCache[item.article_id].source }}</span>
                <span>👁 {{ detailCache[item.article_id].views || 0 }} 阅读</span>
              </div>
            </div>
            <div
              class="detail-content"
              v-html="detailCache[item.article_id].content"
            ></div>
          </div>
          <div v-else class="detail-error">加载失败，请重试</div>
        </div>
      </article>

      <!-- 空状态 -->
      <div v-if="articles.length === 0" class="empty-state">
        <span class="empty-icon">📭</span>
        <p>暂无数据</p>
      </div>
    </div>

    <!-- 分页 -->
    <div v-if="totalPages > 1" class="pagination">
      <button
        class="page-btn"
        :disabled="currentPage === 1"
        @click="goPage(currentPage - 1)"
      >
        ‹ 上一页
      </button>
      <template v-for="p in pageButtons" :key="p">
        <span v-if="p === '...'" class="page-ellipsis">…</span>
        <button
          v-else
          class="page-btn"
          :class="{ current: p === currentPage }"
          @click="goPage(p as number)"
        >
          {{ p }}
        </button>
      </template>
      <button
        class="page-btn"
        :disabled="currentPage === totalPages"
        @click="goPage(currentPage + 1)"
      >
        下一页 ›
      </button>
    </div>

    <!-- 底部统计 -->
    <div v-if="totalArticles > 0" class="footer-stats">
      共 {{ totalArticles }} 篇文章
    </div>
  </div>
</template>

<style scoped>
/* ===== 页面容器 ===== */
.news-page {
  max-width: 860px;
  margin: 0 auto;
  padding-bottom: 48px;
}

.page-header {
  margin-bottom: 28px;
}
.page-header h1 {
  font-size: 28px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 6px;
  letter-spacing: -0.02em;
}
.subtitle {
  color: #64748b;
  font-size: 14px;
}

/* ===== Tab 栏 ===== */
.tab-bar {
  display: flex;
  gap: 4px;
  background: #f1f5f9;
  border-radius: 14px;
  padding: 4px;
  margin-bottom: 28px;
}
.tab-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px 16px;
  border: none;
  border-radius: 11px;
  background: transparent;
  color: #64748b;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}
.tab-btn:hover {
  color: #334155;
  background: rgba(255,255,255,0.6);
}
.tab-btn.active {
  background: #fff;
  color: #0f172a;
  font-weight: 600;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
}
.tab-icon {
  font-size: 16px;
}

/* ===== 骨架屏 ===== */
.loading-area {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.skeleton-card {
  background: #fff;
  border-radius: 14px;
  padding: 24px 28px;
}
.skeleton-line {
  height: 14px;
  background: linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
  margin-bottom: 10px;
}
.skeleton-line:last-child { margin-bottom: 0; }
.w-70 { width: 70%; }
.w-40 { width: 40%; }
.w-100 { width: 100%; }

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* ===== 文章卡片 ===== */
.article-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.article-card {
  background: #fff;
  border-radius: 14px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
  transition: box-shadow 0.2s, border-color 0.2s;
}
.article-card:hover {
  border-color: #cbd5e1;
  box-shadow: 0 2px 12px rgba(0,0,0,0.05);
}
.article-card.expanded {
  border-color: #93c5fd;
  box-shadow: 0 4px 20px rgba(59,130,246,0.08);
}

.card-main {
  padding: 20px 24px;
  cursor: pointer;
  user-select: none;
}
.card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
}
.card-title {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  line-height: 1.5;
  margin: 0;
  flex: 1;
}
.expand-icon {
  color: #94a3b8;
  font-size: 11px;
  flex-shrink: 0;
  margin-top: 3px;
}
.card-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 10px;
  font-size: 13px;
  color: #94a3b8;
}
.meta-date {
  flex-shrink: 0;
}
.meta-summary {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.meta-summary.no-summary {
  color: #cbd5e1;
  font-style: italic;
}

/* ===== 展开详情 ===== */
.card-detail {
  border-top: 1px solid #e2e8f0;
  padding: 24px 28px 28px;
  background: #f8fafc;
}
.detail-loading {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #94a3b8;
  font-size: 14px;
}
.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid #e2e8f0;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

.detail-header {
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e2e8f0;
}
.detail-title {
  font-size: 20px;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.4;
  margin: 0 0 12px;
}
.detail-meta-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  font-size: 13px;
  color: #64748b;
}

.detail-content :deep(p) {
  font-size: 15px;
  line-height: 1.85;
  color: #334155;
  margin: 0 0 12px;
  text-indent: 2em;
}
.detail-content :deep(p:last-child) {
  margin-bottom: 0;
}
.detail-content :deep(img) {
  max-width: 100%;
  border-radius: 8px;
  margin: 8px 0;
}
.detail-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 12px 0;
  font-size: 14px;
  word-break: break-all;
}
.detail-content :deep(th),
.detail-content :deep(td) {
  border: 1px solid #cbd5e1;
  padding: 8px 12px;
  text-align: left;
  vertical-align: top;
  min-width: 40px;
}
.detail-content :deep(th) {
  background: #f1f5f9;
  font-weight: 600;
  color: #1e293b;
  white-space: nowrap;
}
.detail-content :deep(tr:nth-child(even) td) {
  background: #fafbfc;
}
.detail-content :deep(ul),
.detail-content :deep(ol) {
  padding-left: 1.5em;
  margin: 8px 0;
}
.detail-content :deep(li) {
  font-size: 15px;
  line-height: 1.8;
  color: #334155;
  margin-bottom: 4px;
}
.detail-content :deep(a) {
  color: #2563eb;
  text-decoration: underline;
  word-break: break-all;
}

.detail-error {
  color: #ef4444;
  font-size: 14px;
}

/* ===== 空状态 ===== */
.empty-state {
  text-align: center;
  padding: 64px 0;
  color: #94a3b8;
}
.empty-icon {
  font-size: 48px;
  display: block;
  margin-bottom: 12px;
}

/* ===== 分页 ===== */
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 32px;
}
.page-btn {
  min-width: 36px;
  height: 36px;
  padding: 0 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: #fff;
  color: #475569;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.15s;
}
.page-btn:hover:not(:disabled):not(.current) {
  border-color: #93c5fd;
  color: #2563eb;
}
.page-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.page-btn.current {
  background: #3b82f6;
  border-color: #3b82f6;
  color: #fff;
  font-weight: 600;
}
.page-ellipsis {
  width: 36px;
  text-align: center;
  color: #94a3b8;
}

/* ===== 底部统计 ===== */
.footer-stats {
  text-align: center;
  margin-top: 20px;
  font-size: 13px;
  color: #94a3b8;
}

/* ===== 移动端 ===== */
@media (max-width: 640px) {
  .news-page { padding: 0 2px 48px; }
  .page-header h1 { font-size: 22px; }
  .tab-btn { padding: 8px 8px; font-size: 12px; gap: 3px; }
  .tab-icon { font-size: 13px; }
  .tab-label { display: none; }
  .card-main { padding: 14px 16px; }
  .card-title { font-size: 14px; }
  .card-detail { padding: 14px 16px 18px; }
  .detail-title { font-size: 17px; }
  .detail-content :deep(p) { font-size: 14px; text-indent: 1.5em; }
  .detail-content :deep(table) { font-size: 12px; }
  .detail-content :deep(th),
  .detail-content :deep(td) { padding: 6px 8px; }

  /* 分页栏：横向滚动 */
  .pagination {
    flex-wrap: nowrap;
    overflow-x: auto;
    justify-content: flex-start;
    gap: 4px;
    margin-top: 24px;
    padding-bottom: 4px;
    -webkit-overflow-scrolling: touch;
  }
  .pagination::-webkit-scrollbar { display: none; }
  .page-btn {
    min-width: 28px;
    height: 32px;
    font-size: 13px;
    padding: 0 8px;
    flex-shrink: 0;
  }
  .page-ellipsis { width: 24px; flex-shrink: 0; }

  /* 表格容器横向滚动 */
  .detail-content {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
}
</style>