const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');
const cheerio = require('cheerio');

const db = new sqlite3.Database(path.join(__dirname, 'database.sqlite'));
const xmlFilePath = path.join('/Users/mac/.gemini/antigravity/scratch', 'outsideweb-wp-import.xml');

// Process EJS/CSS blocks to standard inline-styled HTML for WordPress
function processHtmlForWordPress(html, score) {
    if (!html) return '';
    const $ = cheerio.load(`<div>${html}</div>`, { decodeEntities: false });
    const root = $('div').first();

    // 1. Process Score Bar into a beautiful premium inline-styled HTML table
    root.find('.score-bar').each((i, elem) => {
        const scoreNum = $(elem).find('.score-num').text().trim() || score || '0';
        
        let tableHtml = `
<div style="background: #1a1a1a; color: #ffffff; border-radius: 8px; padding: 24px; margin-bottom: 32px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    <div style="display: flex; align-items: center; flex-wrap: wrap; gap: 24px;">
        <div style="text-align: center; min-width: 100px;">
            <div style="font-size: 3rem; font-weight: bold; line-height: 1; color: #ffffff;">${scoreNum}</div>
            <div style="font-size: 0.8rem; color: #888888; margin-top: 4px; text-transform: uppercase; letter-spacing: 1px;">综合评分</div>
        </div>
        <div style="width: 1px; height: 50px; background: #333333; display: inline-block;"></div>
        <div style="flex: 1; display: flex; gap: 20px; flex-wrap: wrap;">
        `;

        $(elem).find('.score-item').each((j, item) => {
            const val = $(item).find('.score-item-val').text().trim();
            const label = $(item).find('.score-item-label').text().trim();
            if (val && label) {
                tableHtml += `
            <div style="min-width: 80px;">
                <div style="font-size: 1.2rem; font-weight: bold; color: #ffffff;">${val}</div>
                <div style="font-size: 0.75rem; color: #666666; margin-top: 2px;">${label}</div>
            </div>
                `;
            }
        });

        tableHtml += `
        </div>
    </div>
</div>
<hr style="border: 0; height: 1px; background: #e0ddd5; margin: 32px 0;" />
        `;
        $(elem).replaceWith(tableHtml);
    });

    // 2. Remove Lyric Blocks completely
    root.find('.lyric-block').remove();

    // 3. Process Tip/Warn/Danger Blocks
    const callouts = [
        { cls: 'tip', border: '#1a1a1a', bg: '#f9f9f9', title: '💡 提示', color: '#333333' },
        { cls: 'warn', border: '#d4a017', bg: '#fffbf0', title: '⚠️ 警告', color: '#666666' },
        { cls: 'danger', border: '#c0392b', bg: '#fff5f5', title: '🚫 危险', color: '#555555' }
    ];

    callouts.forEach(c => {
        root.find(`.${c.cls}`).each((i, elem) => {
            const innerHtml = $(elem).html().trim();
            const boxHtml = `
<div style="background: ${c.bg}; border-left: 4px solid ${c.border}; border-radius: 4px; padding: 16px 20px; margin: 24px 0; font-size: 0.9rem; line-height: 1.8; color: ${c.color};">
    <strong style="color: #1a1a1a; display: block; margin-bottom: 6px;">${c.title}</strong>
    <div>${innerHtml}</div>
</div>
            `;
            $(elem).replaceWith(boxHtml);
        });
    });

    // 4. Process Tables
    root.find('table').each((i, elem) => {
        $(elem).attr('style', 'width: 100%; border-collapse: collapse; margin: 24px 0; font-size: 0.9rem;');
        $(elem).find('th').attr('style', 'border-bottom: 2px solid #1a1a1a; text-align: left; padding: 12px 8px; font-weight: bold;');
        $(elem).find('td').attr('style', 'border-bottom: 1px solid #e0ddd5; padding: 12px 8px; color: #444444;');
    });

    // 5. Process general inline code blocks
    root.find('code').each((i, elem) => {
        if (!$(elem).parent().is('pre')) {
            $(elem).attr('style', 'font-family: monospace; background: #eeeeee; padding: 2px 6px; border-radius: 3px; font-size: 0.85em; color: #c7254e;');
        }
    });

    // 6. Process code blocks (pre)
    root.find('.code-block').each((i, elem) => {
        $(elem).attr('style', 'background: #1e1e1e; color: #cdd3de; border-radius: 6px; padding: 16px 20px; font-family: monospace; font-size: 0.9rem; line-height: 1.6; overflow-x: auto; margin: 20px 0;');
    });

    return root.html().trim();
}

