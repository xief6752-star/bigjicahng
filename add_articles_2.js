const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'database.sqlite'));

const newArticles = [
    {
        type: 'tutorial',
        slug: '2026-client-guide',
        title: '2026 最新全平台翻墙客户端选购与配置指南',
        subtitle: '从 Windows 到 iOS，从 Clash 到 sing-box，一文搞定所有平台的客户端选择。',
        tag: '全平台',
        date: '2026-06-01',
        score: 0,
        content: `
            <h2>Windows & macOS 主力选择</h2>
            <p>对于桌面端，Clash 的各种衍生版本依然占据统治地位。Windows 推荐使用 Clash for Windows 的接替者或者 v2rayN；macOS 用户如果追求极简体验，ClashX Pro 依然是最佳选择。</p>
            <h2>移动端：iOS 与 Android</h2>
            <p>iOS 上，Shadowrocket（小火箭）以绝对的性价比和易用性稳居第一，进阶用户可以选择 Quantumult X 或 Surge。而在 Android 平台上，轻量级的 sing-box 正在迅速崛起，逐渐替代老旧的 v2rayNG。</p>
            <div class="tip"><strong>建议：</strong>不要过度追求花哨的客户端，能够稳定导入订阅、支持自动更新规则即可。</div>
        `,
        is_pinned: 0
    },
    {
        type: 'knowledge',
        slug: 'airport-runaway-warning-june',
        title: '【预警】跑路风险激增：这几类机场可能撑不过这个月',
        subtitle: '6月敏感期将至，请捂好你的钱包，警惕商家的“最后疯狂”。',
        tag: '避坑',
        date: '2026-06-02',
        score: 0,
        content: `
            <h2>警惕“超大额度”充值返现</h2>
            <p>每到敏感期前夕，一些资金链紧张的机场就会推出“充500送500”、“买一年送半年”等夸张的促销活动。这往往是老板跑路前最后捞一笔的信号。</p>
            <h2>特征分析</h2>
            <p>如果一家机场近期频繁掉线，客服回复越来越慢，且突然推出极具诱惑力的年付活动，请立刻停止续费。宁可转为月付，也绝不要贪图一时的便宜被割韭菜。</p>
            <div class="lyric-block">
                「在所有的谎言里面，最可怕的并不是欺骗。」
                <cite>—— 李志</cite>
            </div>
        `,
        is_pinned: 0
    },
    {
        type: 'review',
        slug: 'review-amytelecom-2026',
        title: 'AmyTelecom 最新评测：极致稳定的 IPLC 贵族体验',
        subtitle: '除了贵没有别的缺点，适合预算充足的高端商务用户。',
        tag: '稳定性',
        date: '2026-06-03',
        score: 9.3,
        content: `
            <h2>什么是真正的“贵族”体验？</h2>
            <p>在测试 AmyTelecom 的这段时间里，最大的感受就是“无感”。无论是晚高峰还是平峰期，YouTube 8K 视频都可以无缝拖拽。全线 IPLC 专线接入，有效规避了公网的拥堵和审查干扰。</p>
            <h2>值不值得买？</h2>
            <p>如果你每个月愿意在网络上投入超过 100 元，且对网络的稳定性要求极高（比如跨国会议、高频金融交易），那么 AmyTelecom 绝对是不二之选。</p>
            <div class="tip"><strong>结论：</strong>不适合普通学生党或轻度刷剧用户，这是属于对网络质量有刚需的用户的神兵利器。</div>
        `,
        is_pinned: 1
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
        console.log('Inserted additional articles successfully.');
    }
});
