const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const cheerio = require('cheerio');

const dbFile = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbFile);

const createTable = () => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run(`DROP TABLE IF EXISTS articles`);
            db.run(`
                CREATE TABLE articles (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    type TEXT,
                    slug TEXT UNIQUE,
                    title TEXT,
                    subtitle TEXT,
                    tag TEXT,
                    date TEXT,
                    score REAL,
                    content TEXT,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            `, (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    });
};

const insertArticle = (article) => {
    return new Promise((resolve, reject) => {
        const stmt = db.prepare(`INSERT INTO articles (type, slug, title, subtitle, tag, date, score, content) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);
        stmt.run(
            article.type, article.slug, article.title, article.subtitle, article.tag, article.date, article.score, article.content,
            (err) => {
                if (err) reject(err);
                else resolve();
            }
        );
        stmt.finalize();
    });
};

async function migrate() {
    try {
        await createTable();
        console.log("Table created.");

        const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html') && (f.startsWith('review-') || f.startsWith('tutorial-') || f.startsWith('post-')));

        for (const file of files) {
            const html = fs.readFileSync(path.join(__dirname, file), 'utf8');
            const $ = cheerio.load(html);

            const isReview = file.startsWith('review-') || file.startsWith('post-');
            const type = isReview ? 'review' : 'tutorial';
            const slug = file.replace('.html', '');

            const title = $('.art-title').html() || '';
            const subtitle = $('.art-subtitle').html() || $('.art-lead').html() || '';
            const tag = $('.rev-tag').text() || $('.plat-badge').text() || '';
            const dateStr = $('.art-date').text() || '';
            const score = parseFloat($('.score-num').text()) || 0;

            // Remove the header parts to get pure content
            $('.art-eyebrow').remove();
            $('.art-title').remove();
            $('.art-subtitle').remove();
            $('.art-lead').remove();

            const content = $('.article').html().trim();

            await insertArticle({
                type, slug, title, subtitle, tag, date: dateStr, score, content
            });
            console.log(`Migrated: ${file}`);
        }

        console.log("Migration completed successfully.");
    } catch (err) {
        console.error("Migration failed:", err);
    } finally {
        db.close();
    }
}

migrate();
