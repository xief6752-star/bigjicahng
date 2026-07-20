const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'database.sqlite'));

const linkAndPackage = `
        <h2>官网链接与套餐价格</h2>
        <p><strong>官方直达：</strong> <a href="https://VIP1.huanyuyunbest.com/#/register?code=CPBmzXgk" target="_blank" rel="noopener noreferrer" style="color: #c0392b; font-weight: bold; text-decoration: underline;">点击前往寰宇云官网 (含 78 折开业优惠)</a></p>
        <table>
            <thead>
                <tr>
                    <th>套餐类型</th>
                    <th>月流量</th>
                    <th>折算均价</th>
                    <th>适用人群</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>基础入门 (年付)</td>
                    <td>200GB</td>
                    <td>约 ¥17/月</td>
                    <td>轻度查资料、偶尔看视频</td>
                </tr>
                <tr>
                    <td>标准进阶 (月付/年付)</td>
                    <td>500GB</td>
                    <td>约 ¥25/月</td>
                    <td>重度流媒体爱好者 (主力推荐)</td>
                </tr>
                <tr>
                    <td>尊享大户 (月付/年付)</td>
                    <td>1000GB+</td>
                    <td>约 ¥40/月</td>
                    <td>团队共享或重度下载用户</td>
                </tr>
            </tbody>
        </table>
        <p><em>注：升级全线专线后，寰宇云并未大幅涨价，仍然维持了极高的性价比。支持支付宝与 USDT 付款。</em></p>
`;

db.get("SELECT content FROM articles WHERE slug='huanyuyun-upgrade-2026'", (err, row) => {
    if (row) {
        let newContent = row.content;
        if (!newContent.includes('官网链接与套餐价格')) {
            newContent = newContent.replace('<h2>晚高峰 4K 秒开实测</h2>', linkAndPackage + '\n        <h2>晚高峰 4K 秒开实测</h2>');
            db.run("UPDATE articles SET content = ? WHERE slug='huanyuyun-upgrade-2026'", [newContent], (err) => {
                if (err) console.error(err);
                else console.log('Successfully updated article content.');
            });
        }
    }
});
