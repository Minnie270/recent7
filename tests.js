// 每條測試呼叫一次 addCase；預期結果依 rules.md 填寫。

addCase({
  name: '規則 1：今天的紀錄要計入',
  today: '2026-11-23',
  records: [{ log_date: '2026-11-23', minutes: 30 }],
  expect: { minutes: 30, count: 1 }
});

addCase({
  name: '規則 1：前 6 天的紀錄要計入',
  today: '2026-11-23',
  records: [{ log_date: '2026-11-17', minutes: 30 }],
  expect: { minutes: 30, count: 1 }
});

addCase({
  name: '規則 1：前 7 天的紀錄不計入',
  today: '2026-11-23',
  records: [{ log_date: '2026-11-16', minutes: 30 }],
  expect: { minutes: 0, count: 0 }
});

addCase({
  name: '規則 1：未來的紀錄不計入',
  today: '2026-11-23',
  records: [{ log_date: '2026-11-24', minutes: 30 }],
  expect: { minutes: 0, count: 0 }
});

addCase({
  name: '規則 1：今天和前 6 天共 7 天全部計入',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-17', minutes: 30 },
    { log_date: '2026-11-18', minutes: 30 },
    { log_date: '2026-11-19', minutes: 30 },
    { log_date: '2026-11-20', minutes: 30 },
    { log_date: '2026-11-21', minutes: 30 },
    { log_date: '2026-11-22', minutes: 30 },
    { log_date: '2026-11-23', minutes: 30 }
  ],
  expect: { minutes: 210, count: 7 }
});

addCase({
  name: '規則 1：跨月仍只計入今天和前 6 天',
  today: '2026-12-03',
  records: [
    { log_date: '2026-11-26', minutes: 90 },
    { log_date: '2026-11-27', minutes: 30 },
    { log_date: '2026-12-03', minutes: 60 },
    { log_date: '2026-12-04', minutes: 120 }
  ],
  expect: { minutes: 90, count: 2 }
});

addCase({
  name: '規則 1：跨年仍只計入今天和前 6 天',
  today: '2027-01-03',
  records: [
    { log_date: '2026-12-27', minutes: 90 },
    { log_date: '2026-12-28', minutes: 30 },
    { log_date: '2027-01-03', minutes: 60 },
    { log_date: '2027-01-04', minutes: 120 }
  ],
  expect: { minutes: 90, count: 2 }
});

addCase({
  name: '規則 1：閏年跨 2 月時也按實際日期計算',
  today: '2024-03-06',
  records: [
    { log_date: '2024-02-28', minutes: 90 },
    { log_date: '2024-02-29', minutes: 30 },
    { log_date: '2024-03-06', minutes: 60 }
  ],
  expect: { minutes: 90, count: 2 }
});

addCase({
  name: '規則 2：同一天內容相同的多筆紀錄也分開計數',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-23', minutes: 30 },
    { log_date: '2026-11-23', minutes: 30 }
  ],
  expect: { minutes: 60, count: 2 }
});

addCase({
  name: '規則 2：範圍內不同日期的紀錄各算 1 筆',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-18', minutes: 30 },
    { log_date: '2026-11-20', minutes: 60 },
    { log_date: '2026-11-22', minutes: 90 }
  ],
  expect: { minutes: 180, count: 3 }
});

addCase({
  name: '規則 3：1 分鐘進位成 30 分鐘',
  today: '2026-11-23',
  records: [{ log_date: '2026-11-23', minutes: 1 }],
  expect: { minutes: 30, count: 1 }
});

addCase({
  name: '規則 3：30 分鐘保持 30 分鐘',
  today: '2026-11-23',
  records: [{ log_date: '2026-11-23', minutes: 30 }],
  expect: { minutes: 30, count: 1 }
});

addCase({
  name: '規則 3：31 分鐘進位成 60 分鐘',
  today: '2026-11-23',
  records: [{ log_date: '2026-11-23', minutes: 31 }],
  expect: { minutes: 60, count: 1 }
});

addCase({
  name: '規則 3：50 分鐘進位成 60 分鐘',
  today: '2026-11-23',
  records: [{ log_date: '2026-11-23', minutes: 50 }],
  expect: { minutes: 60, count: 1 }
});

addCase({
  name: '規則 3：60 分鐘保持 60 分鐘',
  today: '2026-11-23',
  records: [{ log_date: '2026-11-23', minutes: 60 }],
  expect: { minutes: 60, count: 1 }
});

