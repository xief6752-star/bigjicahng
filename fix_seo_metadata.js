// fix_seo_metadata.js
// 把 SEO 修复（标题/描述扩写）写回数据库源头，避免下次 build_all.js 重新渲染时被覆盖。
// 只更新 title 或 subtitle 字段被明确列出的部分，未列出字段保持原值不变。

const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const db = new sqlite3.Database(path.join(__dirname, 'database.sqlite'));

const fixes = [
    // --- Batch A ---
    { slug: 'review-1yuan', subtitle: '买的永远没有卖的精，不要试图在机场圈子里寻找慈善家。深度拆解一元机场和超低价套餐背后的超售逻辑与跑路套路，帮你看清便宜背后要付出的真实代价。' },
    { slug: 'review-kuromis', subtitle: '二次元风格包装下的黑马，性价比不错但偶有抽风。Kuromis 走日系运营路线，主打 ACG 内容解锁，本文实测其节点表现和稳定性，帮你判断是否值得入手。' },
    { slug: 'review-flowercloud', subtitle: 'FlowerCloud（花云）主打高性价比中转线路，界面好看、节点靠谱，适合预算有限但要求稳定的用户，实测数据一次看清。' },
    { slug: 'review-amytelecom', subtitle: '技术流团队运营，不屑于搞营销，全靠口碑相传的老牌劲旅。AmyTelecom 主攻跨境商务专线，本文实测其企业级稳定性、晚高峰速度与适用场景。' },
    { slug: 'review-mdss', subtitle: '曾经的王者跌落神坛，如今只剩下情怀支撑。MDSS 主打定制化企业专线，适合高并发商业需求，本文实测其当前的速度表现、稳定性与真实性价比。' },
    { slug: 'review-immtelecom', subtitle: '又一家主打高端的专线机场，商务人士可以闭眼入。ImmTelecom 走小众精品节点路线，IP 纯净度极高，本文实测其速度表现与适用人群，看完再决定要不要下单。' },
    { slug: 'review-ytoo', subtitle: 'Ytoo（歪兔）主打稳定中端机场服务，日韩节点爱好者的福音，流媒体解锁全绿，多套餐灵活可选，本文带来完整实测数据与购买建议。' },
    { slug: 'runaway-airport-warning', title: '【避坑实录】某新晋"一元机场"上线即光速跑路完整纪录', subtitle: '便宜没好货，再次印证了这个不变的真理。记录某新晋一元机场从上线到光速跑路的完整过程，提醒大家警惕超低价套餐背后的高风险，钱包捂紧一点。' },

    // --- Batch B ---
    { slug: 'review-glados', subtitle: '支持 WireGuard 协议，专为学生与科研人员提供免费优惠，纯净度与安全性的终极代表。本文回顾 GlaDOS 近十年稳定运营历程，看它为何仍是学术与极客圈的传奇。' },
    { slug: 'review-nexitally', title: 'Nexitally (奶昔) 机场深度评测：顶级大厂体验值不值这个价', subtitle: '圈内公认的顶级大厂，除了贵几乎没有缺点。适合预算充足的极致体验追求者。本文实测 Nexitally（奶昔）的节点质量、晚高峰速度与售后口碑，看看是否值得为顶级体验买单。' },
    { slug: 'review-flyingbird', subtitle: '晚高峰 4K 视频秒开！全协议支持，提供多端定制客户端，追求低延迟体验的不二之选。本文实测飞鸟机场全线 IEPL 专线速度表现，看它是否配得上"极速标杆"这个称号。' },
    { slug: 'review-tag', subtitle: '拥有极其变态的全球节点覆盖率，你能在地球上找到的国家它几乎都有节点。TAG 机场多协议全支持，本文实测其速度表现，适合喜欢折腾的技术爱好者。' },
    { slug: 'review-huanyuyun', subtitle: '如果你是重度 Netflix/Disney+ 玩家，或者有特殊的小众地区节点需求，这家 BGP 中转能给你提供 20+ 个国家和地区的稳定解锁支持，本文附三网测速实测与套餐推荐。' },
    { slug: 'review-kycloud', subtitle: '体量极大的老牌厂商，表现中规中矩，胜在跑路风险极低。Kycloud 以中转节点为主、价格亲民，适合轻度用户，本文带来完整实测数据与购买建议。' },
    { slug: 'review-rixcloud', subtitle: '曾以极速著称但也曾陷入风波的争议之作。如今复活归来，晚高峰测速依然亮眼，但建议仅作为备用方案，切忌盲目年付，本文详解 RixCloud 的历史与当前表现。' },
    { slug: 'review-fourks', subtitle: '上游稳定、支持微信/支付宝充值与正规增值税开票，高校与开发者的省心首选。本文实测 4ksAPI 这家运行超两年的老牌中转网关的速度与稳定性表现。' },
    { slug: 'review-cheap', subtitle: '别被"9.9元1000G"的噱头骗了。深入揭秘低价机场的超售套路、晚高峰断流真相，以及为什么你迟早会为贪便宜买单，附真实用户案例与避坑建议一次讲清。' },
    { slug: 'review-shunyun', subtitle: '近期实测的一匹黑马，IPLC 专线质量扎实且月付门槛低。如果你预算有限又不想在高峰期忍受转圈缓冲，这是一个极具性价比的选择，本文附晚高峰 4K 秒开实测数据。' },
    { slug: 'review-yuntu', subtitle: '稳定运营、节点纯净、全解锁 Netflix/Disney+/ChatGPT，性价比突出，目前综合评分最高的推荐机场。本文附全线 IPLC 专线晚高峰实测数据，下载速度超 300Mbps。' },

    // --- Batch C ---
    { slug: 'huanyuyun-upgrade-2026', subtitle: '全面升级三网智能路由，不限设备数量，原生IP流媒体完美解锁。本文实测寰宇云机场2026年新版BGP三网优化与满血IEPL线路，晚高峰不降速的表现。' },
    { slug: 'airport-runaway-warning-june', subtitle: '6月敏感期将至，请捂好你的钱包，警惕商家的"最后疯狂"。本文盘点近期跑路高风险的几类机场特征，帮你提前识别信号，减少损失。' },
    { slug: 'openai-ban-recovery', subtitle: '经历了 2026 年初的春季大扫荡，这是你必须掌握的账号生存手册。总结被 OpenAI 大规模封号后的防封存活技巧与极致申诉实操经验。' },
    { slug: 'article-self-host', subtitle: '"自己搭的才安全？"——这可能是翻墙圈流传最广的伪命题。本文从成本、维护难度和真实风险角度，客观对比自建节点与购买机场的优劣。' },
    { slug: 'cloudflare-warp-truth-2026', subtitle: '每隔一段时间就有人问：WARP 能翻墙吗？2026年我们来一次彻底的答疑，讲清它的真实定位和与代理工具的本质区别。' },
    { slug: 'tutorial-cursor', subtitle: '省去 $20/月订阅费，按量计费流畅调用 Claude 3.5 Sonnet 和 DeepSeek V3。手把手教你在 Cursor 代码编辑器中接入自定义中转 API 的完整配置步骤。' },
    { slug: 'sora-bandwidth-impact-2026', subtitle: '从图文到 4K 视频生成，AI 的进化正在彻底改变翻墙用户的流量消耗习惯。揭秘 Sora 等视频大模型如何让你的机场流量突然不够用。' },
    { slug: 'relay-vs-iplc-2026', subtitle: '在这个算力与带宽齐飞的年代，公网中转和物理专线的体验差距是否对得起它们的价格差？本文用2026年最新数据帮你算清这笔账。' },
    { slug: 'shadowrocket-advanced', subtitle: '小火箭除了扫码，还能这么玩！手把手教你配置去广告与分流，掌握 Shadowrocket 的高级分流规则和自定义配置技巧。' },
    { slug: 'node-region-guide-2026', subtitle: '面对眼花缭乱的节点城市，新手总是不知道该连哪个。这篇文章帮你建立选择框架，详解日本、香港、新加坡、美国节点各自的延迟与解锁特点。' },
    { slug: 'article-iepl-iplc', subtitle: '读懂这篇科普，小白也能一眼看穿商家的虚假宣传。一次讲清 IEPL、IPLC 和 BGP 中转的技术区别，以及它们对实际使用体验的真实影响。' },
    { slug: 'mobile-client-comparison-2026', subtitle: '花 30 块买个 Shadowrocket 就够了，还是值得折腾 Quantumult X 或 sing-box？本文从功能、易用性和规则生态三方面横评三款主流手机客户端。' },
    { slug: 'article-chaoshou', subtitle: '揭开机场老板不愿告诉你的秘密：1G 的带宽究竟卖给了多少人？本文拆解晚高峰卡顿背后的超售逻辑，帮你看懂机场行业不为人知的成本与套路。' },
    { slug: 'save-battery-clash-shadowrocket', subtitle: '别让你的手机电量被垃圾规则榨干。老油条教你如何优化分流，实现无感省电，正确配置 Clash 和 Shadowrocket 的分流规则告别耗电焦虑。' },
    { slug: 'how-to-read-speedtest-seo', subtitle: '测速图能造假吗？当然能！教你几招看懂机场测速图的猫腻，识别虚假宣传中常见的截图套路和话术，避免被漂亮数字忽悠。' },

    // --- Batch D (titles for tutorial pages) ---
    { slug: 'tutorial-singbox-android', title: 'sing-box Android 端详细使用教程与配置指南' },
    { slug: 'tutorial-clash-win', title: 'Clash for Windows（CFW）详细使用教程与配置指南' },
    { slug: 'tutorial-clashx-mac', title: 'ClashX / ClashX Pro 使用教程与详细配置说明' },
    { slug: 'tutorial-shadowrocket', title: 'Shadowrocket（小火箭）详细使用教程与订阅配置' },
    { slug: 'post-2026-best', title: '2026 年机场魔法梯子<br>完整推荐指南：性价比排行与选购建议' },

    // --- Batch E (second-pass fixes) ---
    { slug: '2026-ai-unlock-guide', subtitle: '随着 AI 巨头风控持续收紧，寻找干净的住宅原生 IP 成为硬通货。本文教你如何在 2026 年真正稳定地原生解锁 ChatGPT-4o 与 Claude 3.7，避开常见的封号陷阱。' },
    { slug: '2026-crypto-payment-safety', title: '2026年机场支付安全指南：虚拟货币时代如何防止交易被骗', subtitle: '随着微信支付宝通道越来越少，虚拟货币支付成为主流，这里有一份防骗避坑指南，教你识别常见的支付诈骗手法，安全完成机场充值。' },
    { slug: 'article-yunnan-gateway', subtitle: '昆明正式升级为全国四大通信出入口局之一，中老中缅陆缆扩容，西南地区网络延迟迎来大洗牌。本文详解 9Tbps 陆缆直连对晚高峰速度的实际影响。' },
    { slug: '2026-h2-guide', title: '2026年下半年科学上网趋势指南：如何在严密审查下求生', subtitle: '随着技术的迭代，传统的翻墙方式正在失效。本文带你了解下半年的审查趋势变化，以及如何调整策略在严密监管下保持稳定连接。' },
    { slug: 'streaming-unlock-explained-2026', subtitle: '明明是香港节点，为什么 Netflix 却提示你使用了代理？一文看懂背后的DNS解锁技术，以及原生IP和广播IP的关键区别。' },
    { slug: '2026-router-guide-seo', title: '2026年翻墙路由器选购完全指南：软路由与硬路由深度对比', subtitle: '想实现全家设备无感科学上网？本文教你如何选择最适合你的翻墙路由器，深度对比软路由与硬路由的优劣与配置难度。' },
    { slug: 'ecommerce-tiktok-proxy-2026', subtitle: '从封号到限流，为什么你的 TikTok 账号做不起来？IP 纯净度决定了你外贸事业的生死。本文详解企业级跨境电商专线与个人机场的本质区别，帮你选对工具。' },
    { slug: 'review-ssrdog', subtitle: '多协议完美支持，低延迟游戏节点深度调优，追求顺畅联机体验的玩家首选。本文实测 SSRDOG 全自建中转骨干网的电竞表现与晚高峰稳定性。' },
    { slug: 'review-siliconflow', subtitle: '实测 TTFB 延迟仅 45ms！开源模型官方直连，100% 显卡保真无套路。本文深度评测硅基流动（SiliconFlow）的国产开源大模型托管服务，看它是否配得上天花板级口碑。' },
    { slug: '2026-proxy-protocols-seo', subtitle: '防火墙技术在不断升级，我们的代理协议也在迭代。了解最新的防封锁技术，看看 SSR、V2Ray、Trojan 是否真的已经落伍，2026 年该选什么协议。' },
    { slug: '2026-gaming-proxy-guide', subtitle: '打 Valorant 疯狂丢包？看视频不卡的节点，为什么一打游戏就原形毕露？本文详解 2026 年游戏加速器与游戏专线机场的选购全攻略。' },
    { slug: 'bandwidth-units-explained-2026', subtitle: '买机场经常看到 100M/500M/不限速，但实际下载速度是多少？这些数字到底意味着什么？本文用简单换算公式帮你彻底搞懂带宽单位与真实下载速度的关系。' },
];

function updateOne(fix) {
    return new Promise((resolve, reject) => {
        const setClauses = [];
        const params = [];
        if (fix.title !== undefined) { setClauses.push('title = ?'); params.push(fix.title); }
        if (fix.subtitle !== undefined) { setClauses.push('subtitle = ?'); params.push(fix.subtitle); }
        if (!setClauses.length) return resolve({ slug: fix.slug, changes: 0 });
        const sql = `UPDATE articles SET ${setClauses.join(', ')} WHERE slug = ?`;
        params.push(fix.slug);
        db.run(sql, params, function (err) {
            if (err) reject(err);
            else resolve({ slug: fix.slug, changes: this.changes });
        });
    });
}

(async () => {
    let updated = 0;
    let notFound = [];
    for (const fix of fixes) {
        const r = await updateOne(fix);
        if (r.changes === 0) notFound.push(r.slug);
        else updated++;
    }
    console.log(`更新完成：${updated} 篇文章`);
    if (notFound.length) console.log('未匹配到的 slug（可能不在数据库中）:', notFound.join(', '));
    db.close();
})();
