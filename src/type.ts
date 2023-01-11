// 日別の読数
export interface dailyCount {
  date: string;
  count: number;
}

// 月別の集計
export interface monthlyTotal {
  month: string;
  count: number;
}
