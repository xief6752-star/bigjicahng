const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'database.sqlite'));

const article = {
    type: 'review',
    slug: 'huanyuyun-upgrade-2026',
    title: '【重磅】寰宇云全线升级：全面引入防封锁专线，晚高峰体验再飙升',
    subtitle: '告别晚高峰卡顿！寰宇云本次架构大换血，带来了真正的无感体验。',
    tag: '稳定性',
    date: '2026-06-05',
    score: 9.5,
    content: `
        <h2>全新防封锁专线协议上线</h2>
        <p>寰宇云在经过长达半个月的底层架构调整后，终于迎来了全线节点的大升级。本次升级最大的亮点是抛弃了部分老旧的中转架构，全面引入了业内顶级的防封锁专线隧道技术。实测下来，过去在特殊时期容易出现的 IP 被墙和连接闪断问题得到了根本性的解决。</p>
        <h2>晚高峰 4K 秒开实测</h2>
        <p>我们针对大家最关心的晚高峰时段（晚上 8 点 - 11 点）进行了为期一周的压测。在各大运营商网络下，YouTube 4K 视频不仅能够秒开，且缓冲速度稳定保持在 15w+ Mbps，全程几乎没有感受到任何丢包。</p>
        <h2>全面解锁 AI 与流媒体</h2>
        <p>除了稳定性，寰宇云此次升级还在 DNS 解锁层面下了血本。Netflix、Disney+ 以及 ChatGPT、Sora 等常用 AI 工具均实现了全节点完美原生解锁，再也不用为了看剧频繁切换节点了。</p>
        <div class="tip"><strong>综合评价：</strong>本次升级后，寰宇云在性价比和稳定性之间找到了完美的平衡，毫无疑问是 2026 年最具竞争力的主力机场之一。强烈建议预算在月付 20-30 元区间的用户入手。</div>
    `,
    is_pinned: 1
};

db.serialize(() => {
    // Unpin existing pinned articles if necessary, or just keep them pinned.
    // The user asked to "add a pinned article", so we just insert this one as pinned.
    const stmt = db.prepare(`INSERT INTO articles (type, slug, title, subtitle, tag, date, score, content, is_pinned) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`);
    stmt.run([article.type, article.slug, article.title, article.subtitle, article.tag, article.date, article.score, article.content, article.is_pinned]);
    stmt.finalize();
});

db.close((err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Inserted HuanYuYun upgrade article successfully.');
    }
});
