const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(__dirname, 'public/uploads');
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });
const app = express();
const db = new sqlite3.Database(path.join(__dirname, 'database.sqlite'));
db.run(`CREATE TABLE IF NOT EXISTS ads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    link TEXT,
    sort_order INTEGER DEFAULT 0
)`, () => {
    // Attempt to add image_url column if it doesn't exist
    db.run("ALTER TABLE ads ADD COLUMN image_url TEXT", (err) => {});
});
db.run(`CREATE TABLE IF NOT EXISTS settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    key TEXT UNIQUE,
    value TEXT
)`, () => {
    db.get("SELECT count(*) as count FROM settings", (err, row) => {
        if (row && row.count === 0) {
            db.run(`INSERT INTO settings (key, value) VALUES ('hero_desc', '我是逼哥（李志的铁粉），这里是我自费购买、测试和长期使用的科学上网节点（机场）记录。没有恰饭，没有硬广，只有真实的速度测试和稳定的推荐。')`);
            db.run(`INSERT INTO settings (key, value) VALUES ('about_author', '李志歌迷，坐标华东。讨厌一切花里胡哨的营销。写评测是为了自己备忘，也是为了在这个充满恰饭广告的圈子里留一片干净的自留地。')`);
            db.run(`INSERT INTO settings (key, value) VALUES ('hero_quote', '世界会好吗？那些狗屁不如的青春。')`);
            db.run(`INSERT INTO settings (key, value) VALUES ('hero_quote_author', '李志《这个世界会好吗》')`);
            db.run(`INSERT INTO settings (key, value) VALUES ('hero_title_1', '不接推广。')`);
            db.run(`INSERT INTO settings (key, value) VALUES ('hero_title_2', '只说真话。')`);
        }
    });
});

const getSettings = () => new Promise(resolve => {
    db.all("SELECT * FROM settings", (err, rows) => {
        const s = {};
        if (rows) rows.forEach(r => s[r.key] = r.value);
        resolve(s);
    });
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'bige-airport-secret',
    resave: false,
    saveUninitialized: true
}));

// Mock login middleware
const requireAuth = (req, res, next) => {
    if (req.session.loggedIn) {
        next();
    } else {
        res.redirect('/admin/login');
    }
};

// ========================
// Frontend Routes
// ========================

app.get('/', async (req, res) => {
    const settings = await getSettings();
    db.all(`SELECT * FROM articles WHERE type='review' OR type='tutorial' OR type='knowledge' ORDER BY created_at DESC`, (err, articles) => {
        db.all(`SELECT * FROM ads ORDER BY sort_order ASC`, (err, ads) => {
            const pinnedArticles = articles.filter(a => a.is_pinned === 1);
            const reviews = articles.filter(a => a.type === 'review' && a.is_pinned !== 1).slice(0, 6);
            const tutorials = articles.filter(a => a.type === 'tutorial' && a.is_pinned !== 1);
            const knowledges = articles.filter(a => a.type === 'knowledge' && a.is_pinned !== 1);
            res.render('index', { pinnedArticles, reviews, tutorials, knowledges, ads: ads || [], settings });
        });
    });
});

app.get('/:slug.html', async (req, res) => {
    const settings = await getSettings();
    db.get(`SELECT * FROM articles WHERE slug = ?`, [req.params.slug], (err, article) => {
        if (err || !article) return res.status(404).send('Not Found');
        res.render('article', { article, settings });
    });
});

// ========================
// Admin Routes
// ========================

app.get('/admin/login', (req, res) => {
    res.render('admin/login');
});

app.post('/admin/login', (req, res) => {
    const { password } = req.body;
    if (password === 'bige123') { // Simple hardcoded password
        req.session.loggedIn = true;
        res.redirect('/admin');
    } else {
        res.render('admin/login', { error: '密码错误' });
    }
});

app.get('/admin', requireAuth, (req, res) => {
    db.all(`SELECT * FROM articles ORDER BY created_at DESC`, (err, articles) => {
        res.render('admin/index', { articles, buildSuccess: req.query.build === 'success' });
    });
});

app.get('/admin/edit/:id', requireAuth, (req, res) => {
    const id = req.params.id;
    if (id === 'new') {
        res.render('admin/edit', { article: {} });
    } else {
        db.get(`SELECT * FROM articles WHERE id = ?`, [id], (err, article) => {
            res.render('admin/edit', { article });
        });
    }
});

