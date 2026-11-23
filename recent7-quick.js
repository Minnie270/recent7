// recent7-quick.js：對照用。只用一句話請 AI 寫的版本放這裡。
// 函式名稱一樣叫 recent7，輸入、輸出的格式跟 recent7.js 一樣（見 README.md）。

function recent7(records, today) {
  // 最近 7 天包含今天與前 6 天；用 UTC 計算日期，避免時區影響。
  var start = new Date(today + 'T00:00:00Z');
  start.setUTCDate(start.getUTCDate() - 6);
  var firstDay = start.toISOString().slice(0, 10);
  var result = { minutes: 0, count: 0 };

  records.forEach(function (record) {
    if (record.log_date >= firstDay && record.log_date <= today) {
      // 沒填分鐘數仍算一筆紀錄，分鐘數以 0 計。
      result.minutes += record.minutes == null ? 0 : record.minutes;
      result.count += 1;
    }
  });

  return result;
}
