import { useState, useCallback, useMemo } from 'react';
import { format, isSameDay, getWeek, startOfWeek, addWeeks, subWeeks } from 'date-fns';
import { DiaryEntry, mockDiaryEntries } from '../mocks/diaryEntries';

export const useDiary = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedWeek, setSelectedWeek] = useState<number>(getWeek(new Date()));

  // モックデータを使用
  const pastEntries = useMemo<DiaryEntry[]>(() => mockDiaryEntries, []);

  // 週ごとのエントリーを取得
  const weeklyEntries = useMemo(() => {
    const entriesByWeek = new Map<number, DiaryEntry[]>();

    pastEntries.forEach(entry => {
      const weekNum = entry.weekNumber || getWeek(entry.date);
      if (!entriesByWeek.has(weekNum)) {
        entriesByWeek.set(weekNum, []);
      }
      entriesByWeek.get(weekNum)?.push(entry);
    });

    return entriesByWeek;
  }, [pastEntries]);

  // 現在選択されている週のエントリーを取得
  const currentWeekEntries = useMemo(() => {
    return weeklyEntries.get(selectedWeek) || [];
  }, [weeklyEntries, selectedWeek]);

  const handleSave = () => {
    setIsEditing(false);
    // TODO: 保存の処理を実装
  };

  const handleDateSelect = useCallback(
    (date: Date | undefined) => {
      if (!date) return;

      setSelectedDate(date);
      setSelectedWeek(getWeek(date));

      // 週間モードの場合は、その週の最初のエントリーを表示するか、空にする
      const weekEntries = weeklyEntries.get(getWeek(date)) || [];
      if (weekEntries.length > 0) {
        setContent(weekEntries[0].content);
      } else {
        setContent('');
      }
    },
    [weeklyEntries]
  );

  const navigateDay = useCallback(
    (direction: 'prev' | 'next') => {
      if (!selectedDate) return;

      // 週単位で移動
      const newDate = direction === 'prev' ? subWeeks(selectedDate, 1) : addWeeks(selectedDate, 1);

      setSelectedDate(newDate);
      setSelectedWeek(getWeek(newDate));

      const weekEntries = weeklyEntries.get(getWeek(newDate)) || [];
      if (weekEntries.length > 0) {
        setContent(weekEntries[0].content);
      } else {
        setContent('');
      }
    },
    [selectedDate, weeklyEntries]
  );

  const hasEntryOnDate = useCallback(
    (date: Date) => {
      return pastEntries.some(entry => isSameDay(entry.date, date));
    },
    [pastEntries]
  );

  const getWeekRangeText = useCallback((date: Date) => {
    const start = startOfWeek(date);
    const end = addWeeks(start, 1);
    return `${format(start, 'yyyy年MM月dd日')} 〜 ${format(end, 'yyyy年MM月dd日')}`;
  }, []);

  return {
    isEditing,
    setIsEditing,
    content,
    setContent,
    selectedDate,
    setSelectedDate,
    pastEntries,
    handleSave,
    handleDateSelect,
    navigateDay,
    hasEntryOnDate,
    selectedWeek,
    currentWeekEntries,
    getWeekRangeText,
  };
};
