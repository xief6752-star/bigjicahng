const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'database.sqlite'));

const newContent = `
  <div class="lyric-block">
    「如果有一件事情是重要的，那就是你必须知道自己在哪里，你要去哪里。」
    <cite>—— 李志《如果有一件事情是重要的》</cite>
  </div>

  <h2>怎么选机场？先看这几个指标</h2>
  <p>很多人选机场只看价格，这是最容易踩坑的方式。以下是我认为真正重要的几个维度：</p>

  <table>
    <thead><tr><th>指标</th><th>说明</th><th>重要程度</th></tr></thead>
    <tbody>
      <tr><td>线路类型</td><td>IEPL/IPLC 专线 &gt; BGP 中转 &gt; 普通中转</td><td>⭐⭐⭐⭐⭐</td></tr>
      <tr><td>晚高峰稳定性</td><td>晚 8–11 点实测是否掉速/断流</td><td>⭐⭐⭐⭐⭐</td></tr>
      <tr><td>运营时长</td><td>跑路风险与运营年限成反比</td><td>⭐⭐⭐⭐</td></tr>
      <tr><td>套餐灵活度</td><td>是否支持月付、流量是否按月重置</td><td>⭐⭐⭐</td></tr>
      <tr><td>客服响应</td><td>节点出问题的修复速度</td><td>⭐⭐⭐</td></tr>
    </tbody>
  </table>

  <div class="tip">
    <strong>建议策略：</strong>准备一主一备两个机场。主力选 IEPL/IPLC 专线，备用选价格低但能跑通的，
    关键时刻互补。不要把所有鸡蛋放在一个篮子里。
  </div>

  <h2>🥇 强烈推荐（综合评分 8.5 以上）</h2>
  <p class="tier-label" style="font-family: 'IBM Plex Mono', monospace; font-size: 13px; color: #888; margin-bottom: 16px;">Top Tier · 长期主力可用</p>
  <table>
    <thead><tr><th>机场名称</th><th>标签</th><th>最低套餐</th><th>延迟/速度</th><th>评分</th><th>简评</th></tr></thead>
    <tbody>
      <tr><td><strong>WgetCloud</strong></td><td>IEPL 专线, 老牌</td><td>¥58/月</td><td>60–100ms</td><td><strong>9.1</strong></td><td>运营时间长、口碑稳定，IEPL 国内专线接入，晚高峰实测 4K YouTube 无压力。适合对稳定性要求高的主力用户。</td></tr>
      <tr><td><strong>瞬云</strong></td><td>IPLC 专线, 性价比</td><td>¥25/月</td><td>80–120ms</td><td><strong>8.9</strong></td><td>近期测评的新亮点。IPLC 专线质量扎实，香港、新加坡、日本节点实测表现优秀，三个月无断流记录。适合预算有限不想凑合的用户。</td></tr>
      <tr><td><strong>ByWave</strong></td><td>IPLC 专线, 低调老牌</td><td>¥30/月</td><td>90–130ms</td><td><strong>8.7</strong></td><td>知名度低但稳定运营超三年。IPLC 专线，晚高峰不掉速，套餐月付年付都有。适合想找个安静用着的备选主力。</td></tr>
    </tbody>
  </table>

  <h2>🥈 值得考虑（综合评分 8.0–8.5）</h2>
  <p class="tier-label" style="font-family: 'IBM Plex Mono', monospace; font-size: 13px; color: #888; margin-bottom: 16px;">Second Tier · 特定场景推荐</p>
  <table>
    <thead><tr><th>机场名称</th><th>标签</th><th>最低/折算套餐</th><th>延迟/速度</th><th>评分</th><th>简评</th></tr></thead>
    <tbody>
      <tr><td><strong>寰宇云</strong></td><td>BGP 中转, 多地区</td><td>~¥18/月</td><td>100–160ms</td><td><strong>8.4</strong></td><td>节点覆盖超 20 个地区，解锁不同地区流媒体内容的首选。流量包大，性价比突出。适合流媒体解锁需求多样的用户。</td></tr>
      <tr><td><strong>RixCloud</strong></td><td>BGP 多线, 速度快</td><td>¥20/月</td><td>300Mbps+</td><td><strong>8.3</strong></td><td>下载速度是亮点，高峰期实测跑满 300Mbps。建议当备用而非主力。适合高带宽需求、不在意偶发风险的用户。</td></tr>
    </tbody>
  </table>

  <h2>❌ 不推荐</h2>
  <p>不点名具体机场，但以下类型坚决不推荐：</p>
  <ul style="margin: 12px 0 16px 20px; color: #555; font-size: 14px; line-height: 2;">
    <li>月付低于 ¥10、流量超过 500G 的——天下没有免费午餐</li>
    <li>无法找到任何运营信息、无客服渠道的</li>
    <li>要求预付年费才给优惠的新成立机场</li>
    <li>Telegram 群里狂发广告、返利比例离谱的</li>
  </ul>

  <div class="lyric-block">
    「在这颗星球所有的夜晚，有些事情注定要失去，但你还是要出发。」
    <cite>—— 李志《在这颗星球所有的夜晚》</cite>
  </div>

  <h2>软件客户端怎么选</h2>
  <table>
    <thead><tr><th>系统</th><th>推荐客户端</th><th>备注</th></tr></thead>
    <tbody>
      <tr><td>Windows</td><td>Clash for Windows / v2rayN</td><td>CFW 功能全，v2rayN 轻量备用</td></tr>
      <tr><td>macOS</td><td>ClashX Pro</td><td>菜单栏常驻，一键切换模式</td></tr>
      <tr><td>iOS</td><td>Shadowrocket</td><td>¥18 买断，小火箭最省心</td></tr>
      <tr><td>iOS 进阶</td><td>Quantumult X</td><td>分流脚本更强，适合折腾党</td></tr>
      <tr><td>Android</td><td>Clash for Android / sing-box</td><td>新设备建议 sing-box</td></tr>
      <tr><td>路由器</td><td>OpenWrt + Mihomo</td><td>全家透明代理，配置成本高</td></tr>
    </tbody>
  </table>

  <div class="tip">
    详细安装和配置教程见 <a href="index.html#tutorials" style="text-decoration: underline; text-underline-offset: 3px;">教程页面</a>，每个客户端都有图文步骤。
  </div>

  <h2>最后</h2>
  <p>机场这个东西，没有完美的选择，只有适合当下的选择。价格、速度、稳定性三者很难同时满足，只能根据自己的优先级取舍。</p>
  <p>这份榜单每月更新一次，有新的测评结果会及时补充，跑路的会标注并移出推荐列表。</p>

  <div class="lyric-block">
    「明天会好的。」
    <cite>—— 李志</cite>
  </div>
`;

db.run("UPDATE articles SET content = ? WHERE slug = 'post-2026-best'", [newContent], function(err) {
  if (err) console.error(err);
  else console.log("Updated successfully!");
  
  // also run the build endpoint logic roughly or let the user do it
});
