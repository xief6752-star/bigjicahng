const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'database.sqlite'));

const newContent = `
  <h2>🆕 2026年6月重大线路升级：BGP三网优化 + 满血IEPL</h2>
  <p>寰宇云在 2026 年 6 月完成了重大架构升级，从单线 IPLC 全面跨入 <strong>BGP 三网优化专线</strong> 时代，骨干传输采用最高 2.5Gbps 的 <strong>满血 IEPL 广港内网通道</strong>。这意味着无论你是电信、联通还是移动宽带，都能体验到极低延迟的最优入口，历史痛点彻底解决！</p>
  
  <h2>⚡ 晚高峰不降速与流媒体全解锁</h2>
  <p>在晚高峰（晚上8点-11点）的实测中，各大运营商跑满本地宽带毫无压力，YouTube 4K 秒开。此外，全节点 <strong>原生 IP</strong>，完美解锁 Netflix、Disney+、YouTube Premium，以及 ChatGPT、Claude 等常用 AI 工具。</p>

  <h2>💰 官网链接与最新套餐（不限设备数）</h2>
  <p>全系套餐目前 <strong>完全不限制在线设备数量</strong>，全家共享极其划算。以下为最新套餐摘要：</p>
  <table>
      <thead>
          <tr>
              <th>套餐名称</th>
              <th>月流量</th>
              <th>价格/周期</th>
              <th>适用场景</th>
          </tr>
      </thead>
      <tbody>
          <tr>
              <td>📦 限定小包</td>
              <td>30GB</td>
              <td>¥99 / 年</td>
              <td>轻度查资料，极高性价比</td>
          </tr>
          <tr>
              <td>⭐ 星 (最受欢迎)</td>
              <td>100GB</td>
              <td>¥28 / 月</td>
              <td>日常刷剧与办公主力</td>
          </tr>
          <tr>
              <td>🪐 行星</td>
              <td>220GB</td>
              <td>¥56 / 月</td>
              <td>家庭多设备共享首选</td>
          </tr>
          <tr>
              <td>💎 巨量不限时</td>
              <td>520GB</td>
              <td>¥280 / 一次性</td>
              <td>轻度偶尔用，用完为止</td>
          </tr>
      </tbody>
  </table>

  <div class="tip" style="margin-top: 16px;">
      <strong>🎁 专属福利与官网直达：</strong> 
      现在注册并使用开业专属优惠码 <strong style="color: #e74c3c;">HY888</strong>，可享受全场 <strong>85折</strong> 特惠！<br><br>
      👉 <a href="https://VIP1.huanyuyunbest.com/#/register?code=CPBmzXgk" target="_blank" rel="noopener noreferrer" style="color: #c0392b; font-weight: bold; text-decoration: underline;">点击前往寰宇云官网注册</a>
  </div>
`;

db.serialize(() => {
    // Also update the subtitle and score just in case.
    const title = '寰宇云机场深度评测2026：BGP三网优化+满血IEPL，晚高峰不降速';
    const subtitle = '全面升级三网智能路由，不限设备数量，原生IP流媒体完美解锁。';
    
    db.run("UPDATE articles SET title = ?, subtitle = ?, content = ? WHERE slug = 'huanyuyun-upgrade-2026'", [title, subtitle, newContent], (err) => {
        if (err) console.error(err);
        else console.log('Successfully updated HuanYuYun article based on reference site.');
    });
});
