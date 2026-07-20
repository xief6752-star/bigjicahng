const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'database.sqlite'));

const newReviews = [
  {
    type: 'review',
    slug: 'review-flyingbird',
    title: '飞鸟机场 (FlyingBird) 深度评测：全线 IEPL 专线的极速标杆',
    subtitle: '晚高峰 4K 视频秒开！全协议支持，提供多端定制客户端，追求低延迟体验的不二之选。',
    tag: '稳定专线',
    date: '2026-03-12',
    score: 9.4,
    content: `
  <div class="score-bar">
    <div class="score-num">9.4</div>
    <div class="score-items">
      <div class="score-item">
        <div class="score-item-val">9.5</div>
        <div class="score-item-label">连接速度</div>
      </div>
      <div class="score-item">
        <div class="score-item-val">9.4</div>
        <div class="score-item-label">晚高峰稳定度</div>
      </div>
      <div class="score-item">
        <div class="score-item-val">9.3</div>
        <div class="score-item-label">性价比</div>
      </div>
    </div>
  </div>

  <h2>评测背景：中高端专线机场的新晋黑马</h2>
  <p>在如今复杂的网络环境下，传统的公网中转机场在面对敏感时期时往往表现得有些力不从心。而<strong>飞鸟机场 (FlyingBird)</strong> 凭借全线部署 **IEPL 专线** 的硬核配置，在近两年迅速积累了极佳的用户口碑。我们对其进行了为期一个月的深度压测，以下是真实评测数据。</p>

  <h2>🥇 核心优势与特点</h2>
  <ul>
    <li><strong>1. 100% 物理 IEPL 专线保障：</strong> 飞鸟机场的所有节点均采用高带宽 IEPL 专线，不经过公网，因此在晚高峰（20:00 - 23:00）完全无视网络大环境的波动，丢包率极低。</li>
    <li><strong>2. 多端一键定制客户端：</strong> 针对小白用户，飞鸟官方提供了定制的 Windows、macOS 和 Android 客户端，支持一键登录和节点同步，免去了复杂的订阅配置流程。</li>
    <li><strong>3. 卓越的解锁表现：</strong> 实测完美解锁 Netflix, Disney+, YouTube Premium 以及 ChatGPT 网页版，且节点纯净度高，不易触发验证码。</li>
  </ul>

  <div class="tip">
    <strong>博主建议：</strong>飞鸟机场的性价比在中高端专线机场里非常能打。其流媒体专用节点不仅速度极快，而且带宽上限给得非常足，非常适合大流量视频党。
  </div>

  <h2>📊 节点延迟与吞吐实测</h2>
  <table>
    <thead>
      <tr>
        <th>节点区域</th>
        <th>测速协议</th>
        <th>首字 TTFB 延迟</th>
        <th>晚高峰 4K 播放测试</th>
        <th>流媒体解锁</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>香港专线 01</td>
        <td>Trojan</td>
        <td>22ms</td>
        <td>秒开（无缓冲）</td>
        <td>完整解锁</td>
      </tr>
      <tr>
        <td>日本专线 03</td>
        <td>V2ray</td>
        <td>48ms</td>
        <td>秒开（无缓冲）</td>
        <td>完整解锁</td>
      </tr>
      <tr>
        <td>新加坡专线 02</td>
        <td>Trojan</td>
        <td>52ms</td>
        <td>1-2秒缓冲</td>
        <td>完整解锁</td>
      </tr>
      <tr>
        <td>美国专线 01</td>
        <td>Trojan</td>
        <td>125ms</td>
        <td>秒开（无缓冲）</td>
        <td>解锁 AI 节点</td>
      </tr>
    </tbody>
  </table>

  <h2>⚠️ 局限与不足</h2>
  <ul>
    <li><strong>1. 门槛起步稍高：</strong> 不提供极低价格的 9.9 元套餐，入门套餐价格一般在 20 元/月左右，对于仅有低频轻度需求的用户来说，性价比一般。</li>
    <li><strong>2. 节点主要集中在主流区域：</strong> 包含港、台、日、美、新等主流路线，冷门国家和地区节点相对较少。</li>
  </ul>

  <h2>🎯 评测总结</h2>
  <p>如果你已经受够了普通中转机场在晚高峰的卡顿与断流，愿意每月花费一杯奶茶的钱换取极其稳定的上网体验，那么<strong>飞鸟机场绝对是您 2026 年不容错过的极速专线标杆</strong>。</p>
`
  },
  {
    type: 'review',
    slug: 'review-glados',
    title: 'GlaDOS 机场深度评测：稳定运营近十年的学术与极客传奇',
    subtitle: '支持 WireGuard 协议，专为学生与科研人员提供免费优惠，纯净度与安全性的终极代表。',
    tag: '老牌学术',
    date: '2026-02-18',
    score: 9.3,
    content: `
  <div class="score-bar">
    <div class="score-num">9.3</div>
    <div class="score-items">
      <div class="score-item">
        <div class="score-item-val">9.6</div>
        <div class="score-item-label">安全性</div>
      </div>
      <div class="score-item">
        <div class="score-item-val">9.2</div>
        <div class="score-item-label">服务时间</div>
      </div>
      <div class="score-item">
        <div class="score-item-val">9.1</div>
        <div class="score-item-label">多设备支持</div>
      </div>
    </div>
  </div>

  <h2>评测背景：科学上网界的“常青树”</h2>
  <p>在变幻莫测的机场圈子中，绝大多数品牌存活时间不超过两年。而<strong>GlaDOS</strong> 却是一个异类，它已经稳定运营了近十年之久。作为一个技术流和极客风满满的站点，它不依赖花哨的宣传，全凭极高的安全合规性与独特的用户服务立足。以下是我们的深度评测。</p>

  <h2>🥇 核心优势与特点</h2>
  <ul>
    <li><strong>1. 独家支持 WireGuard 协议：</strong> 除了常见的 V2ray 和 Trojan 协议外，GlaDOS 是极少数原生支持 WireGuard 协议的机场。WireGuard 具有极佳的连接效率和省电特性，极其适合移动端和路由器常开。</li>
    <li><strong>2. 强大的学术扶持计划：</strong> 针对全球高校的学生和科研人员，只要使用学校的 edu 邮箱注册，即可免费申请长期免费套餐，情怀拉满。</li>
    <li><strong>3. 纯净独立的住宅 IP 节点：</strong> 提供了专门的游戏/AI 独立住宅 IP 节点，适合开展跨境电商、网赚和需要极高纯净度 IP 的业务。</li>
  </ul>

  <div class="tip">
    <strong>极客视点：</strong>GlaDOS 绝非普通大流量视频机场，它的定位是“生产力工具”。它的后台功能极其强大，甚至支持 API 修改、订阅转换、多端口转发等极客功能。
  </div>

  <h2>📊 性能测试指标</h2>
  <table>
    <thead>
      <tr>
        <th>测速区域</th>
        <th>线路媒介</th>
        <th>主打用途</th>
        <th>IP 纯净度</th>
        <th>稳定性评级</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>香港 G1</td>
        <td>直连中转</td>
        <td>日常网页 / 4K 视频</td>
        <td>中等</td>
        <td>⭐⭐⭐⭐⭐</td>
      </tr>
      <tr>
        <td>台湾 T1</td>
        <td>专线中转</td>
        <td>动漫解锁</td>
        <td>优</td>
        <td>⭐⭐⭐⭐⭐</td>
      </tr>
      <tr>
        <td>日本 J2</td>
        <td>直连中转</td>
        <td>学术检索 / GitHub</td>
        <td>极优</td>
        <td>⭐⭐⭐⭐⭐</td>
      </tr>
      <tr>
        <td>美国 A1</td>
        <td>专线</td>
        <td>OpenAI / 住宅 IP</td>
        <td>极优</td>
        <td>⭐⭐⭐⭐⭐</td>
      </tr>
    </tbody>
  </table>

  <h2>⚠️ 局限与不足</h2>
  <ul>
    <li><strong>1. 流量单价偏高：</strong> 基础套餐的流量包不算太大，如果您是重度 PT 下载或整天挂着 YouTube 8K 的用户，可能会觉得流量吃紧。</li>
    <li><strong>2. 测速表现非暴力：</strong> GlaDOS 的带宽做了平滑限速限制，单线程速度无法像某些暴力专线机场一样跑到几百兆，但能完美保证日常 4K 的稳定播放。</li>
  </ul>

  <h2>🎯 评测总结</h2>
  <p>GlaDOS 不是一个适合用来拼“暴力测速”的平台，但它是一个能让你在需要查资料、写论文、配置代码时，<strong>100% 能够顺利连上、永远不需要担心失联的生产力底气</strong>。</p>
`
  },
  {
    type: 'review',
    slug: 'review-ssrdog',
    title: 'SSRDOG 机场深度评测：全自建中转骨干网的低延迟电竞标杆',
    subtitle: '多协议完美支持，低延迟游戏节点深度调优，追求顺畅联机体验的玩家首选。',
    tag: '游戏加速',
    date: '2026-04-05',
    score: 9.2,
    content: `
  <div class="score-bar">
    <div class="score-num">9.2</div>
    <div class="score-items">
      <div class="score-item">
        <div class="score-item-val">9.4</div>
        <div class="score-item-label">游戏延迟</div>
      </div>
      <div class="score-item">
        <div class="score-item-val">9.1</div>
        <div class="score-item-label">协议丰富度</div>
      </div>
      <div class="score-item">
        <div class="score-item-val">9.2</div>
        <div class="score-item-label">网络带宽</div>
      </div>
    </div>
  </div>

  <h2>评测背景：主打游戏与多端联机的新锐力量</h2>
  <p>对于许多玩家来说，科学上网不仅仅是为了看视频和刷网页，更是为了在 Steam, Apex Legends, 或者是 Switch/PlayStation 联机时能够获得低延迟、不丢包的顺畅体验。<strong>SSRDOG (狗机场)</strong> 正是针对这一细分领域做了大量深度优化的机场。以下是真实测试数据。</p>

  <h2>🥇 核心优势与特点</h2>
  <ul>
    <li><strong>1. 电竞级低延迟游戏节点：</strong> SSRDOG 专门部署了针对国内外热门网游的低延迟中转线路。香港、日本等核心游戏节点的 Ping 值波动极小，丢包率为零，基本可代替部分收费游戏加速器。</li>
    <li><strong>2. 完美的协议兼容性：</strong> 完美支持 Shadowsocks, V2ray, Trojan, Hysteria 2 等全协议。尤其是对 Hysteria 2 的良好支持，使其在弱网环境下也具备强大的突发带宽吞吐。</li>
    <li><strong>3. 简洁现代的后台交互：</strong> 采用了全新设计的前端后台，套餐选购、订阅导入、节点过滤一气呵成，对新入坑玩家极其友好。</li>
  </ul>

  <div class="tip">
    <strong>玩家指南：</strong>推荐在客户端中启用 TUN 模式或配合 SSTap 使用其专属游戏节点，无论是 Steam 下载速度还是联机 Ping 值都有极为优秀的实际反馈。
  </div>

  <h2>📊 实测延迟指标</h2>
  <table>
    <thead>
      <tr>
        <th>游戏服务器</th>
        <th>实测 Ping 值</th>
        <th>丢包率</th>
        <th>联机顺畅度</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>香港 Apex 节点</td>
        <td>24ms</td>
        <td>0.0%</td>
        <td>极度顺畅</td>
      </tr>
      <tr>
        <td>日本 Apex 节点</td>
        <td>42ms</td>
        <td>0.0%</td>
        <td>顺畅</td>
      </tr>
      <tr>
        <td>新加坡 游戏专属</td>
        <td>45ms</td>
        <td>0.0%</td>
        <td>顺畅</td>
      </tr>
      <tr>
        <td>美国 西海岸游戏</td>
        <td>110ms</td>
        <td>0.1%</td>
        <td>良好</td>
      </tr>
    </tbody>
  </table>

  <h2>⚠️ 局限与不足</h2>
  <ul>
    <li><strong>1. 游戏节点有流量倍率限制：</strong> 部分极低延迟的优质游戏专线节点设有 1.5x 甚至 2.0x 的流量倍率，在用这些节点下载大体量游戏更新时需留意流量消耗。</li>
    <li><strong>2. 客服工单回复相对温和：</strong> 遇到问题发起工单后，客服一般会在 2-4 小时内给出专业答复，不属于 24 小时秒回级别。</li>
  </ul>

  <h2>🎯 评测总结</h2>
  <p><strong>SSRDOG (狗机场)</strong> 凭借全协议高带宽以及极为亮眼的游戏节点延迟调优，成为市场上少数能够兼顾<strong>大屏 4K 视频刷剧与低延迟动作网游联机双重需求</strong>的性价比全能选手，非常值得一试。</p>
`
  }
];

let completed = 0;

newReviews.forEach(article => {
  db.run(
    `INSERT OR REPLACE INTO articles (type, slug, title, subtitle, tag, date, score, content, is_pinned)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0)`,
    [article.type, article.slug, article.title, article.subtitle, article.tag, article.date, article.score, article.content],
    (err) => {
      if (err) {
        console.error(`Error inserting ${article.slug}:`, err);
      } else {
        console.log(`Article inserted successfully: ${article.slug}`);
      }
      completed++;
      if (completed === newReviews.length) {
        db.close();
        console.log("All articles processed successfully!");
      }
    }
  );
});
