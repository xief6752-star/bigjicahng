const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'database.sqlite'));

const newArticles = [
    {
        type: 'knowledge',
        slug: '2026-ai-unlock-guide',
        title: '2026年终极指南：如何稳定原生解锁 ChatGPT-4o 与 Claude 3.7？',
        subtitle: '随着 AI 巨头风控持续收紧，寻找干净的住宅原生 IP 成为硬通货。',
        tag: 'AI科普',
        date: '2026-06-20',
        score: 0,
        content: `
            <h2>为什么你的 IP 总是被封？</h2>
            <p>到了 2026 年，OpenAI 和 Anthropic 对 IP 的审核已经达到了令人发指的严苛程度。传统的 IDC 机房 IP（比如阿里云、AWS 等常见 VPS 服务器）几乎全军覆没。如果你频繁遇到“Access Denied”或账号无故被封，99% 是因为你使用的梯子 IP 不够干净。</p>
            
            <h2>原生 IP 与住宅 IP 才是王道</h2>
            <p>目前能长期稳定访问 ChatGPT-4o 和 Claude 3.7 的，只有原生 IP 或双ISP住宅 IP。大型的高端机场现在都会专门提供标注为“ChatGPT 解锁”或“原生”的节点，这些节点通常是通过特定渠道接入的干净家宽线路。</p>
            
            <div class="tip"><strong>建议：</strong>对于深度依赖 AI 办公的用户，切勿使用那些几块钱一月的“万人骑”机场节点登录主力账号。购买前务必向机场客服确认是否支持 OpenAI 等 AI 平台的原生解锁。</div>
        `,
        is_pinned: 0
    },
    {
        type: 'knowledge',
        slug: 'sora-bandwidth-impact-2026',
        title: 'Sora 与视频大模型时代：为什么你的机场流量突然不够用了？',
        subtitle: '从图文到 4K 视频生成，AI 的进化正在彻底改变翻墙用户的流量消耗习惯。',
        tag: 'AI风向',
        date: '2026-06-19',
        score: 0,
        content: `
            <h2>流量刺客：AI 视频生成</h2>
            <p>还记得前两年大家买机场，每个月 100G 流量都觉得绰绰有余吗？随着 2026 年 Sora、Runway Gen-4 等超高画质 AI 视频大模型的全面普及，我们在网页端预览、生成并下载 4K AI 视频时，流量消耗呈指数级上升。生成一个几十秒的高清视频，可能就会跑掉几个 GB 的流量。</p>
            
            <h2>机场行业的洗牌与应对</h2>
            <p>这种海量的跨境带宽需求，直接拖垮了许多超售严重的小机场的晚高峰网络。为了应对 AI 时代的带宽挤兑，越来越多的顶级机场开始增加“大流量不限时”套餐，或者针对特定的 AI 服务开启单独的分流专线，以保证生成过程的稳定不断流。</p>

            <div class="lyric-block">
                「时代的车轮滚滚向前，你的流量套餐却停留在昨天。」
                <cite>—— AI 时代的翻墙感悟</cite>
            </div>
        `,
        is_pinned: 0
    },
    {
        type: 'tutorial',
        slug: 'openai-ban-recovery',
        title: '被 OpenAI 大规模封号后该怎么办？防封存活与申诉实操',
        subtitle: '经历了 2026 年初的春季大扫荡，这是你必须掌握的账号生存手册。',
        tag: '防封教程',
        date: '2026-06-18',
        score: 0,
        content: `
            <h2>封号的主要原因分析</h2>
            <p>根据大量样本统计，被 OpenAI 封停的账号，绝大多数触犯了以下两点红线：<br>
            1. <strong>频繁切换节点国家</strong>：一会在美国，一会跳到日本，风控系统会判定账号被盗或异常共享。<br>
            2. <strong>使用了被污染的 IP 池</strong>：与大量违规账号（如滥用 API 的黑灰产）共享了同一个劣质机场节点。</p>
            
            <h2>安全防封策略</h2>
            <p><strong>第一原则：固定节点。</strong>请在翻墙软件（如 Clash / Shadowrocket）中，为 <code>openai.com</code> 和 <code>chatgpt.com</code> 设置专属的分流规则，强制将其绑定到你机场中最稳定的一条原生美国节点上，并且<strong>永远不要更改</strong>。</p>
            
            <h2>如果已经被封了怎么办？</h2>
            <p>如果你确信自己没有违反使用协议，可以通过向 <code>support@openai.com</code> 发送英文申诉邮件。邮件核心要点：强调自己是真实的个人用户，可能是因为旅行（Travel）或使用了公共 Wi-Fi 导致 IP 异常，请求人工复核。通常有 30% 的概率能解封。</p>
            
            <div class="tip"><strong>终极方案：</strong>如果账号对你至关重要，除了购买高端专线机场，甚至可以考虑购买独享的静态住宅 IP（Static Residential Proxy）专门用于 AI 交互。</div>
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
        console.log('Inserted AI articles successfully.');
    }
});
