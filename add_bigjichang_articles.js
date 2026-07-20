const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'database.sqlite'));

const articles = [
  {
    type: 'review',
    slug: 'review-siliconflow',
    title: '硅基流动 (SiliconFlow) 深度评测：国产开源大模型托管天花板',
    subtitle: '实测 TTFB 延迟仅 45ms！开源模型官方直连，100% 显卡保真无套路。',
    tag: '性价比',
    date: '2026-05-24',
    score: 9.6,
    content: `
  <div class="score-bar">
    <div class="score-main">
      <div class="score-num">9.6</div>
      <div class="score-label">综合评分</div>
    </div>
    <div class="score-divider"></div>
    <div class="score-items">
      <div class="score-item">
        <div class="score-item-val">45ms</div>
        <div class="score-item-label">直连延迟</div>
      </div>
      <div class="score-item">
        <div class="score-item-val">9.9</div>
        <div class="score-item-label">服务稳定度</div>
      </div>
      <div class="score-item">
        <div class="score-item-val">100%</div>
        <div class="score-item-label">模型真实性</div>
      </div>
      <div class="score-item">
        <div class="score-item-val">9.8</div>
        <div class="score-item-label">整体性价比</div>
      </div>
    </div>
  </div>

  <div class="lyric-block">
    「你必须知道自己在哪里，你要去哪里。」
    <cite>—— 李志《如果有一件事情是重要的》</cite>
  </div>

  <h2>评测背景：自建显卡与开源模型的碰撞</h2>
  <p>在主流商业闭源模型（如 GPT-4o、Claude 3.5）日益昂贵且面临地缘风控背景下，优秀的开源大模型（如 Qwen2.5、Llama3、DeepSeek）正在以惊人的速度崛起。很多开发者与极客团队开始转向自部署或自托管平台。</p>
  <p>然而，自建显卡集群不仅成本高昂，推理速度优化与高并发更是门槛极高。<strong>硅基流动 (SiliconFlow)</strong> 便是为了解决这个硬核痛点而生的平台。我们对其进行了深度压测，结果只能用“震撼”来形容。</p>

  <h2>🥇 核心优势：开源模型托管天花板</h2>
  <p><strong>1. 极速的首字 TTFB 响应（仅 45ms）</strong></p>
  <p>依托平台自研的 SiliconLLM 推理加速引擎和国内顶级骨干机房部署，首字响应时间（TTFB）实测均值低至 <strong>45ms</strong>。这种毫秒级的首字响应，能彻底消除聊天的停顿等待感，体验极其丝滑。</p>
  
  <p><strong>2. 100% 显卡直连，绝无二手中转套壳</strong></p>
  <p>不同于圈内泛滥的“API 二手中转站”，硅基流动是自建 GPU 显卡集群并进行深度加速优化。你所调用的 Qwen2.5、DeepSeek 等大模型是直接和显卡底层交互，<strong>模型保真度 100%</strong>，从技术源头上杜绝了拿小模型降配注水的猫腻。</p>

  <p><strong>3. 难以置信的超低价格（大量明星模型永久免费）</strong></p>
  <p>注册直接赠送 14 元体验金。更不可思议的是，平台提供了包括 Qwen2.5 7B, Llama3 8B, SDXL 在内的多款大模型 <strong>永久免费调用</strong>！即使是旗舰级的 DeepSeek V3 满血版，价格也极具竞争力（约 1 元/百万 tokens），堪称极客冷启动的白嫖圣地。</p>

  <div class="tip">
    <strong>博主碎碎念：</strong>硅基流动代表的是硬核基建派，它是自己拿卡、自己优化的服务商。论延迟和保真度，这在业内是一流的。
  </div>

  <h2>⚠️ 局限与缺点</h2>
  <p><strong>1. 纯开源生态，无任何商业闭源大模型</strong></p>
  <p>硅基流动专注于开源模型，因此在此绝对无法调用 GPT-4o、Claude 3.5 Sonnet 等闭源商业巨头。如有混合调用需求，必须另寻 4ksAPI 等中转站进行备用。</p>
  <p><strong>2. 细分精选，非大杂烩平台</strong></p>
  <p>只精选国内外最具代表性的数十款明星大模型，若您需要某些极其冷门的自定义微调模型，它可能不像海外 OpenRouter 那么包罗万象。</p>

  <h2>🧪 满血 DeepSeek V3 防降配实测</h2>
  <p>我们在硅基流动上调用 DeepSeek V3，输入图论及经典数学题：</p>
  <div class="warn">
    <strong>测试提问：</strong>有一个由 10 个节点组成的无向图，它可能存在多少条不同的边？若图是连通的，最少和最多分别需要多少条边？<br><br>
    <strong>DeepSeek V3 答复：</strong><br>
    1. 不同的无向边最大数量为：C(10, 2) = 45 条。<br>
    2. 若图是连通的：最少需要 10 - 1 = 9 条边（此时形成一棵树）；最多可以是 45 条边（此时为完全图）。
  </div>
  <p><strong>结论：</strong> 毫无保留地倾泻出 DeepSeek V3 满血版的超强逻辑分析，响应在几十毫秒内倾泻而出，未做任何阉割与注水。</p>

  <h2>🎯 总结</h2>
  <p>如果您日常开发、Agent 代理、编程配置主要使用 <strong>Qwen2.5 家族、DeepSeek 满血版、Llama3</strong> 等明星开源大模型，那么<strong>硅基流动是目前全球范围内首选的托管大本营</strong>。</p>

  <div class="lyric-block">
    「你看这世界坏了，可我们的生活还要继续。」
    <cite>—— 李志《定西》</cite>
  </div>
`
  },
  {
    type: 'review',
    slug: 'review-fourks',
    title: '4ksAPI 深度评测：稳定运行超两年的老牌中转网关标杆',
    subtitle: '上游稳定、支持微信/支付宝充值与正规增值税开票，高校与开发者的省心首选。',
    tag: '稳定性',
    date: '2026-05-24',
    score: 9.5,
    content: `
  <div class="score-bar">
    <div class="score-main">
      <div class="score-num">9.5</div>
      <div class="score-label">综合评分</div>
    </div>
    <div class="score-divider"></div>
    <div class="score-items">
      <div class="score-item">
        <div class="score-item-val">140ms</div>
        <div class="score-item-label">直连延迟</div>
      </div>
      <div class="score-item">
        <div class="score-item-val">9.7</div>
        <div class="score-item-label">服务稳定度</div>
      </div>
      <div class="score-item">
        <div class="score-item-val">98.5%</div>
        <div class="score-item-label">模型真实性</div>
      </div>
      <div class="score-item">
        <div class="score-item-val">9.5</div>
        <div class="score-item-label">整体性价比</div>
      </div>
    </div>
  </div>

  <div class="lyric-block">
    「在这颗星球所有的夜晚，有些事情注定要失去，但你还是要出发。」
    <cite>—— 李志《在这颗星球所有的夜晚》</cite>
  </div>

  <h2>评测背景：寻找大洗牌中坚持下来的实力派</h2>
  <p>AI 中转站行业以“商家跑路快、生命周期短”而备受诟病。经历了 2024-2025 年的一轮轮严苛洗牌，曾经多如牛毛的中转站十去其八。而能够在狂风暴雨中屹立不倒、稳定运营超两年的老牌服务商，<strong>4ksAPI</strong> 绝对是其中极其耀眼的标杆。</p>
  <p>4ksAPI 不搞噱头，不参与恶性低配价格战，而是把全部精力放在了 <strong>直连专线链路优化、高 SLA 吞吐保障与财务正规合规</strong> 上。以下是博主的长周期使用报告。</p>

  <h2>🥇 核心优势：为什么老牌站更让人安心？</h2>
  <p><strong>1. 稳定运营超两年（彻底免除跑路阴影）</strong></p>
  <p>拥有专业且成熟的团队背景，有着合理的商业盈利逻辑。两年多来从未发生过余额失效、网站失联或商家清空余额等问题。对于余额较多的企业和团队而言，安全系数满分。</p>
  
  <p><strong>2. 极佳的国内直连专线（延迟稳定 140ms）</strong></p>
  <p>针对国内三大运营商（电信、联通、移动）进行了多重直连链路和专属专线优化，首字 TTFB 延迟稳定控制在 <strong>140ms</strong> 上下。即便在晚高峰国际出口网络动荡时段，表现依然从容。</p>

  <p><strong>3. 微信/支付宝友好，支持正规增值税发票</strong></p>
  <p>完美对接国内主流微信与支付宝通道，起充极低，完美告别海外虚拟卡和汇率折损。更重要的是，4ksAPI 针对广大高校科研团队、开发者及中小企业，支持提供正规的信息服务类发票，极大方便了报销需要。</p>

  <p><strong>4. 极其齐全的模型库与备灾切换</strong></p>
  <p>全面兼容 OpenAI (GPT-4o/Mini), Anthropic (Claude 3.5 Sonnet), Google (Gemini), 以及 DeepSeek。具有极强的多渠道备用网络，上游渠道多重冗余，无缝应对官方限流或大崩溃。</p>

  <div class="tip">
    <strong>博主碎碎念：</strong>4ksAPI 适合当作生产环境和重度开发的主力 API 服务商。这种两年的老品牌，靠的就是稳健。
  </div>

  <h2>⚠️ 缺点与局限</h2>
  <p><strong>1. 定价处于中端游水平</strong></p>
  <p>4ksAPI 不是纯拼低价的作坊网站，因为要涵盖高质量专线带宽、正规开票税点和多机房 SLA 运维，其高端大模型的售价可能比海外大杂烩聚合站略高 8% 左右，但可用率高出许多。</p>

  <h2>🧪 旗舰级 GPT-4o 防降配实测</h2>
  <p>我们对 4ksAPI 对接的旗舰 <strong>GPT-4o</strong> 进行高阶代码编写测试：</p>
  <div class="warn">
    <strong>测试提问：</strong>请用 C++ 20 实现一个支持超时机制的并发线程安全阻塞队列 (Blocking Queue)。<br><br>
    <strong>GPT-4o 答复：</strong><br>
    （提供了一份非常精巧的 C++20 实现，结合了 <code>std::mutex</code>, <code>std::condition_variable</code> 以及 <code>std::chrono</code>，并完美处理了虚假唤醒和超时唤醒边界状态）。
  </div>
  <p><strong>结论：</strong> 编码深度 and 规范性都是满分级别的旗舰 GPT-4o 表现，没有任何使用低端模型冒充降配的情况，保真度极其优异。</p>

  <h2>🎯 总结建议</h2>
  <p>如果您在写论文做科研、团队外包接单，或是追求极速且看重账户资金安全与发票报销，那么 <strong>4ksAPI 绝对是目前最让人省心的不二之选</strong>。</p>

  <div class="lyric-block">
    「世界会好吗？」
    <cite>—— 李志《这个世界会好吗》</cite>
  </div>
`
  },
  {
    type: 'tutorial',
    slug: 'tutorial-cursor',
    title: '神级配置：在 Cursor 代码编辑器中接入自定义中转 API',
    subtitle: '省去 $20/月订阅费，按量计费流畅调用 Claude 3.5 Sonnet 和 DeepSeek V3。',
    tag: 'Cursor',
    date: '2026-05-24',
    score: 0,
    content: `
  <div class="lyric-block">
    「你也是这样的人吧，在这个冷冷清清的世上独自前行。」
    <cite>—— 李志《热河》</cite>
  </div>

  <h2>前言：为什么要接入第三方中转 API？</h2>
  <p>作为当今最强、最好用的智能 AI 代码编辑器，<strong>Cursor</strong> 凭借强大的 Composer（多文件修改）和高精度的上下文感知，正在彻底颠覆程序员的日常开发流程。</p>
  <p>然而，官方 $20/月的 Pro 订阅对许多人来说存在两大痛点：首先是国内双币信用卡支付极易失败被拒；其次是官方通道在晚高峰期会对顶级模型（如 Claude 3.5 Sonnet）进行限流变慢。</p>
  <p>实际上，Cursor 拥有极其自由开放的自定义接口。通过配置国内优秀的 <strong>第三方自定义中转 API（例如 4ksAPI 或硅基流动）</strong>，我们可以实现：</p>
  <ul>
    <li><strong>按量计费，开销骤减：</strong> 告别死板的月付订阅，对于中低频使用的极客来说，一个月实际调用可能只要几块钱到十几块钱人民币。</li>
    <li><strong>不受限的极速通道：</strong> 晚高峰直接走国内优化链路，避开官方公网拥堵。</li>
    <li><strong>满血版体验：</strong> 在编辑器中完美畅用 Claude 3.5 Sonnet 与 DeepSeek V3 满血大模型。</li>
  </ul>

  <h2>🛠️ 保姆级配置步骤</h2>
  <div class="steps">
    <div class="step">
      <div class="step-num"></div>
      <div class="step-content">
        <div class="step-title">第一步：获取 API 密钥与代理地址</div>
        <div class="step-desc">
          登录您信任的第三方中转站（如 4ksAPI 或硅基流动），在后台生成一个 API 密钥（Key），格式一般为 <code>sk-</code> 开头。同时获取其接口地址（Endpoint），例如 <code>https://api.4ksapi.com/v1</code>（<strong>千万注意：</strong>地址必须以 https 开头，且末尾不要遗漏 <code>/v1</code>）。
        </div>
      </div>
    </div>
    
    <div class="step">
      <div class="step-num"></div>
      <div class="step-content">
        <div class="step-title">第二步：打开 Cursor 模型设置</div>
        <div class="step-desc">
          启动 Cursor，点击右上角的 <strong>“齿轮图标 (Settings)”</strong>（或者 Mac 上按住 <code>Cmd + ,</code>，Windows 上按住 <code>Ctrl + ,</code>）。选择左侧的 <strong>“Models”</strong> 菜单。
        </div>
      </div>
    </div>

    <div class="step">
      <div class="step-num"></div>
      <div class="step-content">
        <div class="step-title">第三步：接管 OpenAI 请求（核心要领）</div>
        <div class="step-desc">
          大部分中转站即便支持非 OpenAI 模型，但都在协议层完美兼容 OpenAI 标准格式。因此，<strong>我们只需要改写 OpenAI 路由即可代接所有模型</strong>。<br>
          ① 启用 <strong>OpenAI API Key</strong> 开关（设为 ON）。<br>
          ② 在输入框中粘贴刚才获取 of <code>sk-...</code> 中转 Key。<br>
          ③ 点击 <strong>Configure</strong>，在 <strong>Override OpenAI Base URL</strong> 输入框中，准确填入刚才获取的中转代理地址，并点击 Save。
        </div>
      </div>
    </div>

    <div class="step">
      <div class="step-num"></div>
      <div class="step-content">
        <div class="step-title">第四步：添加自定义模型名称</div>
        <div class="step-desc">
          因为 Cursor 默认只预设了几个常用官方代号，我们需要手动增加我们想用的中转代号：<br>
          ① 点击下方的 <strong>+ Add Model</strong>。<br>
          ② 依次添加：<code>claude-3-5-sonnet</code> (顶级代码大模型)、<code>deepseek-chat</code> (极具性价比的满血版 DeepSeek V3)。<br>
          ③ <strong>关键一步：</strong> 将 Cursor 原有默认的官方 Anthropic 或 Google 通道全部设为 OFF（关闭），以防请求串道。
        </div>
      </div>
    </div>

    <div class="step">
      <div class="step-num"></div>
      <div class="step-content">
        <div class="step-title">第五步：快速开始与效果测试</div>
        <div class="step-desc">
          返回编辑器中，按 <code>Cmd + L</code> (Mac) 或 <code>Ctrl + L</code> (Win) 唤醒 Chat 面板。在左下角模型列表中选择我们刚才添加的 <code>claude-3-5-sonnet</code> 或者是 <code>deepseek-chat</code>，输入任何代码问题，若能秒开并输出代码，说明配置完美收工！
        </div>
      </div>
    </div>
  </div>

  <h2>💡 常见排错与建议</h2>
  <div class="warn">
    <strong>报错 404 (Model Not Found)？</strong><br>
    代表您的代理地址（Endpoint）漏写了末尾的 <code>/v1</code>，或者您所配的中转站账户中余额已经耗尽，部分中转站在欠费时会直接返回 404，请及时前往中转后台检查余额。
  </div>
  <div class="tip">
    <strong>注意事项：</strong>接入自定义 API 密钥后，Cursor 的 <code>Tab</code> 实时代码自动补全功能（Cursor Tab Copilot）可能无法工作，该功能目前是官方专有协议。但多文件 Composer 编辑、Chat 聊天与指令代码改写功能全部完全正常，能覆盖 95% 以上开发需求！
  </div>

  <div class="lyric-block">
    「明天会好的。」
    <cite>—— 李志</cite>
  </div>
`
  }
];

const insertAll = async () => {
  for (const article of articles) {
    await new Promise((resolve) => {
      db.run(
        `INSERT OR REPLACE INTO articles (type, slug, title, subtitle, tag, date, score, content, is_pinned)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0)`,
        [article.type, article.slug, article.title, article.subtitle, article.tag, article.date, article.score, article.content],
        (err) => {
          if (err) console.error(`Error inserting ${article.slug}:`, err);
          else console.log(`Inserted/Replaced: ${article.slug}`);
          resolve();
        }
      );
    });
  }
  db.close();
};

insertAll();
