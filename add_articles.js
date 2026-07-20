const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'database.sqlite'));

const newArticles = [
    {
        type: 'knowledge',
        slug: '2026-h2-guide',
        title: '2026年下半年科学上网指南：如何在严密审查下求生？',
        subtitle: '随着技术的迭代，传统的翻墙方式正在失效。本文带你了解下半年的趋势。',
        tag: '行业科普',
        date: '2026-05-29',
        score: 0,
        content: `
            <h2>审查机制的再次升级</h2>
            <p>进入2026年下半年，随着AI深度包检测技术（DPI）的进一步普及，很多基于传统TLS特征的代理协议（如早期的Trojan和VLESS）遭到了严重的干扰。</p>
            <h2>什么是真正的抗封锁？</h2>
            <p>现在，单纯依赖单一协议已经不够了，多入口、隧道中转以及专线（IEPL/IPLC）几乎成为了刚需。对于普通用户来说，购买成熟的机场服务远比自己折腾VPS要省时省力且安全。</p>
            <div class="tip"><strong>建议：</strong>不要把所有鸡蛋放在一个篮子里，准备两个不同架构的机场作为主备。</div>
        `,
        is_pinned: 0
    },
    {
        type: 'tutorial',
        slug: 'shadowrocket-advanced',
        title: 'Shadowrocket 高级分流规则与自定义配置',
        subtitle: '小火箭除了扫码，还能这么玩！手把手教你配置去广告与分流。',
        tag: 'iOS',
        date: '2026-05-28',
        score: 0,
        content: `
            <h2>为什么要自定义规则？</h2>
            <p>默认的全局代理或者自带规则可能会导致国内应用加载缓慢，甚至无法使用。通过高级分流规则，我们可以实现：国内直连、国外走代理、屏蔽广告。</p>
            <h2>如何添加规则集？</h2>
            <p>在 Shadowrocket 的“配置”页面，点击右上角的“+”号，输入规则文件的URL，然后下载并使用即可。</p>
            <div class="tip"><strong>推荐规则：</strong>可以使用著名的 lhie1 或者 blackmatrix7 的懒人规则。</div>
        `,
        is_pinned: 0
    },
    {
        type: 'review',
        slug: 'runaway-airport-warning',
        title: '【避坑】某新晋“一元机场”光速跑路全纪录',
        subtitle: '便宜没好货，再次印证了这个不变的真理。',
        tag: '避坑',
        date: '2026-05-27',
        score: 2.0,
        content: `
            <h2>低价陷阱的诱惑</h2>
            <p>最近有一家打着“一元包月1000G”旗号的新机场在各大群组疯狂刷屏。很多小白贪图便宜充值了年费，结果不到半个月，官网就无法访问了。</p>
            <h2>为什么低价机场容易跑路？</h2>
            <p>优质线路的带宽成本是极其昂贵的。这种远低于成本价的定价模式，本质上就是庞氏骗局。他们靠新用户的充值来填补老用户的带宽费用，一旦资金链断裂，老板就会毫不犹豫地卷款跑路。</p>
            <div class="tip"><strong>结论：</strong>珍爱钱包，远离超低价机场。按月付！按月付！按月付！</div>
            <div class="lyric-block">
                「那些荒唐的，总会有一个荒唐的结局。」
                <cite>—— 李志</cite>
            </div>
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
        console.log('Inserted new articles successfully.');
    }
});
