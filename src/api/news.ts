import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE_URL || ''

export interface NewsArticle {
  article_id: number
  title: string
  date: string
  summary?: string
  url?: string
}

export interface NewsDetail {
  article_id: number
  title: string
  date: string
  source: string
  views: number
  content: string
  source_key: string
  source_name: string
}

export interface NewsListResponse {
  source: string
  source_name: string
  page: number
  total_pages: number
  total_articles: number
  articles: NewsArticle[]
}

export interface NewsSource {
  key: string
  name: string
  list_url: string
  category_id: number
}

// ===== 简单内存缓存 =====
interface CacheEntry<T> {
  data: T
  timestamp: number
}

const cache = new Map<string, CacheEntry<unknown>>()
const LIST_TTL = 120_000       // 列表缓存 2 分钟
const DETAIL_TTL = 300_000     // 详情缓存 5 分钟
const SOURCES_TTL = 600_000    // 数据源列表缓存 10 分钟

function getCached<T>(key: string, ttl: number): T | null {
  const entry = cache.get(key)
  if (entry && Date.now() - entry.timestamp < ttl) {
    return entry.data as T
  }
  return null
}

function setCache(key: string, data: unknown): void {
  cache.set(key, { data, timestamp: Date.now() })
}

/** 获取文章列表（分页） */
export async function fetchNewsList(
  source: string,
  page: number = 1
): Promise<NewsListResponse | null> {
  const cacheKey = `news_list_${source}_${page}`
  const cached = getCached<NewsListResponse>(cacheKey, LIST_TTL)
  if (cached) return cached

  try {
    const res = await axios.get<NewsListResponse>(
      `${API_BASE}/api/v1/news/${source}/list`,
      { params: { page } }
    )
    setCache(cacheKey, res.data)
    return res.data
  } catch (e) {
    console.error(`获取新闻列表失败 [${source}]:`, e)
    return null
  }
}

/** 获取最新文章（增量更新） */
export async function fetchNewsLatest(source: string): Promise<NewsListResponse | null> {
  const cacheKey = `news_latest_${source}`
  const cached = getCached<NewsListResponse>(cacheKey, LIST_TTL)
  if (cached) return cached

  try {
    const res = await axios.get<NewsListResponse>(
      `${API_BASE}/api/v1/news/${source}/latest`
    )
    setCache(cacheKey, res.data)
    return res.data
  } catch (e) {
    console.error(`获取最新新闻失败 [${source}]:`, e)
    return null
  }
}

/** 获取文章详情 */
export async function fetchNewsDetail(
  source: string,
  articleId: number
): Promise<NewsDetail | null> {
  const cacheKey = `news_detail_${source}_${articleId}`
  const cached = getCached<NewsDetail>(cacheKey, DETAIL_TTL)
  if (cached) return cached

  try {
    const res = await axios.get<NewsDetail>(
      `${API_BASE}/api/v1/news/${source}/article/${articleId}`
    )
    setCache(cacheKey, res.data)
    return res.data
  } catch (e) {
    console.error(`获取新闻详情失败 [${source}/${articleId}]:`, e)
    return null
  }
}

/** 获取可用数据源列表 */
export async function fetchNewsSources(): Promise<NewsSource[]> {
  const cacheKey = 'news_sources'
  const cached = getCached<NewsSource[]>(cacheKey, SOURCES_TTL)
  if (cached) return cached

  try {
    const res = await axios.get<{ sources: NewsSource[] }>(
      `${API_BASE}/api/v1/news/sources`
    )
    setCache(cacheKey, res.data.sources)
    return res.data.sources
  } catch (e) {
    console.error('获取新闻数据源失败:', e)
    return []
  }
}