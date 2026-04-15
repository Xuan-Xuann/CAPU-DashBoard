import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: () => import('../views/DashBoard.vue'),
      meta: { title: '数据看板' }
    },
    {
      path: '/announcements',
      name: 'announcements',
      component: () => import('../views/Announcements.vue'),
      meta: { title: '校园公告' }
    },
    {
      path: '/guide',
      name: 'guide',
      component: () => import('../views/Guide.vue'),
      meta: { title: '新生引导' }
    },
    {
      path: '/guide/:id',
      name: 'guide-detail',
      component: () => import('../views/GuideDetail.vue'),
      meta: { title: '引导详情' }
    },
    {
      path: '/community',
      name: 'community',
      component: () => import('../views/Community.vue'),
      meta: { title: '用户交流' }
    }
  ]
})

// 设置页面标题
router.beforeEach((to) => {
  if (to.meta.title) {
    document.title = `${to.meta.title} · CAPU`
  }
})

export default router