app.post('/admin/save', requireAuth, (req, res) => {
    const { id, type, slug, title, subtitle, tag, date, score, content, is_pinned } = req.body;
    const pinned = is_pinned ? 1 : 0;
    
    if (id) {
        db.run(`UPDATE articles SET type=?, slug=?, title=?, subtitle=?, tag=?, date=?, score=?, content=?, is_pinned=? WHERE id=?`,
            [type, slug, title, subtitle, tag, date, parseFloat(score) || 0, content, pinned, id],
            (err) => {
                res.redirect('/admin');
            });
    } else {
        db.run(`INSERT INTO articles (type, slug, title, subtitle, tag, date, score, content, is_pinned) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [type, slug, title, subtitle, tag, date, parseFloat(score) || 0, content, pinned],
            (err) => {
                res.redirect('/admin');
            });
    }
});

app.post('/admin/delete/:id', requireAuth, (req, res) => {
    db.run(`DELETE FROM articles WHERE id = ?`, [req.params.id], (err) => {
        res.redirect('/admin');
    });
});

app.get('/admin/ads', requireAuth, (req, res) => {
    db.all(`SELECT * FROM ads ORDER BY sort_order ASC`, (err, ads) => {
        res.render('admin/ads', { ads });
    });
});

app.get('/admin/ads/edit/:id', requireAuth, (req, res) => {
    const id = req.params.id;
    if (id === 'new') {
        res.render('admin/ad_edit', { ad: {} });
    } else {
        db.get(`SELECT * FROM ads WHERE id = ?`, [id], (err, ad) => {
            res.render('admin/ad_edit', { ad });
        });
    }
});

app.post('/admin/ads/save', requireAuth, upload.single('image_file'), (req, res) => {
    const { id, title, link, sort_order } = req.body;
    let final_image_url = req.body.image_url;
    if (req.file) {
        final_image_url = '/uploads/' + req.file.filename;
    }
    if (id) {
        db.run(`UPDATE ads SET title=?, link=?, image_url=?, sort_order=? WHERE id=?`, [title, link, final_image_url, parseInt(sort_order)||0, id], () => res.redirect('/admin/ads'));
    } else {
        db.run(`INSERT INTO ads (title, link, image_url, sort_order) VALUES (?, ?, ?, ?)`, [title, link, final_image_url, parseInt(sort_order)||0], () => res.redirect('/admin/ads'));
    }
});

app.post('/admin/ads/delete/:id', requireAuth, (req, res) => {
    db.run(`DELETE FROM ads WHERE id = ?`, [req.params.id], () => res.redirect('/admin/ads'));
});

app.get('/admin/settings', requireAuth, async (req, res) => {
    const settings = await getSettings();
    res.render('admin/settings', { settings });
});

app.post('/admin/settings/save', requireAuth, (req, res) => {
    const { hero_desc, about_author, hero_quote, hero_quote_author, hero_title_1, hero_title_2, tracking_code } = req.body;
    db.serialize(() => {
        db.run(`INSERT OR REPLACE INTO settings (id, key, value) VALUES ((SELECT id FROM settings WHERE key='hero_title_1'), 'hero_title_1', ?)`, [hero_title_1]);
        db.run(`INSERT OR REPLACE INTO settings (id, key, value) VALUES ((SELECT id FROM settings WHERE key='hero_title_2'), 'hero_title_2', ?)`, [hero_title_2]);
        db.run(`INSERT OR REPLACE INTO settings (id, key, value) VALUES ((SELECT id FROM settings WHERE key='hero_desc'), 'hero_desc', ?)`, [hero_desc]);
        db.run(`INSERT OR REPLACE INTO settings (id, key, value) VALUES ((SELECT id FROM settings WHERE key='about_author'), 'about_author', ?)`, [about_author]);
        db.run(`INSERT OR REPLACE INTO settings (id, key, value) VALUES ((SELECT id FROM settings WHERE key='hero_quote'), 'hero_quote', ?)`, [hero_quote]);
        db.run(`INSERT OR REPLACE INTO settings (id, key, value) VALUES ((SELECT id FROM settings WHERE key='hero_quote_author'), 'hero_quote_author', ?)`, [hero_quote_author]);
        db.run(`INSERT OR REPLACE INTO settings (id, key, value) VALUES ((SELECT id FROM settings WHERE key='tracking_code'), 'tracking_code', ?)`, [tracking_code]);
    });
    res.redirect('/admin/settings');
});

// ========================
// Static Site Generator
// ========================
app.post('/admin/build', requireAuth, async (req, res) => {
    const outDir = path.join(__dirname, 'public');
    if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir);
    }

    try {
        const articles = await new Promise((resolve, reject) => {
            db.all(`SELECT * FROM articles ORDER BY created_at DESC`, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        const pinnedArticles = articles.filter(a => a.is_pinned === 1);
        const reviews = articles.filter(a => a.type === 'review' && a.is_pinned !== 1).slice(0, 6);
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

        // Render article pages
        for (const article of articles) {
            const articleHtml = await ejs.renderFile(path.join(__dirname, 'views/article.ejs'), { article, settings });
            fs.writeFileSync(path.join(outDir, `${article.slug}.html`), articleHtml);
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
        
        const robotsTxt = `User-agent: *\nAllow: /\n\nSitemap: ${domain}/sitemap.xml\n`;
        fs.writeFileSync(path.join(outDir, 'robots.txt'), robotsTxt);

        res.redirect('/admin?build=success');
    } catch (err) {
        console.error(err);
        res.status(500).send('Build failed: ' + err.message);
    }
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
