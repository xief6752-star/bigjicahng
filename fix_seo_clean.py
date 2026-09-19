#!/usr/bin/env python3
import os
import re

BASE = '/Users/mac/Documents/open/bigjichang'

SEO = {
    # Reviews
    'runaway-airport-warning.html': (
        '【避坑】某新晋"一元机场"光速跑路全纪录 · big博客',
        '便宜没好货，再次印证了这个不变的真理。记录某新晋一元机场从上线到光速跑路的完整过程，提醒大家警惕超低价套餐背后的高风险。'
    ),
    'review-flyingbird.html': (
        '飞鸟机场 (FlyingBird) 深度评测：全线 IEPL 专线的极速标杆 · big博客',
        '晚高峰 4K 视频秒开！全协议支持，提供多端定制客户端，追求低延迟体验的不二之选。本文实测飞鸟机场全线 IEPL 专线速度表现。'
    ),
    'review-glados.html': (
        'GlaDOS 机场深度评测：稳定运营近十年的学术与极客传奇 · big博客',
        '支持 WireGuard 协议，多标签位套餐灵活选，学术与技术爱好者的十年老牌首选机场，本文深度测评其稳定性与流媒体解锁能力。'
    ),
    'review-ssrdog.html': (
        'SSRDOG 机场深度评测：全自建中转骨干网的低延迟电竞标杆 · big博客',
        '多协议完美支持，全线自建中转骨干，晚高峰低延迟表现出色，是电竞玩家与对速度要求极高用户的理想选择。'
    ),
    'review-siliconflow.html': (
        '硅基流动 (SiliconFlow) 深度评测：国产开源大模型托管天花板 · big博客',
        '实测 TTFB 延迟仅 45ms！免费额度慷慨，API 兼容 OpenAI 格式，国内最佳开源大模型推理平台深度评测。'
    ),
    'review-fourks.html': (
        '4ksAPI 深度评测：稳定运行超两年的老牌中转网关标杆 · big博客',
        '上游稳定，全球多地节点覆盖，运营超两年零跑路记录，适合对稳定性有极高要求的长期用户。'
    ),
    'review-shunyun.html': (
        '瞬云机场评测：IPLC 专线晚高峰 4K 秒开，性价比突出 · big博客',
        '近期实测的一匹黑马，IPLC 专线晚高峰 4K 视频流畅无压力，价格亲民，性价比在同类机场中属于第一梯队。'
    ),
    'review-huanyuyun.html': (
        '寰宇云机场评测：BGP 三网中转，20+ 地区流媒体全解锁 · big博客',
        '如果你是重度 Netflix/Disney+ 玩家，寰宇云的全球20+地区流媒体解锁能力值得重点关注，BGP三网中转延迟稳定。'
    ),
    'review-kycloud.html': (
        'Kycloud 机场评测：中转节点为主，价格亲民适合轻度用户 · big博客',
        '体量极大的老牌厂商，以中转节点为主，价格亲民，适合日常浏览网页、轻度使用不追求极速的用户群体。'
    ),
    'review-rixcloud.html': (
        'RixCloud 机场评测：晚高峰速度回归，适合作为备用机场 · big博客',
        '曾以极速著称，经历动荡后晚高峰速度逐步回归，当前适合作为主力机场的备用补充，价格合理。'
    ),
    'review-nexitally.html': (
        'Nexitally (奶昔) 机场深度评测：顶级大厂体验值不值这个价 · big博客',
        '圈内公认的顶级大厂，价格偏高但线路质量有保障，本文深度测评奶昔机场的速度表现与流媒体解锁实力。'
    ),
    'review-mdss.html': (
        'MDSS 机场评测：定制化企业专线，高并发商业需求首选 · big博客',
        '曾经的王者跌落神坛又重新崛起，主打企业级高并发定制专线，适合有批量账号和商业流量需求的用户。'
    ),
    'review-amytelecom.html': (
        'AmyTelecom 机场评测：跨境商务专线，企业级稳定性体验 · big博客',
        '技术流团队运营，主打跨境商务场景，企业级线路稳定性出色，适合对稳定性和隐私性有高要求的商务用户。'
    ),
    'review-wgetcloud.html': (
        'WgetCloud 机场深度评测：两年亲测，稳定性与隐私性兼顾 · big博客',
        '我目前使用最久的主力机场之一，两年实测数据说话，稳定性和隐私保护在同类产品中表现均衡突出。'
    ),
    'review-kuromis.html': (
        'Kuromis 机场评测：日系风格运营，ACG 内容解锁首选 · big博客',
        '二次元风格包装下的黑马机场，日系节点质量优异，深度解锁 B 站番剧、AbemaTV 等 ACG 平台内容。'
    ),
    'review-flowercloud.html': (
        'FlowerCloud (花云) 机场评测：高性价比中转，适合预算有限用户 · big博客',
        'FlowerCloud 花云主打高性价比中转线路，入门套餐价格极低，适合学生党和预算有限但有翻墙需求的用户。'
    ),
    'review-ytoo.html': (
        'Ytoo (歪兔) 机场评测：稳定中端机场，多套餐灵活按需选购 · big博客',
        'Ytoo 歪兔主打稳定中端机场服务，多档套餐可按需选购，晚高峰表现稳定，适合日常追剧和办公使用。'
    ),
    'review-tag.html': (
        'TAG 机场深度评测：多协议全支持，技术爱好者的灵活之选 · big博客',
        '拥有极其变态的全球节点覆盖率，支持 Shadowsocks/VMess/Trojan 等多协议，技术爱好者的高度自定义首选。'
    ),
    'review-bywave.html': (
        'ByWave 机场深度评测：老牌 IPLC 专线，稳定型用户首选 · big博客',
        '这是一家几乎不做营销的老牌机场，IPLC 专线为主，运营稳健低调，适合追求长期稳定、不想频繁换机场的用户。'
    ),
    'review-1yuan.html': (
        '一元机场与超低价机场深度避坑：便宜没好货的真实代价 · big博客',
        '买的永远没有卖的精。深度揭秘一元机场和超低价套餐背后的超售套路、跑路风险，帮你少花冤枉钱。'
    ),
    'review-immtelecom.html': (
        'ImmTelecom 机场评测：小众精品节点，IP 纯净度极高 · big博客',
        '主打高端定制专线，IP 纯净度极高，可突破 ChatGPT、Claude 等 AI 平台的严格 IP 风控，适合重度 AI 用户。'
    ),
    'review-cheap.html': (
        '9.9元低价机场深度测评：超售套路、断流与跑路风险揭秘 · big博客',
        '别被"9.9元1000G"的噱头骗了。深度测评多家低价机场的晚高峰实际速度、超售情况与跑路概率，帮你擦亮眼睛。'
    ),
    # Knowledge articles
    'cloudflare-warp-truth-2026.html': (
        'Cloudflare WARP 免费翻墙？别信这个谣言了 · big博客',
        '每隔一段时间就有人问：WARP 能翻墙吗？本文用实测数据终结这个误区，告诉你 WARP 能做什么、不能做什么。'
    ),
    'node-region-guide-2026.html': (
        '日本、香港、新加坡、美国节点哪个更好用？2026年地区选择指南 · big博客',
        '面对眼花缭乱的节点城市列表，如何选择最适合自己需求的地区？本文从延迟、解锁能力、稳定性三维度对比各地节点。'
    ),
    'mobile-client-comparison-2026.html': (
        'Shadowrocket vs Quantumult X vs Sing-box：2026年手机客户端横评 · big博客',
        '花30块买个 Shadowrocket 就够了？还是 Quantumult X 更值？2026年最新手机翻墙客户端横向对比，帮你做出正确选择。'
    ),
    'residential-ip-vs-datacenter-ip-2026.html': (
        '家宽 IP 和机房 IP 有什么区别？为什么解锁能力差这么多？ · big博客',
        '同样是翻墙节点，为什么有的能解锁 Netflix 有的不行？本文深度解析家宽 IP 与机房 IP 的核心差异与适用场景。'
    ),
    'bandwidth-units-explained-2026.html': (
        '机场套餐里的100Mbps限速到底是多快？带宽单位完全科普 · big博客',
        '买机场经常看到100M/500M/不限速，这些数字代表什么？本文彻底搞清楚带宽单位换算与实际体验的关系。'
    ),
    '2026-gaming-proxy-guide.html': (
        '玩外服游戏延迟太高？2026年游戏加速器与机场选购全攻略 · big博客',
        '打 Valorant 疯狂丢包？PS5 外服连不上？本文全面对比游戏加速器与翻墙机场，告诉你游戏场景下的最优选择。'
    ),
    'ecommerce-tiktok-proxy-2026.html': (
        '企业级跨境电商与 TikTok 专线怎么选？别用个人机场做外贸 · big博客',
        '从封号到限流，为什么你的 TikTok 账号做不起来？本文揭秘跨境电商专线与个人机场的核心差异，避免踩坑损失。'
    ),
    '2026-ai-unlock-guide.html': (
        '2026年终极指南：如何稳定解锁 ChatGPT-4o 与 Claude 3.7？ · big博客',
        '随着 AI 巨头风控持续收紧，普通机场已无法稳定使用 ChatGPT 和 Claude。本文给出2026年最新可行的 AI 解锁方案。'
    ),
    'sora-bandwidth-impact-2026.html': (
        'Sora 与视频大模型时代：为什么你的机场流量突然不够用了 · big博客',
        '从图文到4K视频生成，AI 视频大模型爆发让流量消耗急剧上升。本文分析 Sora 时代翻墙流量用量激增的真实原因。'
    ),
    '2026-router-guide-seo.html': (
        '2026年翻墙路由器选购完全指南：软路由与硬路由深度对比 · big博客',
        '想实现全家设备无感科学上网？本文深度对比软路由与硬路由方案，推荐2026年最值得购买的翻墙路由器型号。'
    ),
    '2026-proxy-protocols-seo.html': (
        'SSR、V2Ray、Trojan 已落伍？2026年最新主流代理协议解析 · big博客',
        '防火墙技术在不断升级，代理协议也在不断演化。本文梳理2026年主流代理协议的现状，告诉你哪些还能用、哪些该放弃。'
    ),
    '2026-crypto-payment-safety.html': (
        '2026年机场支付安全指南：虚拟货币时代如何防止交易被骗 · big博客',
        '随着微信支付宝通道越来越少，加密货币支付机场越来越普遍。本文详解常见支付骗局识别方法，守住你的钱包。'
    ),
    'streaming-unlock-explained-2026.html': (
        '流媒体解锁原理解析：为什么你的节点看不了 Netflix？ · big博客',
        '明明是香港节点，为什么 Netflix 却提示使用了代理？本文彻底解析流媒体版权锁区原理与各类解锁方案的真实效果。'
    ),
    'relay-vs-iplc-2026.html': (
        '中转节点 vs 专线节点：2026年的价格差还值得吗？ · big博客',
        '在这个算力与带宽齐飞的年代，花更多钱买 IPLC/IEPL 专线还划算吗？本文用实测数据对比中转与专线的实际差距。'
    ),
    'airport-runaway-warning-june.html': (
        '【预警】跑路风险激增：这几类机场可能撑不过这个月 · big博客',
        '敏感期将至，请捂好你的钱包。本文整理近期跑路风险较高的机场类型特征，帮助你提前规避损失，及时备份数据。'
    ),
    '2026-h2-guide.html': (
        '2026年下半年科学上网指南：如何在严密审查下求生？ · big博客',
        '随着技术的迭代，网络封锁手段越来越复杂。本文整理2026年下半年科学上网趋势与应对策略，帮你稳定翻墙。'
    ),
    'article-yunnan-gateway.html': (
        '全国新增国际出口局！云南出境陆缆直连 9Tbps 能拯救晚高峰吗 · big博客',
        '昆明正式升级为全国四大通信出入口局之一，新增9Tbps国际出境带宽。本文分析这对普通翻墙用户意味着什么。'
    ),
    'article-iepl-iplc.html': (
        'IEPL、IPLC、BGP中转到底有什么区别？别再交智商税了 · big博客',
        '读懂这篇科普，小白也能一眼看穿商家的虚假宣传。深度解析 IEPL、IPLC、BGP 中转三者的核心技术差异与实际体验区别。'
    ),
    'article-chaoshou.html': (
        '为什么你的机场晚高峰总是卡成狗？揭秘超售背后的产业链 · big博客',
        '揭开机场老板不愿告诉你的秘密：超售是怎么运作的？晚高峰限速背后的真实商业逻辑与用户权益保护指南。'
    ),
    'article-self-host.html': (
        '自建节点和买机场哪个更安全？一文终结这个争议 · big博客',
        '"自己搭的才安全"——这可能是翻墙圈流传最广的伪命题。本文用数据和逻辑分析自建 vs 买机场的安全性真相。'
    ),
    'huanyuyun-upgrade-2026.html': (
        '寰宇云机场深度评测2026：BGP三网优化+满血IEPL，晚高峰不降速 · big博客',
        '全面升级三网智能路由与满血 IEPL 专线，2026年重测寰宇云机场晚高峰实际速度与流媒体解锁新能力。'
    ),
    'openai-ban-recovery.html': (
        '被 OpenAI 大规模封号后该怎么办？防封存活与申诉实操指南 · big博客',
        '经历了大规模封号潮后的血泪总结：如何判断自己是否被封？申诉成功率多少？以及如何建立防封体系避免再次封号。'
    ),
    'how-to-read-speedtest-seo.html': (
        '如何通过测速图判断机场真实质量？教你避开虚假宣传 · big博客',
        '测速图能造假吗？当然能！本文教你识别机场商家精心挑选的测速数据背后的猫腻，学会读懂真实网络质量指标。'
    ),
    # Tutorials
    'tutorial-cursor.html': (
        '在 Cursor 代码编辑器中接入自定义中转 API 完整教程 · big博客',
        '省去每月$20订阅费，通过配置 Cursor 接入中转 API 使用 GPT-4/Claude，本文提供从注册到配置的完整操作步骤。'
    ),
    'shadowrocket-advanced.html': (
        'Shadowrocket 高级分流规则与自定义配置完全指南 · big博客',
        '小火箭除了扫码，还能这么玩！本文详解 Shadowrocket 的高级分流规则配置、自定义规则编写与订阅管理进阶技巧。'
    ),
    'save-battery-clash-shadowrocket.html': (
        '手机挂梯子耗电太快？教你正确配置 Clash/Shadowrocket 省电 · big博客',
        '别让你的手机电量被垃圾规则榨干。本文详解 Clash 和 Shadowrocket 的分流规则优化，减少不必要连接延长续航。'
    ),
    'tutorial-singbox-android.html': (
        'sing-box Android 端详细使用教程与配置指南 · big博客',
        '新一代多协议代理内核 sing-box 的 Android 端完整配置教程，从安装到导入订阅，支持 VLESS/Hysteria2/Trojan 等协议。'
    ),
    'tutorial-clash-win.html': (
        'Clash for Windows 详细使用教程与配置指南 · big博客',
        'Clash for Windows 从下载安装到导入机场订阅的完整操作教程，包含分流规则配置、常见报错解决与进阶使用技巧。'
    ),
    'tutorial-clashx-mac.html': (
        'ClashX / ClashX Pro 使用教程与详细配置说明 · big博客',
        'Mac 用户专属：ClashX 和 ClashX Pro 的安装配置完整教程，从导入订阅到系统代理设置，图文详解每一个操作步骤。'
    ),
    'tutorial-shadowrocket.html': (
        'Shadowrocket（小火箭）详细使用教程与订阅配置 · big博客',
        'iOS 最受欢迎的代理客户端 Shadowrocket 完整使用教程，包含购买、安装、导入机场订阅与常见问题解决方案。'
    ),
    'tutorial-mihomo-router.html': (
        'OpenWrt + Mihomo 旁路由透明代理完整配置教程 · big博客',
        '全家设备无感科学上网的终极方案：OpenWrt 软路由配合 Mihomo 内核实现透明代理，本文提供从零开始的完整配置步骤。'
    ),
    'tutorial-quantumultx.html': (
        'Quantumult X 使用教程：订阅导入与高级分流配置 · big博客',
        'iOS 上最强大的代理工具 Quantumult X 完整教程，涵盖节点导入、策略组配置、MitM 解密与脚本功能进阶使用。'
    ),
    'tutorial-v2rayn.html': (
        'v2rayN 使用教程：Windows 端完整配置与节点管理指南 · big博客',
        'Windows 平台 v2rayN 的从零安装配置教程，包含订阅添加、协议配置、路由规则设置与常见连接问题排查。'
    ),
    'tutorial-v2rayu.html': (
        'V2RayU macOS 使用教程：安装配置与订阅管理指南 · big博客',
        'macOS 平台 V2RayU 的完整安装配置教程，从软件下载到导入机场订阅，图文详解 macOS 下的代理工具使用方法。'
    ),
    'post-2026-best.html': (
        '2026年机场推荐完整指南：性价比排行与选购建议 · big博客',
        '2026年最新机场推荐汇总，基于实测数据对飞鸟、GlaDOS、瞬云、奶昔等主流机场进行性价比综合排行，帮你选对机场。'
    ),
}

GENERIC_TITLE = 'big博客 · 独立评测'
fixed = 0
skipped = 0

for filename, (title, desc) in SEO.items():
    path = os.path.join(BASE, filename)
    if not os.path.exists(path):
        print(f'MISSING: {filename}')
        continue

    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace generic title
    if GENERIC_TITLE not in content:
        print(f'SKIP (no generic title): {filename}')
        skipped += 1
        continue

    # Build new title tag
    new_title_block = f'<title>{title}</title>\n<meta name="description" content="{desc}">\n<meta property="og:title" content="{title}">\n<meta property="og:description" content="{desc}">\n<meta name="twitter:title" content="{title}">\n<meta name="twitter:description" content="{desc}">'

    # Replace title and insert metas (remove any existing og/twitter description metas first)
    content = re.sub(r'<meta\s+(?:property="og:(?:title|description)"|name="twitter:(?:title|description)")[^>]*>\n?', '', content)
    content = re.sub(r'<meta\s+name="description"[^>]*>\n?', '', content)
    content = content.replace(f'<title>{GENERIC_TITLE}</title>', new_title_block)

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f'FIXED: {filename}')
    fixed += 1

print(f'\nDone: {fixed} fixed, {skipped} skipped')
