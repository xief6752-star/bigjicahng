const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'database.sqlite'));

const newArticles = [
    {
        type: 'knowledge',
        slug: '2026-gaming-proxy-guide',
        title: '玩外服游戏延迟太高？2026年游戏加速器与“游戏专线机场”选购全攻略',
        subtitle: '打 Valorant 疯狂丢包？看视频不卡的节点，为什么一打游戏就原形毕露？',
        tag: '游戏科普',
        date: '2026-06-25',
        score: 0,
        content: `
            <h2>看 4K 视频丝滑流畅，一打游戏直接掉线？</h2>
            <p>兄弟们，这绝对是很多人踩过的一个超级大坑：你花大价钱买了一个看 YouTube 4K 视频连滚条都不带转圈的顶级节点，结果满心欢喜地打开《无畏契约》（Valorant）港服或者《Apex 英雄》，进去一看延迟 150ms，还疯狂瞬移丢包。这是为什么？</p>
            <p>原因很简单：<strong>视频走的是 TCP 协议，而大部分实时对战游戏走的是 UDP 协议。</strong></p>
            <p>很多只做流媒体解锁的机场，为了节省成本，其底层架构对 UDP 转发支持极差，甚至在晚高峰会主动丢弃 UDP 数据包来保证网页和视频的 TCP 带宽。你用这种节点打游戏，不坐牢才怪！</p>
            
            <h2>传统游戏加速器 vs 游戏专线机场</h2>
            <p>市面上常规的 UU、雷神等游戏加速器，好处是傻瓜式操作，全端支持，专门针对游戏路由做了优化，几乎不丢包。缺点是什么？贵！而且只能加速游戏，你看不了 Netflix，也用不了 ChatGPT。</p>
            <p>而真正的<strong>“游戏专线机场”</strong>，采用的是满血的 IPLC 或 IEPL 物理专线，并且在服务端完美放行并优化了 UDP 转发。比如你连香港的 IPLC 节点打港服游戏，延迟基本能稳定在 15-30ms（看你本地位置），而且这套网络不仅能打游戏，还能全天候科学上网。</p>
            
            <h2>逼哥的选购建议</h2>
            <p>如果你只是纯粹的端游玩家，老老实实买传统游戏加速器。但如果你既要看油管刷推特，又要跟外国妹子在 Discord 语音，还要打外服游戏，那么请一定在购买机场前，向老板确认两个核心问题：</p>
            <ol>
                <li>你们的线路是真 IPLC/IEPL 专线吗？</li>
                <li>你们的服务端支持并优化了 UDP 转发吗？</li>
            </ol>
            <p>只要满足这两点，配合 Clash 的游戏分流规则，你就能获得一份钱买两份服务的极致体验。</p>
        `,
        is_pinned: 0
    },
    {
        type: 'tutorial',
        slug: 'save-battery-clash-shadowrocket',
        title: '手机挂着梯子耗电太快？教你如何正确配置 Clash/Shadowrocket 的分流规则省电',
        subtitle: '别让你的手机电量被垃圾规则榨干。老油条教你如何优化分流，实现无感省电。',
        tag: '实用教程',
        date: '2026-06-26',
        score: 0,
        content: `
            <h2>为什么挂着代理，手机电量像尿崩一样？</h2>
            <p>很多小白用户刚接触 Shadowrocket（小火箭）或者 Clash，为了省事，直接开启“全局路由（Global）”或者用了一套来历不明的远古规则。结果发现，原本能用一整天的 iPhone，现在半天就提示电量不足了。手机后背还经常莫名其妙发烫。</p>
            <p>这是因为你的规则没写好！如果你用全局模式，你打开微信、刷抖音、看淘宝的每一兆国内流量，都会先被加密，然后绕道海外服务器，再兜个大圈子绕回来。这不仅让你用国内 App 卡顿，还会让手机的 CPU 和基带芯片一直处于高负荷的加密解密运算中，不耗电才见鬼了。</p>

            <h2>核心优化逻辑：精准的 GeoIP 与 GeoSite 拦截</h2>
            <p>想要省电，最核心的原则就是：<strong>国内直连（Direct），国外走代理（Proxy），广告直接拦截（Reject）。</strong></p>
            <p>在 2026 年，最成熟的做法是使用基于 <code>GEOSITE</code> 和 <code>GEOIP</code> 的懒人规则包（比如 Github 著名的 blackmatrix7 规则）。</p>
            <ul>
                <li><strong>广告拦截（Reject）</strong>：将各大 App 的开屏广告域名直接在本地屏蔽，不仅省电还省流量。</li>
                <li><strong>国内应用（Direct）</strong>：通过 <code>GEOSITE,CN</code> 规则，让微信、支付宝、B站等应用直接走本地网络，完全不经过加密核心。</li>
                <li><strong>精准匹配（Proxy）</strong>：只有像 Telegram、Twitter、YouTube 这类特定的海外域名，才会激活代理隧道。</li>
            </ul>

            <h2>具体操作步骤</h2>
            <p>以 Shadowrocket 为例：不要自己一条条加规则。去“配置”页面，点击右上角的“+”号，输入稳定的线上规则文件 URL（建议搜一下最新的“小火箭精简版去广告规则”）。下载并点击使用，把路由模式设置为<strong>“配置（Config）”</strong>。千万别选“代理（Proxy）”！</p>
            <div class="tip"><strong>实测效果：</strong>配置好精准的分流规则后，后台常驻 24 小时的耗电量通常能控制在 3%-5% 以内，你完全可以把它当成透明的，实现真正的“全天候无感翻墙”。</div>
        `,
        is_pinned: 0
    },
    {
        type: 'knowledge',
        slug: 'ecommerce-tiktok-proxy-2026',
        title: '企业级跨境电商与 TikTok 专线怎么选？别再用“个人机场”做外贸了！',
        subtitle: '从封号到限流，为什么你的 TikTok 账号做不起来？IP 纯净度决定了你外贸事业的生死。',
        tag: '跨境电商',
        date: '2026-06-27',
        score: 0,
        content: `
            <h2>还在用 20 块钱一个月的机场做 TikTok 带货？</h2>
            <p>经常有做外贸和跨境电商的朋友跑来问我：“逼哥，我新注册的 TikTok 账号，发了十几个视频，播放量全是 0（也就是常说的零播），是不是我视频质量不行？”</p>
            <p>我一问他用的什么网络，好家伙，用的是市面上那种主打“便宜大碗”的个人娱乐机场。朋友，TikTok 和 Amazon 的风控系统比你想象的聪明一万倍。你用的这个机场节点，IP 库里早就被标记为“数据中心代理（Hosting）”甚至是“高危垃圾 IP”了。</p>
            <p>平台一看，你一个自称在美国的真实用户，用的却是阿里云机房的 IP，而且这个 IP 上还挂着另外几十个在发擦边球视频的黑号。不给你限流封号，封谁？</p>

            <h2>个人机场与“跨境专线”的本质区别</h2>
            <p>个人看视频用的机场，追求的是<strong>“大带宽”</strong>和<strong>“低价格”</strong>。他们会大量采购便宜的机房 IP，只要 YouTube 能跑满 4K 就算合格，至于 IP 脏不脏，根本无所谓。</p>
            <p>而做跨境电商（比如 Amazon 店铺防关联、TikTok 矩阵养号、Facebook 广告投放），最核心的诉求只有一个：<strong>“IP 绝对纯净且独享”</strong>。你需要的是 <strong>静态双 ISP 住宅代理（Static Residential IP）</strong>。</p>
            
            <h2>跨境网关的正确搭建姿势</h2>
            <p>在 2026 年，专业的跨境电商团队早就抛弃了传统的梯子软件。最稳妥的方案是：</p>
            <ol>
                <li><strong>国内入口</strong>：购买一条国内的 BGP 中转服务器或者直接拉一条合规的物理专线。</li>
                <li><strong>海外落地</strong>：高价租用真实的美国/英国当地家庭宽带 IP（比如 Comcast 的固定 IP），确保这个 IP 只有你一个人在使用。</li>
                <li><strong>硬件隔离</strong>：直接在公司的路由器底层做策略路由（软路由旁路网关），或者使用紫鸟浏览器等防关联工具，员工连上 WiFi 就是完全真实的海外家庭网络环境。</li>
            </ol>
            
            <div class="tip"><strong>最终劝告：</strong>做生意和个人娱乐是两码事。如果你是真金白银在做跨境电商，请一定要找专门提供“独享静态住宅 IP”的 B2B 服务商，千万别拿个人机场去赌你的店铺安全。</div>
        `,
        is_pinned: 0
    }
];

db.serialize(() => {
    const stmt = db.prepare(`INSERT INTO articles (type, slug, title, subtitle, tag, date, score, content, is_pinned) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`);
    for (const article of newArticles) {
        stmt.run([article.type, article.slug, article.title, article.subtitle, article.tag, article.date, article.score, article.content, article.is_pinned]);
    }
    stmt.finalize();
});

db.close((err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Inserted high-exposure SEO articles successfully.');
    }
});
