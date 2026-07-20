const http = require('http');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'database.sqlite'));

db.all("SELECT slug, title FROM articles", (err, rows) => {
  if (err) throw err;
  
  let promises = rows.map(row => {
    return new Promise((resolve) => {
      http.get(`http://localhost:3000/${row.slug}.html`, (res) => {
        resolve(`${res.statusCode === 200 ? '✅' : '❌'} ${row.title} (/${row.slug}.html) - HTTP ${res.statusCode}`);
      }).on('error', (e) => {
        resolve(`❌ ${row.title} (/${row.slug}.html) - Error: ${e.message}`);
      });
    });
  });

  Promise.all(promises).then(results => {
    console.log("Link Check Results:");
    results.forEach(r => console.log(r));
  });
});
