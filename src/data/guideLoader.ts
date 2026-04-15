// YAML 加载器 + 类型校验

import type { GuideItem, GuideProposal } from './types/guide'
// @ts-ignore - YAML 文件导入
import guideDataYaml from '@/data/guide.data.yaml'
// @ts-ignore
import proposalsYaml from '@/data/guide.proposals.yaml'

/**
 * 加载正式引导数据
 */
export async function fetchGuideData(): Promise<GuideItem[]> {
  // 模拟异步，方便未来切换为 API 调用
  return Promise.resolve(guideDataYaml as GuideItem[])
}

/**
 * 按分类筛选
 */
export async function fetchGuideByCategory(category: string): Promise<GuideItem[]> {
  const allData = await fetchGuideData()
  if (category === 'all') return allData
  return allData.filter(item => item.category === category)
}

/**
 * 按 ID 获取单个引导项
 */
export async function fetchGuideById(id: string): Promise<GuideItem | undefined> {
  const allData = await fetchGuideData()
  return allData.find(item => item.id === id)
}


/**
 * 获取热门引导（按浏览量排序）
 */
export async function fetchPopularGuides(limit: number = 5): Promise<GuideItem[]> {
  const allData = await fetchGuideData()
  return allData
    .filter(item => item.status === 'published')
    .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
    .slice(0, limit)
}

/**
 * 加载用户提议
 */
export async function fetchProposals(): Promise<GuideProposal[]> {
  return Promise.resolve(proposalsYaml as GuideProposal[])
}