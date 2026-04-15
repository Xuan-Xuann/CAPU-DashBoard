<template>
  <div class="guide-page">
    <div class="page-header">
      <h1>新生引导</h1>
      <p>快速了解校园生活，一站式完成入学准备</p>
    </div>

    <div class="guide-grid">
      <div class="guide-card">
        <span class="emoji">📚</span>
        <h3>图书馆使用指南</h3>
        <p>如何借书、预约座位、使用电子资源</p>
        <button>查看教程 →</button>
      </div>
      
      <div class="guide-card">
        <span class="emoji">🍜</span>
        <h3>食堂与消费</h3>
        <p>各食堂位置、特色菜品、充值方式</p>
        <button>查看详情 →</button>
      </div>
      
      <div class="guide-card">
        <span class="emoji">🏠</span>
        <h3>宿舍服务</h3>
        <p>报修流程、水电充值、门禁时间</p>
        <button>查看详情 →</button>
      </div>
      
      <div class="guide-card">
        <span class="emoji">🚌</span>
        <h3>校内交通</h3>
        <p>校车时刻表、共享单车、停车指南</p>
        <button>查看详情 →</button>
      </div>
      
      <div class="guide-card highlight">
        <span class="emoji">🗺️</span>
        <h3>校园地图</h3>
        <p>教学楼、宿舍、食堂位置分布</p>
        <button>打开地图 →</button>
      </div>
      
      <div class="guide-card highlight">
        <span class="emoji">📋</span>
        <h3>入学流程清单</h3>
        <p>6 步完成所有入学手续</p>
        <button>开始办理 →</button>
      </div>
    </div>
    
  </div>
</template>

<style scoped>
.guide-page {
  max-width: 1200px;
  margin: 0 auto;
}

.guide-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  margin-top: 32px;
}

.guide-card {
  background: white;
  border-radius: 20px;
  padding: 28px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.04);
  transition: transform 0.2s;
}

.guide-card:hover {
  transform: translateY(-4px);
}

.guide-card.highlight {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.guide-card.highlight p {
  color: rgba(255,255,255,0.9);
}

.guide-card .emoji {
  font-size: 48px;
  display: block;
  margin-bottom: 20px;
}

.guide-card h3 {
  font-size: 20px;
  margin-bottom: 12px;
}

.guide-card p {
  color: #64748b;
  margin-bottom: 20px;
  line-height: 1.5;
}

.guide-card button {
  background: none;
  border: none;
  color: #3b82f6;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
}

.guide-card.highlight button {
  color: white;
}
</style>