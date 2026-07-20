const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');

const db = new sqlite3.Database(path.join(__dirname, 'database.sqlite'));
const outDir = path.join(__dirname, 'public');

const getSettings = () => new Promise(resolve => {
    db.all("SELECT * FROM settings", (err, rows) => {
        const s = {};
        if (rows) rows.forEach(r => s[r.key] = r.value);
        resolve(s);
    });
});

async function build() {
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

    const indexHtml = await ejs.renderFile(path.join(__dirname, 'views/index.ejs'), { pinnedArticles, reviews, tutorials, knowledges, ads, settings });
    fs.writeFileSync(path.join(outDir, 'index.html'), indexHtml);
    console.log("Built index.html successfully.");
}

build();
