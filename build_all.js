const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');

const db = new sqlite3.Database(path.join(__dirname, 'database.sqlite'));
const outDir = path.join(__dirname, 'public');

if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

const getSettings = () => new Promise(resolve => {
    db.all("SELECT * FROM settings", (err, rows) => {
        const s = {};
        if (rows) rows.forEach(r => s[r.key] = r.value);
        resolve(s);
    });
});

async function buildAll() {
    try {
        const articles = await new Promise((resolve, reject) => {
            db.all(`SELECT * FROM articles ORDER BY created_at DESC`, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        const pinnedArticles = articles.filter(a => a.is_pinned === 1);
        const reviews = articles.filter(a => a.type === 'review' && a.is_pinned !== 1);
        const tutorials = articles.filter(a => a.type === 'tutorial' && a.is_pinned !== 1);
        const knowledges = articles.filter(a => a.type === 'knowledge' && a.is_pinned !== 1);

        const ads = await new Promise((resolve, reject) => {
            db.all(`SELECT * FROM ads ORDER BY sort_order ASC`, (err, rows) => {
                if (err) resolve([]);
                else resolve(rows);
            });
        });

        const settings = await getSettings();

        // Render index.html
        const indexHtml = await ejs.renderFile(path.join(__dirname, 'views/index.ejs'), { pinnedArticles, reviews, tutorials, knowledges, ads, settings });
        fs.writeFileSync(path.join(outDir, 'index.html'), indexHtml);
        console.log("Built index.html successfully.");

        // Render article pages
        for (const article of articles) {
            const articleHtml = await ejs.renderFile(path.join(__dirname, 'views/article.ejs'), { article, settings });
            fs.writeFileSync(path.join(outDir, `${article.slug}.html`), articleHtml);
            console.log(`Built ${article.slug}.html successfully.`);
        }

        // Generate Sitemap & Robots.txt
        const domain = 'https://bigjichang.com';
        let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
        sitemapXml += `  <url><loc>${domain}/</loc><changefreq>daily</changefreq><priority>1.0</priority></url>\n`;
        for (const article of articles) {
            sitemapXml += `  <url><loc>${domain}/${article.slug}.html</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>\n`;
        }
        sitemapXml += `</urlset>`;
        fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemapXml);
        console.log("Built sitemap.xml successfully.");
        
        const robotsTxt = `User-agent: *\nAllow: /\n\nSitemap: ${domain}/sitemap.xml\n`;
        fs.writeFileSync(path.join(outDir, 'robots.txt'), robotsTxt);
        console.log("Built robots.txt successfully.");

        console.log("=== All files compiled successfully! ===");
    } catch (err) {
        console.error("Build failed:", err);
    } finally {
        db.close();
    }
}

buildAll();
