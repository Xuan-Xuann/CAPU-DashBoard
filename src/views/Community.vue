<script setup lang="ts">
import { ref } from 'vue'

interface Message {
  id: number
  user: string
  avatar: string
  content: string
  time: string
}

const messages = ref<Message[]>([
  { id: 1, user: '张三', avatar: '👨‍🎓', content: '有人知道图书馆周末开吗？', time: '10:30' },
  { id: 2, user: '李四', avatar: '👩‍🎓', content: '开的，9:00-21:00', time: '10:32' },
  { id: 3, user: '王五', avatar: '🧑‍🏫', content: '记得带校园卡', time: '10:35' }
])

const newMessage = ref('')

function sendMessage() {
  if (newMessage.value.trim()) {
    messages.value.push({
      id: Date.now(),
      user: '我',
      avatar: '😊',
      content: newMessage.value,
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    })
    newMessage.value = ''
  }
}
</script>

<template>
  <div class="community-page">
    <div class="page-header">
      <h1>💬 校园交流</h1>
      <p>和同学们实时交流，分享校园生活</p>
    </div>

    <div class="chat-container">
      <div class="message-list">
        <div v-for="msg in messages" :key="msg.id" class="message-item" :class="{ 'is-self': msg.user === '我' }">
          <span class="avatar">{{ msg.avatar }}</span>
          <div class="message-content">
            <div class="message-header">
              <span class="user-name">{{ msg.user }}</span>
              <span class="time">{{ msg.time }}</span>
            </div>
            <p class="message-text">{{ msg.content }}</p>
          </div>
        </div>
      </div>

      <div class="message-input">
        <input 
          v-model="newMessage" 
          placeholder="说点什么..." 
          @keyup.enter="sendMessage"
        />
        <button @click="sendMessage">发送</button>
      </div>
    </div>
    
  </div>
</template>

<style scoped>
.community-page {
  max-width: 800px;
  margin: 0 auto;
  height: calc(100vh - 120px);
  display: flex;
  flex-direction: column;
}

.page-header {
  margin-bottom: 24px;
}

.page-header h1 {
  font-size: 28px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 6px;
}

.page-header p {
  color: #64748b;
  font-size: 14px;
}

.chat-container {
  flex: 1;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.04);
}

.message-list {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
}

.message-item {
  display: flex;
  gap: 14px;
  margin-bottom: 20px;
}

.message-item.is-self {
  flex-direction: row-reverse;
}

.avatar {
  width: 42px;
  height: 42px;
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
  border: 2px solid rgba(255, 255, 255, 0.6);
}

.message-content {
  max-width: 65%;
}

.message-header {
  margin-bottom: 6px;
}

.user-name {
  font-weight: 600;
  margin-right: 12px;
  color: #1e293b;
}

.time {
  font-size: 12px;
  color: #94a3b8;
}

.message-text {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(4px);
  padding: 12px 18px;
  border-radius: 20px;
  border-top-left-radius: 6px;
  line-height: 1.5;
  color: #334155;
  border: 0.5px solid rgba(255, 255, 255, 0.5);
}

.is-self .message-text {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color: white;
  border-radius: 20px;
  border-top-right-radius: 6px;
  border: none;
}

.message-input {
  display: flex;
  padding: 18px 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(8px);
}

.message-input input {
  flex: 1;
  padding: 12px 18px;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 30px;
  outline: none;
  font-size: 14px;
  color: #1e293b;
  transition: all 0.2s ease;
}

.message-input input:focus {
  background: rgba(255, 255, 255, 0.9);
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.message-input input::placeholder {
  color: #94a3b8;
}

.message-input button {
  margin-left: 14px;
  padding: 0 28px;
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color: white;
  border: none;
  border-radius: 30px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.25);
}

.message-input button:hover {
  transform: scale(1.02);
  box-shadow: 0 6px 16px rgba(79, 70, 229, 0.35);
}

.message-input button:active {
  transform: scale(0.98);
}

/* ===== 移动端适配 ===== */
@media (max-width: 768px) {
  .community-page {
    height: calc(100vh - 130px);
  }
  
  .page-header h1 {
    font-size: 24px;
  }
  
  .message-list {
    padding: 16px;
  }
  
  .message-content {
    max-width: 80%;
  }
  
  .message-text {
    padding: 10px 14px;
    font-size: 14px;
  }
  
  .message-input {
    padding: 12px 16px;
  }
  
  .message-input input {
    padding: 10px 14px;
  }
  
  .message-input button {
    padding: 0 20px;
  }
}
</style>