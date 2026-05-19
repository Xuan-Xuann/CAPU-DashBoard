import axios from 'axios'

export interface LibraryStats {
  today: number
  week: number
  month: number
}

export interface LibraryResponse {
  code: number
  data: LibraryStats
  message: string
  source: string
}

export interface HistoryPoint {
  time: string
  timestamp: number
  today: number
  week: number
  month: number
}

export interface LibraryHistoryResponse {
  code: number
  data: HistoryPoint[]
  message: string
  total: number
}

const API_BASE = import.meta.env.VITE_API_BASE_URL

// ===== 简单内存缓存 =====
interface CacheEntry<T> {
  data: T
  timestamp: number
}

const cache = new Map<string, CacheEntry<unknown>>()
const STATS_TTL = 60_000      // 统计数据缓存 1 分钟
const HISTORY_TTL = 300_000   // 历史数据缓存 5 分钟

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

export async function fetchLibraryStats(): Promise<LibraryStats | null> {
  // 检查缓存
  const cached = getCached<LibraryStats>('library_stats', STATS_TTL)
  if (cached) return cached

  try {
    const response = await axios.get<LibraryResponse>(`${API_BASE}/api/v1/library/stats`)
    if (response.data.code === 1 && response.data.data) {
      setCache('library_stats', response.data.data)
      return response.data.data
    }
    return null
  } catch (error) {
    console.error('图书馆数据获取失败:', error)
    return null
  }
}

export async function fetchLibraryHistory(): Promise<HistoryPoint[]> {
  // 检查缓存
  const cached = getCached<HistoryPoint[]>('library_history', HISTORY_TTL)
  if (cached) return cached

  try {
    const response = await axios.get<LibraryHistoryResponse>(`${API_BASE}/api/v1/library/history`)
    if (response.data.code === 1 && response.data.data) {
      setCache('library_history', response.data.data)
      return response.data.data
    }
    return []
  } catch (error) {
    console.error('图书馆历史数据获取失败:', error)
    return []
  }
}