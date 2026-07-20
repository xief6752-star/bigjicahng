const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'database.sqlite'));

const updates = {
  'review-bywave': '这是一家几乎不做营销的老牌机场，节点不花哨但 IPLC 专线极其稳定。适合不喜欢折腾、想要安安静静上网的长期主义者。',
  'review-cheap': '别被“9.9元1000G”的噱头骗了。深入揭秘低价机场的超售套路、晚高峰断流真相，以及为什么你迟早会为贪便宜买单。',
  'review-huanyuyun': '如果你是重度 Netflix/Disney+ 玩家，或者有特殊的小众地区节点需求，这家 BGP 中转能给你提供 20+ 个国家和地区的稳定解锁支持。',
  'review-rixcloud': '曾以极速著称但也曾陷入风波的争议之作。如今复活归来，晚高峰测速依然亮眼，但建议仅作为备用方案，切忌盲目年付。',
  'review-shunyun': '近期实测的一匹黑马，IPLC 专线质量扎实且月付门槛低。如果你预算有限又不想在高峰期忍受转圈缓冲，这是一个极具性价比的选择。',
  'review-wgetcloud': '我目前使用最久的主力机场。IEPL 专线接入，晚高峰 4K 视频秒开。价格偏中上，但在这个鱼龙混杂的圈子里，花钱买安心绝对值得。'
};

db.serialize(() => {
  for (const [slug, subtitle] of Object.entries(updates)) {
    db.run("UPDATE articles SET subtitle = ? WHERE slug = ?", [subtitle, slug]);
  }
});
console.log("Subtitles updated successfully.");