addCase({
  name: '規則 3：小數 0.5 分鐘進位成 30 分鐘',
  today: '2026-11-23',
  records: [{ log_date: '2026-11-23', minutes: 0.5 }],
  expect: { minutes: 30, count: 1 }
});

addCase({
  name: '規則 3：小數 30.1 分鐘進位成 60 分鐘',
  today: '2026-11-23',
  records: [{ log_date: '2026-11-23', minutes: 30.1 }],
  expect: { minutes: 60, count: 1 }
});

addCase({
  name: '規則 3：兩筆各 20 分鐘先各自進位再加總成 60 分鐘',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-23', minutes: 20 },
    { log_date: '2026-11-23', minutes: 20 }
  ],
  expect: { minutes: 60, count: 2 }
});

addCase({
  name: '規則 4：0 分鐘保持 0 分鐘且仍算 1 筆',
  today: '2026-11-23',
  records: [{ log_date: '2026-11-23', minutes: 0 }],
  expect: { minutes: 0, count: 1 }
});

addCase({
  name: '規則 4：null 算 0 分鐘且仍算 1 筆',
  today: '2026-11-23',
  records: [{ log_date: '2026-11-23', minutes: null }],
  expect: { minutes: 0, count: 1 }
});

addCase({
  name: '規則 4：缺少 minutes 算 0 分鐘且仍算 1 筆',
  today: '2026-11-23',
  records: [{ log_date: '2026-11-23' }],
  expect: { minutes: 0, count: 1 }
});

addCase({
  name: '規則 4：undefined 算 0 分鐘且仍算 1 筆',
  today: '2026-11-23',
  records: [{ log_date: '2026-11-23', minutes: undefined }],
  expect: { minutes: 0, count: 1 }
});

addCase({
  name: '規則 4：數字字串不轉成數字，算 0 分鐘且仍算 1 筆',
  today: '2026-11-23',
  records: [{ log_date: '2026-11-23', minutes: '20' }],
  expect: { minutes: 0, count: 1 }
});

addCase({
  name: '規則 4：一般文字算 0 分鐘且仍算 1 筆',
  today: '2026-11-23',
  records: [{ log_date: '2026-11-23', minutes: '沒有填' }],
  expect: { minutes: 0, count: 1 }
});

addCase({
  name: '規則 4：空字串算 0 分鐘且仍算 1 筆',
  today: '2026-11-23',
  records: [{ log_date: '2026-11-23', minutes: '' }],
  expect: { minutes: 0, count: 1 }
});

addCase({
  name: '規則 4：布林值算 0 分鐘且仍算 1 筆',
  today: '2026-11-23',
  records: [{ log_date: '2026-11-23', minutes: true }],
  expect: { minutes: 0, count: 1 }
});

addCase({
  name: '規則 4：陣列算 0 分鐘且仍算 1 筆',
  today: '2026-11-23',
  records: [{ log_date: '2026-11-23', minutes: [20] }],
  expect: { minutes: 0, count: 1 }
});

addCase({
  name: '規則 4：物件算 0 分鐘且仍算 1 筆',
  today: '2026-11-23',
  records: [{ log_date: '2026-11-23', minutes: {} }],
  expect: { minutes: 0, count: 1 }
});

addCase({
  name: '規則 4：負數 -20 算 0 分鐘且仍算 1 筆',
  today: '2026-11-23',
  records: [{ log_date: '2026-11-23', minutes: -20 }],
  expect: { minutes: 0, count: 1 }
});

addCase({
  name: '規則 4：負數 -40 算 0 分鐘且仍算 1 筆',
  today: '2026-11-23',
  records: [{ log_date: '2026-11-23', minutes: -40 }],
  expect: { minutes: 0, count: 1 }
});

addCase({
  name: '規則 4：NaN 算 0 分鐘且仍算 1 筆',
  today: '2026-11-23',
  records: [{ log_date: '2026-11-23', minutes: NaN }],
  expect: { minutes: 0, count: 1 }
});

addCase({
  name: '規則 4：Infinity 算 0 分鐘且仍算 1 筆',
  today: '2026-11-23',
  records: [{ log_date: '2026-11-23', minutes: Infinity }],
  expect: { minutes: 0, count: 1 }
});

addCase({
  name: '規則 4：負無限大算 0 分鐘且仍算 1 筆',
  today: '2026-11-23',
  records: [{ log_date: '2026-11-23', minutes: -Infinity }],
  expect: { minutes: 0, count: 1 }
});

addCase({
  name: '規則 5：完全沒有紀錄時回報 0 分鐘、0 筆',
  today: '2026-11-23',
  records: [],
  expect: { minutes: 0, count: 0 }
});
