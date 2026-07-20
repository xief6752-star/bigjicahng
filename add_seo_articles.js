const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'database.sqlite'));

const newArticles = [
    {
        type: 'knowledge',
        slug: '2026-router-guide-seo',
        title: '2026年翻墙路由器选购指南：软路由与硬路由深度对比',
        subtitle: '想实现全家设备无感科学上网？本文教你如何选择最适合你的翻墙路由器。',
        tag: '硬件科普',
        date: '2026-06-17',
        score: 0,
        content: `
            <h2>为什么你需要一台翻墙路由器？</h2>
            <p>在 2026 年，家里的智能设备越来越多（如 Apple TV、智能电视、游戏主机等），为每台设备单独安装和配置翻墙客户端变得非常繁琐。这时候，一台配置了透明代理的“翻墙路由器”就能实现一次配置，全家设备“无感”科学上网。</p>
            
            <h2>硬路由 vs 软路由：该怎么选？</h2>
            <h3>硬路由（刷 OpenWrt/梅林）</h3>
            <p><strong>优点</strong>：成本低，一体化，省电。适合对网络要求不极端的普通家庭。<br>
            <strong>缺点</strong>：CPU 性能有限。运行复杂的代理协议（尤其是加密解密运算量大的协议）时，可能无法跑满千兆宽带，容易出现瓶颈。</p>
            
            <h3>软路由（X86 架构微型电脑）</h3>
            <p><strong>优点</strong>：性能极其强大。搭载 Intel 处理器，配合 OpenClash 或 PassWall 等插件，轻松跑满千兆甚至万兆机场节点，毫无压力。同时还能兼顾 NAS、去广告等功能。<br>
            <strong>缺点</strong>：需要一定的折腾门槛，通常需要作为旁路由或者搭配硬路由作为 AP 使用，初期配置较为复杂。</p>
            
            <div class="tip"><strong>SEO 白帽建议：</strong>如果您是新手且宽带在 500M 以下，买一台支持刷机的硬路由即可；如果您是追求极致性能的千兆/2000M宽带用户，强烈建议一步到位上 X86 软路由。</div>
        `,
        is_pinned: 0
    },
    {
        type: 'knowledge',
        slug: '2026-proxy-protocols-seo',
        title: 'SSR、V2Ray、Trojan 已经落伍了？2026 年最新主流代理协议解析',
        subtitle: '防火墙技术在不断升级，我们的代理协议也在迭代。了解最新的防封锁技术。',
        tag: '技术科普',
        date: '2026-06-16',
        score: 0,
        content: `
            <h2>老一代协议的黄昏</h2>
            <p>曾几何时，ShadowsocksR (SSR)、原版 V2Ray (VMess) 以及早期的 Trojan 支撑起了庞大的科学上网生态。但到了 2026 年，随着 GFW 对 TLS 流量特征识别（如 TLS in TLS 探测）的日益精准，这些老协议在特殊时期极易遭到封锁或 QoS 限速。</p>
            
            <h2>2026 年的主流协议</h2>
            <h3>1. VLESS + Reality / Vision</h3>
            <p>作为 Xray-core 的核心协议，VLESS 配合 Reality 摒弃了传统的域名伪装，直接利用目标网站（如微软、苹果的子域名）的公钥进行真实 TLS 握手伪装，极大降低了被主动探测的风险，是目前自建节点最推荐的方案之一。</p>
            
            <h3>2. Hysteria 2</h3>
            <p>这是一款基于 QUIC（UDP）的暴力加速协议。它最大的特点是“抢带宽”能力极强。在晚高峰国际链路严重丢包的情况下，Hysteria 2 依然能提供极其强悍的下行速度。不过部分地区运营商会对 UDP 流量进行限速（QoS），因此需视地区网络环境而定。</p>

            <h3>3. 机场的主力：专线 + SS</h3>
            <p>值得注意的是，对于大型优质机场而言，他们通常使用国内 BGP 入口和 IEPL/IPLC 物理专线跨境。既然流量在国内已经进入了专线，就不再需要复杂的加密协议来欺骗防火墙了。因此，这类机场反而会使用最轻量级、加解密速度最快的原版 Shadowsocks (SS) 协议，以最大化降低设备的性能消耗。</p>
            
            <div class="tip"><strong>核心结论：</strong>如果你是自建节点，请务必使用 VLESS-Reality 或 Hysteria 2；如果你购买的是专线机场，协议本身已经不再重要，线路质量才是核心。</div>
        `,
        is_pinned: 0
    },
    {
        type: 'tutorial',
        slug: 'how-to-read-speedtest-seo',
        title: '如何通过测速图判断机场的真实质量？教你避开虚假宣传',
        subtitle: '测速图能造假吗？当然能！教你几招看懂机场测速图的猫腻。',
        tag: '防骗教程',
        date: '2026-06-15',
        score: 0,
        content: `
            <h2>满屏的绿色就代表好机场吗？</h2>
            <p>很多新手在挑选机场时，最喜欢看 Telegram 频道里的“晚高峰测速图”。如果看到满屏的绿色和几百兆的速度，就会觉得这是一家神仙机场。然而，在 2026 年的今天，测速图造假或“美化”已经是行业的潜规则了。</p>
            
            <h2>看测速图的三个核心细节</h2>
            <h3>1. 看测试时间和环境</h3>
            <p>测速只有在<strong>晚高峰（20:00 - 23:00）</strong>进行才有参考价值。半夜 3 点的测速图，哪怕是最便宜的垃圾机场也能跑满千兆。此外，注意看测速节点的运营商，移动、联通、电信的路由差距极大，不能一概而论。</p>
            
            <h3>2. 看 UDP 表现</h3>
            <p>如果你玩外服游戏或需要语音通话，请务必关注测速图上的 UDP 颜色。很多便宜的 BGP 中转机场虽然 TCP 下载速度快，但 UDP 掉包极其严重，这种机场是没法用来打游戏的。</p>
            
            <h3>3. 警惕“单线程”与“多线程”的区别</h3>
            <p>大部分测速脚本默认使用的是多线程并发测速。这就像是 10 个人同时帮你搬砖，速度当然快。但实际上，我们日常看网页、刷推特大多是单线程连接。优秀的机场，其单线程速度也不应该太差。</p>
            
            <div class="lyric-block">
                「其实你并没有你想象中那么好，测速图也是。」
                <cite>—— 逼哥教你防忽悠</cite>
            </div>
            
            <div class="tip"><strong>最终建议：</strong>测速图只能作为参考，不能作为唯一标准。最好的测试方法，永远是买一个最低配的月付套餐，在你自己家里的网络环境下，亲自在晚高峰看几天 YouTube 4K 视频。</div>
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
        console.log('Inserted SEO optimized articles successfully.');
    }
});
