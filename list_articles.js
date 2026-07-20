const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'database.sqlite'));

db.all("SELECT id, type, slug, title, subtitle, date, is_pinned FROM articles ORDER BY created_at DESC", (err, rows) => {
  if (err) console.error(err);
  else {
    console.log("=== Articles ===");
    console.log(JSON.stringify(rows, null, 2));
  }
  db.close();
});
