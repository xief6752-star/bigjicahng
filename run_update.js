const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const db = new sqlite3.Database(path.join(__dirname, 'database.sqlite'));

const ieplContent = `
    <h2>什么是 IPLC 和 IEPL？</h2>
    <p>简单来说，这就是“物理专线”。你的数据不走拥堵的公网，而是走一条商家花高价租用的内部高速公路，直达海外。这意味着无论外面怎么墙、晚高峰怎么堵，你的速度都不受影响。</p>
    <p>区别在于 IEPL 是二层网络，IPLC 偏向传统专线，但在机场圈，你可以把它们划等号：<strong>它们都代表最高质量，且不会被墙。</strong></p>
    
    <h2>回顾2025：ChatGPT封号潮与专线崛起</h2>
    <p>在经历了 2025 年底那波严厉的 ChatGPT 大规模封号潮之后，大家才真正意识到线路原生性和稳定性的重要性。很多普通中转机场的 IP 惨遭 OpenAI 拉黑，而优质的 IEPL/IPLC 专线机场凭借其纯净的出口 IP 和高度抗封锁能力，成了“刚需”。</p>

    <h2>什么是 BGP 中转？</h2>
    <p>中转的意思是，你的数据先发到国内的一台服务器（比如广州移动），然后由这台服务器转发到海外。BGP 意思是这台国内服务器接了电信联通移动多条线路，你用什么网连它都不卡。</p>
    <p>中转的质量取决于跨境那一段公网的拥堵程度。性价比高，但晚高峰依然有波动风险。</p>

    <div class="tip"><strong>结论：</strong>打游戏、重度需求买 IPLC/IEPL；看视频、轻度需求买 BGP 中转。别信什么“直连起飞”，早过时了。</div>

    <div class="lyric-block">
      「真相总是赤裸裸。」
      <cite>—— 逼哥说大实话</cite>
    </div>
`;

const chaoshouContent = `
    <h2>超售是行业的原罪</h2>
    <p>一条 1Gbps 的专线成本可能高达几万人民币。如果商家按成本价卖，你根本买不起。于是他们把这 1Gbps 卖给了 1000 个人。白天大家都在上班，没人用，你觉得很快；到了晚上 8 点，1000 个人同时打开了 YouTube，直接挤爆。</p>
    
    <h2>2026年AI浪潮与算力、带宽双重挤兑</h2>
    <p>进入 2026 年，随着 Sora 等大规模 AI 视频生成模型的普及，整个互联网的跨国带宽被严重挤兑。各大机场为了维持利润，超售现象比 2025 年更甚。以往能在晚高峰跑满的 20 块钱机场，现在可能连 1080P 都吃力。这也是为什么如今大家越来越倾向于购买那些“贵得有道理”的机场。</p>

    <h2>如何避开严重超售的坑？</h2>
    <p>一分钱一分货。那些标榜 9.9 元 1000G 的，为了回本至少把带宽超售了 100 倍以上。如果你想晚高峰不卡，最简单的办法就是提高预算，去买那些把低价用户门槛过滤掉的昂贵机场。</p>

    <div class="tip"><strong>避坑指南：</strong>看到承诺“不超售”的平价机场，可以直接关掉网页。</div>

    <div class="lyric-block">
      「这世界有太多不如意，但你的生活还是要继续。」
      <cite>—— 李志《关于郑州的记忆》</cite>
    </div>
`;

const selfHostContent = `
    <h2>自建的最大痛点：被封 IP</h2>
    <p>很多小白觉得买个搬瓦工 VPS 自己搭节点最安全。实际上，个人 VPS 的 IP 段早就被防火墙摸得一清二楚，每逢敏感时期第一个被封的就是这批 IP。</p>

    <h2>2025年大规模封锁行动的启示</h2>
    <p>大家应该对 2025 年 6 月的那次“净网风暴”记忆犹新。当时几乎所有的常规自建节点（包括 VMess、Trojan 甚至一些伪装较弱的 VLESS）在一夜之间全军覆没，大量个人 VPS IP 被精准识别阻断。而大型机场却依然能正常运作，甚至有些只是短暂停顿了几分钟就恢复了。</p>

    <h2>为什么机场反而能活下来？</h2>
    <p>大型机场用的都是国内的 BGP 入口和专线，流量在过墙之前就已经走专线出去了，或者有成熟的隧道伪装技术。他们有专业的运维团队 24 小时监控更换节点。个人的技术实力是无法和成熟黑灰产团队抗衡的。</p>
    
    <div class="tip"><strong>建议：</strong>除非你有极高的匿名需求且技术过硬，否则老老实实买知名大厂的机场，省时省力。</div>

    <div class="lyric-block">
      「聪明人总是知道什么时候该放弃。」
      <cite>—— 李志</cite>
    </div>
`;

db.serialize(() => {
    db.run("UPDATE articles SET content = ?, date = '2025-11-15' WHERE slug = 'article-iepl-iplc'", [ieplContent]);
    db.run("UPDATE articles SET content = ?, date = '2026-03-20' WHERE slug = 'article-chaoshou'", [chaoshouContent]);
    db.run("UPDATE articles SET content = ?, date = '2025-07-01' WHERE slug = 'article-self-host'", [selfHostContent]);
});

console.log("Articles updated.");
