const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'database.sqlite'));

const newArticles = [
    {
        type: 'knowledge',
        slug: 'cloudflare-warp-truth-2026',
        title: 'Cloudflare WARP 免费翻墙？别信这个谣言了',
        subtitle: '每隔一段时间就有人问：WARP 能翻墙吗？2026年我们来一次彻底的答疑。',
        tag: '工具科普',
        date: '2026-07-18',
        score: 0,
        content: `
            <h2>WARP 是什么？</h2>
            <p>Cloudflare WARP 是 Cloudflare 公司推出的一款免费 VPN 工具，基于 WireGuard 协议，主要目的是加密你的网络流量并保护隐私，而不是专门用来"翻墙"。</p>

            <h2>WARP 能翻墙吗？</h2>
            <p>答案是：<strong>在中国大陆，不能稳定翻墙。</strong></p>
            <p>WARP 的服务器 IP 段已被 GFW 大量封锁。虽然每隔一段时间会有用户反馈"某个版本可以用了"，但这种窗口期通常只有几天，很快就会再次失效。</p>
            <div class="tip"><strong>不要把 WARP 当作主力翻墙工具。</strong>它更适合用作机场的"套娃"方案（机场节点 + WARP），用来解锁 ChatGPT、Gemini 等对 IP 质量要求高的服务。</div>

            <h2>WARP 真正的用途</h2>
            <p>很多高级玩家会在机场节点的基础上套一层 WARP，原因是：</p>
            <ul>
                <li>WARP 的出口 IP 是 Cloudflare 的原生住宅/商业 IP，不在 AI 服务的黑名单里</li>
                <li>可以解决"节点能用但 ChatGPT 提示被封锁"的问题</li>
                <li>完全免费，Cloudflare 每月赠送足够的 WARP 流量</li>
            </ul>

            <h2>如何正确使用 WARP？</h2>
            <p>推荐在已经连接机场节点的基础上，在客户端设置中开启"仅对特定域名使用 WARP"，比如 <code>chat.openai.com</code>、<code>claude.ai</code>。这样既不影响速度，又能提高 AI 服务的访问稳定性。</p>

            <div class="lyric-block">「免费的，往往是最贵的。」<cite>—— 互联网俚语</cite></div>
        `,
        is_pinned: 0
    },
    {
        type: 'knowledge',
        slug: 'node-region-guide-2026',
        title: '日本、香港、新加坡、美国节点哪个更好用？2026年地区选择指南',
        subtitle: '面对眼花缭乱的节点城市，新手总是不知道该连哪个。这篇文章帮你建立选择框架。',
        tag: '选购科普',
        date: '2026-07-15',
        score: 0,
        content: `
            <h2>为什么节点地区很重要？</h2>
            <p>同样是机场，连香港节点和连美国节点，在延迟、解锁能力、速度峰值上的体验可能天差地别。了解各地区节点的特点，能帮你根据使用场景做出最优选择。</p>

            <h2>🇯🇵 日本节点</h2>
            <p><strong>延迟：</strong>40-80ms（中国大陆）<br>
            <strong>优势：</strong>地理位置近，延迟低；日本 IP 对大部分流媒体（Netflix 日区、niconico）和游戏（日服 PS4/Switch）友好；带宽充裕。<br>
            <strong>劣势：</strong>高峰期用的人多，容易拥堵；部分 ChatGPT 流量会被日本节点 IP 限速。<br>
            <strong>适合：</strong>日常上网、流媒体、日服游戏</p>

            <h2>🇭🇰 香港节点</h2>
            <p><strong>延迟：</strong>20-50ms（华南地区更低）<br>
            <strong>优势：</strong>距离最近、延迟最低；对微信、支付宝等国内服务基本无影响；网络环境相对宽松。<br>
            <strong>劣势：</strong>Netflix 香港区内容较少；部分 AI 服务识别香港 IP 为"中国区代理"会拒绝访问。<br>
            <strong>适合：</strong>追求低延迟、国内服务与翻墙并行使用</p>

            <h2>🇸🇬 新加坡节点</h2>
            <p><strong>延迟：</strong>60-120ms<br>
            <strong>优势：</strong>东南亚网络枢纽，解锁能力强；对谷歌、YouTube 极其友好；AI 服务原生解锁率高。<br>
            <strong>劣势：</strong>延迟比港日稍高；新加坡机房 IP 被 Cloudflare 标记为商业 IP。<br>
            <strong>适合：</strong>AI 工具使用（ChatGPT/Claude）、YouTube、Google 系服务</p>

            <h2>🇺🇸 美国节点</h2>
            <p><strong>延迟：</strong>150-250ms<br>
            <strong>优势：</strong>Netflix 美区片库最全；AI 服务（OpenAI、Anthropic 总部在美）访问最原生；GitHub、AWS 速度快。<br>
            <strong>劣势：</strong>延迟高，不适合游戏；出口带宽成本高，大部分机场美国节点速度有限。<br>
            <strong>适合：</strong>Netflix 美区、开发者工具、AI API 调用</p>

            <div class="tip"><strong>终极建议：</strong>日常上网用日本/香港，用 ChatGPT/Claude 切换新加坡/美国，看 Netflix 美区专门切美国节点。多备几个节点，根据场景灵活切换，才是正确用法。</div>
        `,
        is_pinned: 0
    },
    {
        type: 'knowledge',
        slug: 'mobile-client-comparison-2026',
        title: 'Shadowrocket vs Quantumult X vs Sing-box：2026年手机翻墙客户端横评',
        subtitle: '花 30 块买个 Shadowrocket 就够了，还是值得折腾 Quantumult X 或 sing-box？',
        tag: '工具科普',
        date: '2026-07-12',
        score: 0,
        content: `
            <h2>现在主流的 iOS 翻墙客户端有哪些？</h2>
            <p>目前 iOS 生态里使用最广泛的代理客户端主要有三个：<strong>Shadowrocket</strong>（小火箭）、<strong>Quantumult X</strong>（圈叉）和近年崛起的 <strong>sing-box</strong>。三者价格和定位差异显著。</p>

            <h2>🚀 Shadowrocket（小火箭）</h2>
            <p><strong>价格：</strong>$2.99（美区）<br>
            <strong>优势：</strong>价格最便宜；上手门槛极低，导入订阅链接即可使用；协议支持全面（SS/V2Ray/Trojan/VLESS）；更新频繁。<br>
            <strong>劣势：</strong>高级分流规则配置相对繁琐；脚本功能较弱；调试能力有限。<br>
            <strong>适合：</strong>新手、只需要稳定翻墙的普通用户</p>

            <h2>⭕ Quantumult X（圈叉）</h2>
            <p><strong>价格：</strong>$7.99（美区）<br>
            <strong>优势：</strong>脚本生态极其强大（自动签到、去广告、解锁会员）；流量可视化最好；分流规则灵活度极高。<br>
            <strong>劣势：</strong>配置文件语法复杂，新手上手难度高；价格较贵。<br>
            <strong>适合：</strong>有一定技术基础、追求极致个性化、需要脚本功能的进阶用户</p>

            <h2>📦 sing-box</h2>
            <p><strong>价格：</strong>免费（开源）<br>
            <strong>优势：</strong>完全开源免费；协议支持最全（包括 Hysteria2、TUIC 等最新协议）；跨平台（iOS/Android/Windows/macOS）；性能优异。<br>
            <strong>劣势：</strong>UI 较简陋；需要手动编写 JSON 配置；社区支持文档分散。<br>
            <strong>适合：</strong>技术玩家、想免费使用或追求最新协议支持的用户</p>

            <h2>Android 端怎么选？</h2>
            <p>Android 用户推荐直接使用 <strong>sing-box</strong> 或 <strong>Clash Meta（Mihomo）</strong>。两者都免费开源，协议支持全面，配合机场的 Clash 订阅链接几乎开箱即用。</p>

            <div class="tip"><strong>结论：</strong>新手买小火箭入门；想要脚本自动化能力上圈叉；追求免费和最新协议玩 sing-box。三者并不互斥，很多人手机里同时装了两三个。</div>
        `,
        is_pinned: 0
    },
    {
        type: 'knowledge',
        slug: 'residential-ip-vs-datacenter-ip-2026',
        title: '家宽 IP 和机房 IP 有什么区别？为什么解锁能力差这么多？',
        subtitle: '同样是香港节点，为什么有的能看 Netflix，有的一直提示"检测到代理"？答案藏在 IP 类型里。',
        tag: '原理科普',
        date: '2026-07-10',
        score: 0,
        content: `
            <h2>什么是机房 IP？</h2>
            <p>绝大多数机场的服务器都部署在数据中心（IDC）里，比如阿里云、Vultr、搬瓦工等 VPS 服务商提供的 IP 段。这些 IP 被大量商业用户使用，Netflix、迪士尼+等平台早就把它们全部拉入黑名单。</p>
            <p>你在 IP 查询网站上看到 "Hosting / Data Center" 标签，就是机房 IP 的标志。<strong>这类 IP 是最容易被流媒体识别和封锁的。</strong></p>

            <h2>什么是家宽 IP？</h2>
            <p>家宽 IP（Residential IP）顾名思义，是真实家庭宽带用户的 IP。这类 IP 归属于电信运营商（比如香港的 HKT、日本的 NTT），在数据库里被标注为"Residential"，是普通消费者日常上网使用的 IP 类型。</p>
            <p>Netflix、Disney+、Hulu 等流媒体平台对这类 IP 几乎不设防，因为它们无法区分"真实用户"和"使用家宽出口的翻墙用户"。</p>

            <h2>为什么家宽节点这么稀缺？</h2>
            <p>维护家宽出口成本极高。机场运营商需要在目标地区实际租用家庭宽带（有的甚至需要当地居民配合），并确保每条家宽线路不超载，否则 IP 很快就会被"用坏"（因为同一个家宽 IP 同时有几百人使用，行为特征就接近机房 IP 了）。</p>

            <h2>商业 IP 介于两者之间</h2>
            <p>还有一种 IP 类型叫商业 IP（Business IP），比如 Cloudflare 的 IP。这类 IP 不在流媒体黑名单里，但 AI 服务（比如 ChatGPT）对它的接受度因地区而异。这也是为什么"套 WARP"能改善 ChatGPT 的访问体验。</p>

            <div class="tip"><strong>选机场时要问清楚：</strong>"你的解锁节点用的是家宽 IP 还是 DNS 劫持解锁？" 家宽 IP 稳定性远高于 DNS 解锁方案。家宽 IP 是真正的原生解锁，DNS 解锁方案容易"掉锁"。</div>
        `,
        is_pinned: 0
    },
    {
        type: 'knowledge',
        slug: 'bandwidth-units-explained-2026',
        title: '机场套餐里的"100Mbps限速"到底是多快？带宽单位完全科普',
        subtitle: '买机场经常看到 100M/500M/不限速，但实际下载速度是多少？这些数字到底意味着什么？',
        tag: '基础科普',
        date: '2026-07-07',
        score: 0,
        content: `
            <h2>Mbps 和 MB/s 傻傻分不清？</h2>
            <p>很多新手在这里踩坑：机场宣传的 <strong>100Mbps</strong> 限速，在下载文件时只有 <strong>12.5MB/s</strong> 左右的速度。</p>
            <p>原因很简单：<br>
            <code>1 Byte = 8 bits</code><br>
            <code>100 Mbps ÷ 8 = 12.5 MB/s</code></p>
            <p>大写 <strong>B</strong> 是字节（Byte），小写 <strong>b</strong> 是比特（bit）。网络带宽用 bit 计量，文件大小用 Byte 计量。这个换算关系<strong>永远是除以8</strong>。</p>

            <h2>100Mbps 够用吗？</h2>
            <p>以下是常见场景的带宽需求：</p>
            <ul>
                <li>YouTube 1080p 流畅播放：约需 8-15Mbps</li>
                <li>YouTube 4K HDR 流畅播放：约需 25-50Mbps</li>
                <li>Netflix 4K：约需 25Mbps</li>
                <li>视频会议（Zoom 高清）：约需 3-5Mbps</li>
                <li>ChatGPT/网页浏览：1-5Mbps 绰绰有余</li>
            </ul>
            <p><strong>结论：100Mbps 对单人日常使用完全够用。</strong>如果你要下载大文件或多人同时使用，才需要考虑更高带宽。</p>

            <h2>"不限速"是真的不限速吗？</h2>
            <p>大部分机场宣传的"不限速"是指<strong>不设置人工速率上限</strong>，但实际速度取决于：</p>
            <ul>
                <li>服务器物理带宽上限（机场买的是多少带宽）</li>
                <li>同时在线用户数量（超售比例）</li>
                <li>你本地的运营商线路质量</li>
            </ul>

            <h2>流量和带宽是两回事</h2>
            <p>机场套餐通常有两个维度的限制：<strong>月流量</strong>（比如 100GB/月）和<strong>峰值带宽</strong>（比如 500Mbps）。流量是总用量，带宽是速度上限。一个套餐可能"不限速但限流量"，也可能"限速但流量无限"——选购前要看清楚两者的区别。</p>

            <div class="tip"><strong>实用建议：</strong>YouTube 4K 每小时约消耗 7-10GB 流量。如果你是重度视频用户，优先选流量充足的套餐，而不是追求高带宽。</div>
        `,
        is_pinned: 0
    }
];

db.serialize(() => {
    const stmt = db.prepare(`INSERT OR IGNORE INTO articles (type, slug, title, subtitle, tag, date, score, content, is_pinned) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`);
    for (const article of newArticles) {
        stmt.run([article.type, article.slug, article.title, article.subtitle, article.tag, article.date, article.score, article.content, article.is_pinned]);
        console.log('插入：' + article.title);
    }
    stmt.finalize();
    db.close(() => console.log('\n✅ 全部完成，共插入 ' + newArticles.length + ' 篇文章'));
});
