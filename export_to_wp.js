const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');
const cheerio = require('cheerio');

const db = new sqlite3.Database(path.join(__dirname, 'database.sqlite'));
const outDir = path.join('/Users/mac/.gemini/antigravity/scratch', 'outsideweb-wp-posts');

if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

function cleanHtmlToMarkdown(html, score) {
    if (!html) return '';
    const $ = cheerio.load(`<div>${html}</div>`, { decodeEntities: false });
    const root = $('div').first();

    // 1. Process Score Bar
    root.find('.score-bar').each((i, elem) => {
        const scoreNum = $(elem).find('.score-num').text().trim() || score || '0';
        let scoreMd = `### 📊 综合评测得分: **${scoreNum} / 10**\n\n`;
        
        const items = [];
        $(elem).find('.score-item').each((j, item) => {
            const val = $(item).find('.score-item-val').text().trim();
            const label = $(item).find('.score-item-label').text().trim();
            if (val && label) {
                items.push(`| ${label} | **${val}** |`);
            }
        });

        if (items.length > 0) {
            scoreMd += `| 评测维度 | 评分/指标 |\n| --- | --- |\n` + items.join('\n') + `\n\n---\n\n`;
        } else {
            scoreMd += `\n---\n\n`;
        }
        $(elem).replaceWith(scoreMd);
    });

    // 2. Process Lyric Blocks
    root.find('.lyric-block').each((i, elem) => {
        const cite = $(elem).find('cite').text().trim();
        $(elem).find('cite').remove();
        const lyricText = $(elem).text().trim().replace(/\n/g, ' ');
        let lyricMd = `> **李志歌词寄语：**\n> "${lyricText}"\n`;
        if (cite) {
            lyricMd += `> *${cite}*\n\n`;
        } else {
            lyricMd += `\n`;
        }
        $(elem).replaceWith(lyricMd);
    });

    // 3. Process Tip/Warn/Danger Blocks
    const calloutClasses = ['tip', 'warn', 'danger'];
    calloutClasses.forEach(cls => {
        root.find(`.${cls}`).each((i, elem) => {
            const text = $(elem).text().trim();
            const label = cls === 'tip' ? '💡 提示' : cls === 'warn' ? '⚠️ 警告' : '🚫 危险';
            $(elem).replaceWith(`> **${label}**\n> ${text}\n\n`);
        });
    });

    // 4. Process Steps (for tutorials)
    root.find('.steps').each((i, elem) => {
        let stepsMd = '';
        $(elem).find('.step').each((j, step) => {
            const num = $(step).find('.step-num').text().trim() || `0${j+1}`;
            const title = $(step).find('.step-title').text().trim();
            const desc = $(step).find('.step-desc').text().trim() || $(step).find('.step-content').text().trim();
            stepsMd += `### ${num} ${title}\n${desc}\n\n`;
        });
        $(elem).replaceWith(stepsMd);
    });

    // 5. Process general tags recursively
    function nodeToMarkdown(node) {
        let md = '';
        
        node.contents().each((i, child) => {
            if (child.type === 'text') {
                md += child.data;
            } else if (child.type === 'tag') {
                const tag = child.name;
                const childNode = $(child);
                const innerMd = nodeToMarkdown(childNode);

                switch (tag) {
                    case 'h2':
                        md += `\n\n## ${innerMd.trim()}\n\n`;
                        break;
                    case 'h3':
                        md += `\n\n### ${innerMd.trim()}\n\n`;
                        break;
                    case 'p':
                        md += `\n\n${innerMd.trim()}\n\n`;
                        break;
                    case 'strong':
                    case 'b':
                        md += `**${innerMd.trim()}**`;
                        break;
                    case 'em':
                    case 'i':
                        md += `*${innerMd.trim()}*`;
                        break;
                    case 'code':
                        md += ` \`${innerMd.trim()}\` `;
                        break;
                    case 'pre':
                    case 'div':
                        if (childNode.hasClass('code-block') || childNode.hasClass('warn') || childNode.hasClass('tip') || childNode.hasClass('danger')) {
                            // Already handled or special blocks
                            md += `\n\n${innerMd.trim()}\n\n`;
                        } else {
                            md += `\n${innerMd}\n`;
                        }
                        break;
                    case 'ul':
                        md += `\n${innerMd}\n`;
                        break;
                    case 'ol':
                        md += `\n${innerMd}\n`;
                        break;
                    case 'li':
                        md += `* ${innerMd.trim()}\n`;
                        break;
                    case 'table':
                        let tableMd = '\n\n';
                        const rows = [];
                        childNode.find('tr').each((ri, tr) => {
                            const cols = [];
                            $(tr).find('th, td').each((ci, td) => {
                                cols.push($(td).text().trim().replace(/\|/g, '\\|'));
                            });
                            if (cols.length > 0) rows.push(cols);
                        });
                        if (rows.length > 0) {
                            tableMd += '| ' + rows[0].join(' | ') + ' |\n';
                            tableMd += '| ' + rows[0].map(() => '---').join(' | ') + ' |\n';
                            for (let r = 1; r < rows.length; r++) {
                                tableMd += '| ' + rows[r].join(' | ') + ' |\n';
                            }
                        }
                        md += tableMd + '\n\n';
                        break;
                    case 'a':
                        const href = childNode.attr('href') || '#';
                        md += ` [${innerMd.trim()}](${href}) `;
                        break;
                    case 'br':
                        md += '\n';
                        break;
                    default:
                        md += innerMd;
                }
            }
        });
        return md;
    }

    let finalMd = nodeToMarkdown(root);

    // Unescape HTML entities & Cleanups
    finalMd = finalMd.replace(/&ldquo;/g, '“').replace(/&rdquo;/g, '”')
                     .replace(/&lsquo;/g, '‘').replace(/&rsquo;/g, '’')
                     .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&')
                     .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
                     .replace(/&quot;/g, '"');
    
    // Clean up empty lines and spaces
    finalMd = finalMd.replace(/ \n/g, '\n').replace(/\n /g, '\n');
    finalMd = finalMd.replace(/\n{3,}/g, '\n\n').trim();

    return finalMd;
}

db.all("SELECT * FROM articles WHERE type = 'review' OR slug = 'post-2026-best'", (err, rows) => {
    if (err) {
        console.error("Database error:", err);
        db.close();
        return;
    }

    rows.forEach(row => {
        const mdContent = cleanHtmlToMarkdown(row.content, row.score);
        
        // WordPress front matter style
        let fileContent = `---\ntitle: "${row.title.replace(/<br\s*\/?>/gi, ' ').replace(/<\/?[^>]+(>|$)/g, "")}"\n`;
        fileContent += `subtitle: "${row.subtitle ? row.subtitle.trim().replace(/"/g, '\\"') : ''}"\n`;
        fileContent += `date: ${row.date}\n`;
        fileContent += `tags: ["${row.tag}"]\n`;
        fileContent += `slug: "${row.slug}"\n`;
        if (row.score) fileContent += `score: ${row.score}\n`;
        fileContent += `---\n\n`;
        fileContent += mdContent;

        const filename = `${row.slug}.md`;
        fs.writeFileSync(path.join(outDir, filename), fileContent);
        console.log(`Exported WP post: ${filename}`);
    });

    console.log(`=== Export complete! All posts written to ${outDir} ===`);
    db.close();
});
