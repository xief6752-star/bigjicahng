#!/usr/bin/env python3
import re

BASE = '/Users/mac/Documents/open/bigjichang'

# Expanded descriptions (120-160 chars each)
DESCS = {
    'review-fourks.html': '4ksAPI 运营超两年零跑路记录，上游稳定，全球多地节点覆盖广，支持微信支付宝充值，正规开票，是高校与企业开发者的省心首选机场。',
    'review-rixcloud.html': '曾以极速著称的老牌机场，经历风波后晚高峰速度逐步回归正常水平，当前适合作为主力机场的备用补充，但请勿盲目年付，月付观察为佳。',
    'review-1yuan.html': '买的永远没有卖的精。深度揭秘一元机场和超低价套餐背后的超售套路与跑路风险，用真实案例告诉你，贪便宜最终要付出多大代价。',
    'review-wgetcloud.html': '我目前使用最久的主力机场之一，两年真实实测数据说话。IEPL 专线接入，稳定性和隐私保护在同类产品中表现均衡突出，晚高峰 4K 无压力。',
    'review-mdss.html': '曾经的王者跌落神坛又重新崛起，主打企业级高并发定制专线。适合有批量账号操作和商业流量需求的用户，个人用户性价比一般。',
    'review-nexitally.html': '圈内公认的顶级大厂，价格偏高但线路质量有保障，晚高峰 4K 视频极速流畅。本文深度测评奶昔机场的节点质量、速度表现与流媒体解锁实力。',
    'review-kycloud.html': '体量极大的老牌厂商，跑路风险极低，以中转节点为主，价格亲民，表现中规中矩。适合日常浏览网页、轻度翻墙、不追求极速的预算用户群体。',
    'review-amytelecom.html': '技术流团队低调运营，主打跨境商务场景，企业级线路稳定性出色，全靠口碑相传。本文实测 AmyTelecom 的速度表现与适合哪类商务用户群体。',
    'review-ytoo.html': 'Ytoo 歪兔主打稳定中端机场服务，多档套餐可按需选购，日韩节点爱好者的福音，流媒体解锁全绿，晚高峰表现稳定，适合日常追剧和轻量办公。',
    'article-chaoshou.html': '揭开机场老板不愿告诉你的秘密：1G 带宽究竟卖给了多少人？超售是怎么运作的？晚高峰卡顿背后的真实商业逻辑与普通用户的权益保护指南。',
    'review-ssrdog.html': '全线自建中转骨干网，多协议完美支持，低延迟游戏节点深度调优，晚高峰稳定不降速。追求顺畅联机体验的玩家首选，SSRDOG 电竞表现实测报告。',
    'how-to-read-speedtest-seo.html': '测速图能造假吗？当然能！本文教你识别机场商家精心挑选的测速数据背后的猫腻，学会看懂真实网络质量指标，避免被漂亮数字和话术忽悠上当。',
    '2026-crypto-payment-safety.html': '随着微信支付宝通道越来越少，加密货币支付机场越来越普遍。本文详解常见支付骗局的识别方法与防范技巧，帮你安全完成机场充值，守住钱包。',
    '2026-router-guide-seo.html': '想实现全家设备无感科学上网？本文深度对比软路由与硬路由方案的优劣与配置难度，推荐2026年最值得购买的翻墙路由器型号，从入门到进阶全覆盖。',
    'airport-runaway-warning-june.html': '敏感期将至，请捂好你的钱包，警惕商家的"最后疯狂"。本文整理近期跑路风险较高的几类机场特征，帮你提前识别危险信号，减少不必要的资金损失。',
    '2026-h2-guide.html': '随着技术的迭代，网络封锁手段越来越复杂，传统翻墙方式正在失效。本文整理2026年下半年的审查趋势变化与应对策略，帮你在严密监管下保持稳定连接。',
    'huanyuyun-upgrade-2026.html': '全面升级三网智能路由与满血 IEPL 专线，不限制设备数量。2026年重测寰宇云机场晚高峰实际速度、流媒体解锁新能力与BGP三网优化后的延迟表现。',
    'openai-ban-recovery.html': '经历大规模封号潮后的血泪总结：如何判断自己是否被封？申诉成功率多少？以及如何建立防封体系避免再次封号。2026年最新 OpenAI 账号生存实操指南。',
    'bandwidth-units-explained-2026.html': '买机场经常看到100M/500M/不限速，但实际下载速度是多少？这些数字到底代表什么？本文用简单换算公式帮你彻底搞懂带宽单位换算与真实体验的关系。',
    'article-yunnan-gateway.html': '昆明正式升级为全国四大通信出入口局之一，新增9Tbps国际出境带宽。本文详解这次扩容对普通翻墙用户意味着什么，西南地区晚高峰延迟能改善多少。',
    'review-shunyun.html': '近期实测的一匹黑马，IPLC 专线质量扎实，晚高峰 4K 视频流畅无压力，月付门槛低，性价比在同类专线机场中属于第一梯队，强烈推荐预算有限的用户尝试。',
    'node-region-guide-2026.html': '面对眼花缭乱的节点城市列表，如何选择最适合自己需求的地区？本文从延迟、流媒体解锁能力、稳定性三个维度对比日本、香港、新加坡、美国节点各自的特点。',
    'review-kuromis.html': '二次元风格包装下的黑马机场，日系节点质量优异，深度解锁 B 站番剧、AbemaTV 等 ACG 平台内容。性价比不错但偶有抽风，本文实测其稳定性与节点质量。',
    'review-bywave.html': '这是一家几乎不做营销的老牌机场，IPLC 专线为主，运营稳健低调，全靠用户口碑相传。适合追求长期稳定、不想频繁换机场、重视隐私保护的长期主义者。',
    'review-flowercloud.html': 'FlowerCloud 花云主打高性价比中转线路，界面设计好看，入门套餐价格极低，节点质量靠谱。适合学生党和预算有限但有基本翻墙需求、不追求极速体验的用户。',
    'cloudflare-warp-truth-2026.html': '每隔一段时间就有人问：WARP 能翻墙吗？本文用实测数据终结这个误区，告诉你 Cloudflare WARP 能做什么、不能做什么，以及它和真正代理工具的本质区别。',
    'review-cheap.html': '别被「9.9元1000G」的噱头骗了！深度测评多家低价机场的晚高峰实际速度、超售严重程度与历史跑路概率，带你看清低价机场背后的真实代价与隐患。',
    'ecommerce-tiktok-proxy-2026.html': '从封号到限流，为什么你的 TikTok 账号做不起来？IP 纯净度决定了外贸账号的生死。本文详解企业级跨境电商专线与个人机场的核心差异，帮你选对工具避坑。',
    'tutorial-v2rayn.html': 'Windows 平台 v2rayN 的从零安装配置完整教程，包含订阅地址添加、VMess/VLESS 协议配置、路由规则设置与绕过大陆选项，以及常见连接问题排查方法。',
    '2026-proxy-protocols-seo.html': '防火墙技术在不断升级，代理协议也在不断演化迭代。本文梳理2026年主流代理协议的最新现状，详解 VLESS/Trojan/Hysteria2 等协议的特点，告诉你哪些该用哪些该弃。',
    'sora-bandwidth-impact-2026.html': '从图文到4K视频生成，AI 视频大模型爆发让流量消耗急剧上升。本文量化分析 Sora 等视频 AI 工具的流量消耗，以及这对机场套餐选购策略意味着什么改变。',
    'relay-vs-iplc-2026.html': '在算力与带宽齐飞的年代，花更多钱买 IPLC/IEPL 专线还划算吗？本文用2026年最新实测数据对比中转与专线的实际速度差距，帮你算清这笔账值不值。',
    '2026-gaming-proxy-guide.html': '打 Valorant 疯狂丢包？PS5 外服连不上？本文全面对比游戏加速器与翻墙机场在游戏场景下的延迟表现，详解2026年游戏专线机场的选购全攻略与实测数据。',
    'streaming-unlock-explained-2026.html': '明明是香港节点，为什么 Netflix 却提示使用了代理？本文彻底解析流媒体版权锁区原理、DNS 解锁技术的运作机制，以及原生 IP 和广播 IP 的关键区别。',
    'post-2026-best.html': '2026年最新机场综合推荐汇总，基于实测数据对飞鸟、GlaDOS、瞬云、寰宇云、奶昔等主流机场进行多维度性价比排行，帮你快速选到真正适合自己的机场。',
    'review-siliconflow.html': '实测 TTFB 延迟仅 45ms！免费额度慷慨，API 完全兼容 OpenAI 格式，支持 DeepSeek/Qwen/Llama 等主流开源模型。国内最佳开源大模型推理平台深度评测。',
    'tutorial-shadowrocket.html': 'iOS 最受欢迎的代理客户端 Shadowrocket 小火箭完整使用教程，包含 App Store 购买方法、安装步骤、导入机场订阅配置与常见连接问题的解决方案。',
    'shadowrocket-advanced.html': '小火箭除了扫码订阅，还能这么玩！本文详解 Shadowrocket 的高级分流规则配置、自定义规则编写、多订阅管理与去广告配置，解锁小火箭的进阶使用潜力。',
    'streaming-netflix-2026.html': '2026年Netflix最值得追的剧集精选，悬疑惊悚、科幻、喜剧、韩剧四大门类深度推荐，含评分对比与大陆用户解锁指南，帮你用有限时间看最值得看的内容。',
    'runaway-airport-warning.html': '便宜没好货，再次印证了这个不变的真理。详细记录某新晋一元机场从上线宣传到光速跑路卷钱消失的完整过程，提醒大家警惕超低价套餐背后的极高跑路风险。',
    'residential-ip-vs-datacenter-ip-2026.html': '同样是翻墙节点，为什么有的能解锁 Netflix 有的不行？本文深度解析家宽 IP 与机房 IP 在流媒体解锁、AI 平台访问、稳定性与价格方面的核心差异与各自适用场景。',
    'article-iepl-iplc.html': '读懂这篇科普，小白也能一眼看穿商家的虚假宣传。深度解析 IEPL、IPLC、BGP 中转三者的核心技术差异，以及它们对实际使用延迟、稳定性与体验的真实影响。',
    'tutorial-clash-win.html': 'Clash for Windows 完整使用教程：从下载安装到导入机场订阅，包含分流规则配置、TUN 模式设置、常见报错解决与进阶使用技巧，Windows 用户必看翻墙配置指南。',
    'tutorial-v2rayu.html': 'macOS 平台 V2RayU 的完整安装配置教程，从软件下载到导入机场订阅链接，图文详解 macOS 下的代理工具使用方法，以及 PAC 模式与全局模式的正确切换姿势。',
    'tutorial-quantumultx.html': 'iOS 上最强大的代理工具 Quantumult X 完整教程，涵盖节点导入、策略组自定义配置、MitM 解密证书安装与脚本去广告功能，解锁 QX 的全部进阶使用潜力。',
    'tutorial-mihomo-router.html': '全家设备无感科学上网的终极方案：OpenWrt 软路由配合 Mihomo 内核实现透明代理，本文提供从硬件选型到规则配置的完整步骤，解放每台设备单独配置的烦恼。',
    'save-battery-clash-shadowrocket.html': '别让你的手机电量被垃圾规则榨干。本文详解如何优化 Clash 和 Shadowrocket 的分流规则，避免不必要的流量走代理消耗系统资源，实现无感省电、延长日常续航。',
    'review-tag.html': '拥有极其变态的全球节点覆盖率，你能在地球上找到的国家它几乎都有节点。支持 Shadowsocks/VMess/Trojan 等多协议，TAG 机场是喜欢折腾的技术爱好者的自由首选。',
    'review-glados.html': '支持 WireGuard 协议，多标签位套餐灵活选择，稳定运营近十年零跑路记录。GlaDOS 是学术与技术爱好者的十年老牌首选机场，本文深度测评其最新稳定性与解锁能力。',
    'review-huanyuyun.html': '如果你是重度 Netflix/Disney+ 玩家，寰宇云的全球20+地区流媒体解锁能力值得重点关注。BGP 三网中转延迟稳定，本文附三网测速实测数据与各档套餐推荐建议。',
    'review-flyingbird.html': '晚高峰 4K 视频秒开无缓冲！全协议支持，提供多端定制客户端，全线 IEPL 专线接入。本文实测飞鸟机场的速度、稳定性与流媒体解锁表现，看它是否配得上极速标杆称号。',
    'tutorial-clashx-mac.html': 'Mac 用户专属：ClashX 和 ClashX Pro 的安装配置完整教程，从下载安装到导入订阅链接、设置系统代理，图文详解 macOS 下翻墙工具的每一个关键操作步骤。',
    'review-immtelecom.html': '主打高端定制专线，IP 纯净度极高，可稳定突破 ChatGPT、Claude 等 AI 平台的严格 IP 风控检测，特别适合重度 AI 用户和对账号安全有极高要求的商务人士。',
    'tutorial-cursor.html': '省去每月 $20 订阅费，通过配置 Cursor 接入中转 API 按量使用 GPT-4o/Claude 3.5 等顶级模型。本文提供从注册 API 账号到 Cursor 完整配置的零基础操作步骤。',
    '2026-ai-unlock-guide.html': '随着 AI 巨头风控持续收紧，普通机场节点已无法稳定使用 ChatGPT 和 Claude。本文给出2026年最新可行的 AI 解锁方案，教你如何获取干净的原生住宅 IP。',
    'tutorial-singbox-android.html': '新一代多协议代理内核 sing-box 的 Android 端完整配置教程，从安装 APK 到导入订阅链接，全面支持 VLESS/XTLS-Reality/Hysteria2/Trojan 等最新代理协议。',
    'streaming-disney-plus.html': 'Disney+ 独家内容深度盘点：漫威 MCU 独占剧集、皮克斯动画、星球大战真人剧、Star 频道成人向内容全覆盖，2026年完整观看指南，国内用户订阅与解锁方案详解。',
    'mobile-client-comparison-2026.html': '花30块买个 Shadowrocket 就够了？还是 Quantumult X 更值？2026年最新手机翻墙客户端横向对比，从功能、易用性和规则生态三方面帮你做出正确选择。',
}

import re

fixed = 0
for filename, new_desc in DESCS.items():
    path = f'{BASE}/{filename}'
    try:
        with open(path, 'r') as f:
            content = f.read()
    except FileNotFoundError:
        print(f'MISSING: {filename}')
        continue

    # Replace all description meta tags
    new_content = re.sub(
        r'(<meta\s+name="description"\s+content=")[^"]*(")',
        f'\\g<1>{new_desc}\\2',
        content
    )
    new_content = re.sub(
        r'(<meta\s+property="og:description"\s+content=")[^"]*(")',
        f'\\g<1>{new_desc}\\2',
        new_content
    )
    new_content = re.sub(
        r'(<meta\s+name="twitter:description"\s+content=")[^"]*(")',
        f'\\g<1>{new_desc}\\2',
        new_content
    )

    if new_content != content:
        with open(path, 'w') as f:
            f.write(new_content)
        print(f'FIXED ({len(new_desc)}c): {filename}')
        fixed += 1
    else:
        print(f'NO CHANGE: {filename}')

print(f'\nDone: {fixed} files updated')
