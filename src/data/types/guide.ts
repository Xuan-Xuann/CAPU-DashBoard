// src/types/guide.ts

export type GuideCategory = 'library' | 'canteen' | 'dorm' | 'transport' | 'map' | 'process'

export interface GuideStep {
  step: number
  title: string
  description: string
  image?: string
  link?: string
}

export interface ContentBlock {
  type: 'paragraph' | 'steps' | 'image' | 'tip' | 'attachment'
  content: any
}

export interface GuideItem {
  id: string
  icon: string
  title: string
  description: string
  category: GuideCategory
  tags: string[]
  steps: GuideStep[]
  content: ContentBlock[]
  contributor?: string
  updatedAt?: string
  status?: 'published' | 'draft' | 'review'
  viewCount?: number
  helpfulCount?: number
}

export interface GuideProposal {
  id: string
  title: string
  description: string
  category: GuideCategory
  content: string
  contact?: string
  submittedAt: string
  status: 'pending' | 'approved' | 'rejected'
}