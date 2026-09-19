// Cloudflare Pages Function: /go/[slug]
// 记录点击次数到 KV，然后跳转到目标链接
// KV namespace 需在 CF 控制台绑定，变量名：CLICKS

const LINKS = {
  // 极速Cloud - 三个位置
  'jisucloud-top': 'https://ygbk.jsjc456789.com?utm_source=chinabigai&utm_medium=review&utm_campaign=jisucloud&utm_content=top',
  'jisucloud-mid': 'https://ygbk.jsjc456789.com?utm_source=chinabigai&utm_medium=review&utm_campaign=jisucloud&utm_content=mid',
  'jisucloud-bot': 'https://ygbk.jsjc456789.com?utm_source=chinabigai&utm_medium=review&utm_campaign=jisucloud&utm_content=bot',

  // 寰宇云
  'huanyuyun-top': 'https://hyy.52kok.cn/#/register?code=CPBmzXgk&utm_source=chinabigai&utm_medium=review&utm_campaign=huanyuyun&utm_content=top',
  'huanyuyun-mid': 'https://hyy.52kok.cn/#/register?code=CPBmzXgk&utm_source=chinabigai&utm_medium=review&utm_campaign=huanyuyun&utm_content=mid',
  'huanyuyun-bot': 'https://hyy.52kok.cn/#/register?code=CPBmzXgk&utm_source=chinabigai&utm_medium=review&utm_campaign=huanyuyun&utm_content=bot',
};

export async function onRequest(context) {
  const { params, env } = context;
  const slug = params.slug;

  const target = LINKS[slug];

  // 找不到 slug 就跳回首页
  if (!target) {
    const home = new URL(context.request.url);
    return Response.redirect(`${home.protocol}//${home.host}/`, 302);
  }

  // 记录点击到 KV（有 KV 才记录，没绑定也不报错）
  if (env.CLICKS) {
    try {
      const key = `click:${slug}:${new Date().toISOString().slice(0, 10)}`; // 按天统计
      const current = parseInt(await env.CLICKS.get(key) || '0');
      await env.CLICKS.put(key, String(current + 1), { expirationTtl: 60 * 60 * 24 * 90 }); // 保留90天
    } catch (e) {
      // KV 写失败不影响跳转
    }
  }

  return Response.redirect(target, 302);
}
