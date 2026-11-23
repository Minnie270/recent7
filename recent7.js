// recent7.js：照 rules.md 寫的版本
// 輸入：records＝一串紀錄，每筆像 { log_date: '2026-11-23', minutes: 30 }（minutes 可能是 null）
//       today＝今天的日期，例如 '2026-11-23'
// 輸出：{ minutes: 總共幾分鐘, count: 幾筆 }
// 格式說明在 README.md；要怎麼算看 rules.md。

function recent7(records, today) {
  const todayTime = Date.parse(today + 'T00:00:00Z');
  const firstDayTime = todayTime - 6 * 24 * 60 * 60 * 1000;
  let minutes = 0;
  let count = 0;

  for (const record of records) {
    const recordTime = Date.parse(record.log_date + 'T00:00:00Z');
    if (recordTime < firstDayTime || recordTime > todayTime) {
      continue;
    }

    count += 1;
    if (typeof record.minutes === 'number' &&
        Number.isFinite(record.minutes) && record.minutes > 0) {
      minutes += Math.ceil(record.minutes / 30) * 30;
    }
  }

  return { minutes: minutes, count: count };
}
