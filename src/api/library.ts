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

const API_BASE = 'http://127.0.0.1:8000'

export async function fetchLibraryStats(): Promise<LibraryStats | null> {
  try {
    const response = await axios.get<LibraryResponse>(`${API_BASE}/api/v1/library/stats`)
    if (response.data.code === 1 && response.data.data) {
      return response.data.data
    }
    return null
  } catch (error) {
    console.error('图书馆数据获取失败:', error)
    return null
  }
}