import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE_URL || ''

export interface TemperatureResponse {
  code: number
  data: {
    temperature: string
    station_name: string
    update_time: string
  }
  message: string
}

/**
 * 获取实时温度
 */
export async function fetchTemperature(): Promise<TemperatureResponse['data'] | null> {
  try {
    const response = await axios.get<TemperatureResponse>(
      `${API_BASE}/api/v1/weather/temperature`
    )
    if (response.data.code === 1 && response.data.data) {
      return response.data.data
    }
    return null
  } catch (error) {
    console.error('获取温度失败:', error)
    return null
  }
}