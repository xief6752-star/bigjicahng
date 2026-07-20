const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'database.sqlite'));

const newArticles = [
    {
        type: 'knowledge',
        slug: '2026-crypto-payment-safety',
        title: '2026年机场支付安全指南：如何防止交易被骗？',
        subtitle: '随着微信支付宝通道越来越少，虚拟货币支付成为主流，这里有一份防骗避坑指南。',
        tag: '安全科普',
        date: '2026-05-10',
        score: 0,
        content: `
            <h2>为什么传统支付越来越少？</h2>
            <p>由于风控升级，2026年还在提供微信和支付宝直连支付的机场已经屈指可数。大部分正规大型机场都转向了 USDT 或其他加密货币支付。这虽然增加了用户的学习成本，但也大大提高了购买的匿名性。</p>
            <h2>虚拟货币支付的常见骗局</h2>
            <p>近期有很多小白在交易所购买 USDT 提币时，遭遇了剪贴板劫持或假冒收款地址的骗局。请一定记住：<strong>转账前仔细核对收款地址的前 4 位和后 4 位，不要完全依赖复制粘贴。</strong></p>
            <div class="tip"><strong>建议：</strong>如果是第一次使用加密货币购买，建议先尝试转账极小金额（如 1 USDT）作为测试，确认到账后再支付全款。</div>
        `,
        is_pinned: 0
    },
    {
        type: 'knowledge',
        slug: 'streaming-unlock-explained-2026',
        title: '流媒体解锁原理解析：为什么你的节点看不了 Netflix？',
        subtitle: '明明是香港节点，为什么 Netflix 却提示你使用了代理？一文看懂背后的DNS解锁技术。',
        tag: '原理科普',
        date: '2026-04-22',
        score: 0,
        content: `
            <h2>流媒体的封锁机制</h2>
            <p>Netflix、Disney+ 等流媒体巨头有一份详尽的机房 IP 黑名单。大部分机场的落地 IP（比如阿里云、DigitalOcean 的服务器）都在这份名单里。一旦被识别，就会被限制观看自制剧，甚至直接拒绝访问。</p>
            <h2>什么是 DNS 解锁？</h2>
            <p>为了绕过封锁，机场会在流媒体流量经过时，将其劫持并转发到一台干净的、未被封锁的家宽 IP 服务器上。这就叫 DNS 解锁。但由于这种做法成本较高，很多平价机场只有部分节点支持解锁，甚至存在多台服务器共用一个解锁 IP 的情况，导致经常掉锁。</p>
            <div class="lyric-block">
                「世界再大，大不过你我之间的墙。」
                <cite>—— 李志</cite>
            </div>
        `,
        is_pinned: 0
    },
    {
        type: 'knowledge',
        slug: 'relay-vs-iplc-2026',
        title: '中转节点 vs 专线节点：2026年的价格差还值得吗？',
        subtitle: '在这个算力与带宽齐飞的年代，公网中转和物理专线的体验差距是否对得起它们的价格差？',
        tag: '选购科普',
        date: '2026-03-15',
        score: 0,
        content: `
            <h2>2026年的公网环境</h2>
            <p>随着跨国带宽成本的上升以及审查力度的加强，普通的 BGP 中转节点在晚高峰（晚上8点到11点）的丢包率显著增加。如果你还在使用那些按年付不到 100 元的机场，大概率会在这个时段体验到“图片刷不出来”的痛苦。</p>
            <h2>专线到底贵在哪里？</h2>
            <p>IPLC（国际私有租用线路）直接通过物理光缆跨境，不经过防火长城。它的成本是以 Megabit 为单位计算的。买专线机场，买的不仅仅是速度，更重要的是一份“在任何敏感时期都不会断网”的安全感。</p>
            <div class="tip"><strong>结论：</strong>如果是轻度查资料，中转节点依然性价比最高；如果是为了流畅玩外服游戏或作为工作生产力工具，专线节点依然是唯一的选择。</div>
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
        console.log('Inserted additional knowledge articles successfully.');
    }
});
