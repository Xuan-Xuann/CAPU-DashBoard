<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function goHome() {
  router.push('/')
}

function goBack() {
  router.back()
}
</script>

<template>
  <div class="not-found-page">
    <div class="glass-card">
      <div class="error-icon">🔍</div>
      <div class="error-code">404</div>
      <h1>页面未找到</h1>
      <p class="message">
        你访问的页面可能已经移动、<br>
        被删除，或者从未存在过。
      </p>
      <div class="actions">
        <button class="btn btn-primary" @click="goHome">
          <span>🏠</span>
          <span>返回首页</span>
        </button>
        <button class="btn btn-secondary" @click="goBack">
          <span>←</span>
          <span>返回上一页</span>
        </button>
      </div>
      <div class="suggestion">
        或者试试访问
        <router-link to="/">数据看板</router-link>·
        <router-link to="/announcements">校园公告</router-link>·
        <router-link to="/guide">新生引导</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.not-found-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.glass-card {
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-radius: 48px;
  padding: 56px 48px;
  box-shadow: 
    inset 0 1px 1px rgba(255, 255, 255, 0.6),
    0 20px 40px rgba(79, 70, 229, 0.12);
  border: 0.5px solid rgba(255, 255, 255, 0.5);
  text-align: center;
  max-width: 500px;
  width: 100%;
  animation: float 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes float {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.error-icon {
  font-size: 56px;
  margin-bottom: 8px;
}

.error-code {
  font-size: 120px;
  font-weight: 800;
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 40%, #ec4899 80%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  line-height: 1;
  letter-spacing: -0.04em;
  margin-bottom: 16px;
}

h1 {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 12px;
  background: linear-gradient(135deg, #1e293b 0%, #4a4a6a 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.message {
  color: #64748b;
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 32px;
}

.actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  border-radius: 60px;
  font-weight: 600;
  font-size: 15px;
  border: none;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-primary {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color: white;
  box-shadow: 0 8px 20px rgba(79, 70, 229, 0.25);
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 28px rgba(79, 70, 229, 0.35);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(8px);
  color: #4a4a6a;
  border: 0.5px solid rgba(255, 255, 255, 0.8);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.8);
  transform: translateY(-3px);
}

.suggestion {
  margin-top: 32px;
  color: #94a3b8;
  font-size: 14px;
}

.suggestion a {
  color: #4f46e5;
  text-decoration: none;
  font-weight: 500;
  margin: 0 4px;
}

.suggestion a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .glass-card {
    padding: 40px 28px;
    border-radius: 36px;
  }
  
  .error-code {
    font-size: 90px;
  }
  
  .error-icon {
    font-size: 44px;
  }
  
  h1 {
    font-size: 24px;
  }
}
</style>