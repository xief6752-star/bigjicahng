// indexnow_push.js
// 向 IndexNow API 推送站点 URL，通知 Bing / Yahoo / Seznam 等搜索引擎抓取更新。
//
// 作为 CLI 使用：
//   node indexnow_push.js               -> 推送全站所有文章 + 首页
//   node indexnow_push.js a.html b.html -> 只推送指定的 URL（相对路径，相对于 DOMAIN）
//
// 作为模块使用（例如在 build_all.js 里自动触发）：
//   const { pushToIndexNow } = require('./indexnow_push');
//   await pushToIndexNow(['https://chinabigai.com/', 'https://chinabigai.com/foo.html']);

const DOMAIN = 'https://chinabigai.com';
const INDEXNOW_KEY = 'bd6cc2252abac9d4dfe0858c950681bb';
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

async function pushToIndexNow(urlList) {
    if (!urlList || !urlList.length) {
        console.log('[IndexNow] 没有要推送的 URL。');
        return;
    }

    const body = {
        host: DOMAIN.replace(/^https?:\/\//, ''),
        key: INDEXNOW_KEY,
        keyLocation: `${DOMAIN}/${INDEXNOW_KEY}.txt`,
        urlList,
    };

    console.log(`[IndexNow] 准备推送 ${urlList.length} 个 URL...`);

    try {
        const res = await fetch(INDEXNOW_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            body: JSON.stringify(body),
        });

        // IndexNow 成功时通常返回 200 或 202
        if (res.ok) {
            console.log(`[IndexNow] 推送成功，状态码 ${res.status}`);
        } else {
            const text = await res.text().catch(() => '');
            console.error(`[IndexNow] 推送失败，状态码 ${res.status}：${text}`);
        }
    } catch (err) {
        // 网络问题不应该让整个构建流程失败，只记录错误
        console.error('[IndexNow] 推送请求出错:', err.message);
    }
}

async function main() {
    const sqlite3 = require('sqlite3').verbose();
    const path = require('path');
    const db = new sqlite3.Database(path.join(__dirname, 'database.sqlite'));

    const getAllArticleSlugs = () => new Promise((resolve, reject) => {
        db.all('SELECT slug FROM articles', (err, rows) => {
            if (err) reject(err);
            else resolve(rows.map(r => r.slug));
        });
    });

    const args = process.argv.slice(2);
    let urlList;

    if (args.length > 0) {
        urlList = args.map(p => `${DOMAIN}/${p.replace(/^\//, '')}`);
    } else {
        const slugs = await getAllArticleSlugs();
        urlList = [`${DOMAIN}/`, ...slugs.map(slug => `${DOMAIN}/${slug}.html`)];
    }

    await pushToIndexNow(urlList);
    db.close();
}

module.exports = { pushToIndexNow, DOMAIN, INDEXNOW_KEY };

if (require.main === module) {
    main().catch(err => {
        console.error('[IndexNow] 执行失败:', err);
        process.exit(1);
    });
}
