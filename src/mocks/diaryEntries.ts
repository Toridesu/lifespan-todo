export interface DiaryEntry {
  id: string;
  date: Date;
  content: string;
  weekNumber?: number;
}

export const mockDiaryEntries: DiaryEntry[] = [
  {
    id: '1',
    date: new Date(2024, 2, 20),
    content: '今日は晴れでした。公園で散歩をしました。',
    weekNumber: 12,
  },
  {
    id: '2',
    date: new Date(2024, 2, 19),
    content: '友達と買い物に行きました。楽しかったです。',
    weekNumber: 12,
  },
  {
    id: '3',
    date: new Date(2024, 2, 17),
    content: '今日は雨でした。世界がぐちゃぐちゃになっていました。',
    weekNumber: 11,
  },
  {
    id: '4',
    date: new Date(2024, 2, 10),
    content: '先週は忙しかったです。週間レポートを書きました。',
    weekNumber: 10,
  },
  {
    id: '5',
    date: new Date(2024, 2, 3),
    content: '3月の最初の週。新しいプロジェクトが始まりました。',
    weekNumber: 9,
  },
];
