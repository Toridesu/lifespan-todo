import { Header } from './Header';
import { PenLine, Save, Edit, Calendar as CalendarIcon } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { useState } from 'react';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

// 仮のデータ型定義
interface DiaryEntry {
  id: string;
  date: Date;
  content: string;
}

const DiaryCard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // 仮のデータ
  const pastEntries: DiaryEntry[] = [
    {
      id: '1',
      date: new Date(2024, 2, 20),
      content: '今日は晴れでした。公園で散歩をしました。',
    },
    {
      id: '2',
      date: new Date(2024, 2, 19),
      content: '友達と買い物に行きました。楽しかったです。',
    },
  ];

  const handleSave = () => {
    setIsEditing(false);
    // TODO: 保存の処理を実装
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    const entry = pastEntries.find((entry) => format(entry.date, 'yyyy-MM-dd') === format(date!, 'yyyy-MM-dd'));
    if (entry) {
      setContent(entry.content);
    } else {
      setContent('');
    }
  };

  return (
    <Card className='py-6 shadow-lg' style={{ marginTop: '0px' }}>
      <CardContent>
        <Header title='日記' icon={PenLine} />
        <div className='space-y-6'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant='outline' className='w-[240px] justify-start text-left font-normal'>
                    <CalendarIcon className='mr-2 h-4 w-4' />
                    {selectedDate ? format(selectedDate, 'yyyy年MM月dd日 (E)', { locale: ja }) : <span>日付を選択</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar mode='single' selected={selectedDate} onSelect={handleDateSelect} locale={ja} />
                </PopoverContent>
              </Popover>
            </div>
            {!isEditing ? (
              <Button variant='outline' onClick={() => setIsEditing(true)} disabled={!selectedDate}>
                <Edit />
                編集
              </Button>
            ) : (
              <Button onClick={handleSave}>
                <Save />
                保存
              </Button>
            )}
          </div>

          <div className='space-y-4'>
            <textarea placeholder='今日の出来事を記録しましょう...' className='w-full h-40 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none' value={content} onChange={(e) => setContent(e.target.value)} disabled={!isEditing || !selectedDate} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DiaryCard;
