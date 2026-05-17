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

/** 获取文章列表（分页） */
export async function fetchNewsList(
  source: string,
  page: number = 1
): Promise<NewsListResponse | null> {
  try {
    const res = await axios.get<NewsListResponse>(
      `${API_BASE}/api/v1/news/${source}/list`,
      { params: { page } }
    )
    return res.data
  } catch (e) {
    console.error(`获取新闻列表失败 [${source}]:`, e)
    return null
  }
}

/** 获取最新文章（增量更新） */
export async function fetchNewsLatest(source: string): Promise<NewsListResponse | null> {
  try {
    const res = await axios.get<NewsListResponse>(
      `${API_BASE}/api/v1/news/${source}/latest`
    )
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
  try {
    const res = await axios.get<NewsDetail>(
      `${API_BASE}/api/v1/news/${source}/article/${articleId}`
    )
    return res.data
  } catch (e) {
    console.error(`获取新闻详情失败 [${source}/${articleId}]:`, e)
    return null
  }
}

/** 获取可用数据源列表 */
export async function fetchNewsSources(): Promise<NewsSource[]> {
  try {
    const res = await axios.get<{ sources: NewsSource[] }>(
      `${API_BASE}/api/v1/news/sources`
    )
    return res.data.sources
  } catch (e) {
    console.error('获取新闻数据源失败:', e)
    return []
  }
}