db.all("SELECT * FROM articles WHERE type = 'review' OR slug = 'post-2026-best'", (err, rows) => {
    if (err) {
        console.error("Database error:", err);
        db.close();
        return;
    }

    let xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0"
	xmlns:excerpt="http://wordpress.org/export/1.2/excerpt/"
	xmlns:content="http://purl.org/rss/1.0/modules/content/"
	xmlns:wfw="http://wellformedweb.org/commentAPI/"
	xmlns:dc="http://purl.org/dc/elements/1.1/"
	xmlns:wp="http://wordpress.org/export/1.2/"
>
<channel>
	<title>big博客出站评测导出</title>
	<link>https://bigjichang.com</link>
	<description>从 bigjichang 导出的 WordPress 导入文件</description>
	<pubDate>Sun, 24 May 2026 23:09:50 +0800</pubDate>
	<language>zh-CN</language>
	<wp:wxr_version>1.2</wp:wxr_version>
	<wp:base_site_url>https://bigjichang.com</wp:base_site_url>
	<wp:base_blog_url>https://bigjichang.com</wp:base_blog_url>
`;

    rows.forEach((row, index) => {
        const processedContent = processHtmlForWordPress(row.content, row.score);
        const cleanTitle = row.title.replace(/<br\s*\/?>/gi, ' ').replace(/<\/?[^>]+(>|$)/g, "").trim();
        const cleanSubtitle = row.subtitle ? row.subtitle.trim().replace(/<\/?[^>]+(>|$)/g, "") : '';
        const postId = 2000 + index;

        xml += `
	<item>
		<title><![CDATA[${cleanTitle}]]></title>
		<link>https://bigjichang.com/${row.slug}.html</link>
		<pubDate>Sun, 24 May 2026 00:00:00 +0800</pubDate>
		<dc:creator><![CDATA[admin]]></dc:creator>
		<guid isPermaLink="false">https://bigjichang.com/?p=${postId}</guid>
		<description></description>
		<content:encoded><![CDATA[${processedContent}]]></content:encoded>
		<excerpt:encoded><![CDATA[${cleanSubtitle}]]></excerpt:encoded>
		<wp:post_id>${postId}</wp:post_id>
		<wp:post_date><![CDATA[${row.date} 08:00:00]]></wp:post_date>
		<wp:post_date_gmt><![CDATA[${row.date} 00:00:00]]></wp:post_date_gmt>
		<wp:comment_status><![CDATA[open]]></wp:comment_status>
		<wp:ping_status><![CDATA[open]]></wp:ping_status>
		<wp:post_name><![CDATA[${row.slug}]]></wp:post_name>
		<wp:status><![CDATA[publish]]></wp:status>
		<wp:post_parent>0</wp:post_parent>
		<wp:menu_order>0</wp:menu_order>
		<wp:post_type><![CDATA[post]]></wp:post_type>
		<wp:post_password><![CDATA[]]></wp:post_password>
		<wp:is_sticky>0</wp:is_sticky>
		<category domain="category" nicename="airport-reviews"><![CDATA[机场评测]]></category>
		<category domain="post_tag" nicename="${encodeURIComponent(row.tag)}"><![CDATA[${row.tag}]]></category>
		<wp:postmeta>
			<wp:meta_key><![CDATA[score]]></wp:meta_key>
			<wp:meta_value><![CDATA[${row.score || ''}]]></wp:meta_value>
		</wp:postmeta>
		<wp:postmeta>
			<wp:meta_key><![CDATA[subtitle]]></wp:meta_key>
			<wp:meta_value><![CDATA[${cleanSubtitle}]]></wp:meta_value>
		</wp:postmeta>
	</item>`;
    });

    xml += `
</channel>
</rss>`;

    fs.writeFileSync(xmlFilePath, xml, 'utf8');
    console.log(`=== Export complete! Standard WordPress WXR XML created at: ${xmlFilePath} ===`);
    db.close();
});
