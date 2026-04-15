import axios from 'axios'

export interface StatusSummary {
  overall_status: string
  total_sources: number
  operational_sources: number
  total_requests_today: number
  library_today: number
  uptime_seconds: number
  last_check: number
}

const API_BASE = import.meta.env.VITE_API_BASE_URL

export async function fetchStatusSummary(): Promise<StatusSummary | null> {
  try {
    const response = await axios.get<StatusSummary>(`${API_BASE}/api/v1/status/summary`)
    return response.data
  } catch (error) {
    console.error('获取系统状态失败:', error)
    return null
  }
}