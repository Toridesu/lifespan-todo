import { Header } from './Header';
import {
  PenLine,
  Save,
  Edit,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { useDiary } from '../hooks/useDiary';

const DiaryCard = () => {
  const {
    isEditing,
    setIsEditing,
    content,
    setContent,
    selectedDate,
    handleSave,
    handleDateSelect,
    navigateDay,
    hasEntryOnDate,
    currentWeekEntries,
    getWeekRangeText,
  } = useDiary();

  return (
    <Card className='py-6 shadow-lg' style={{ marginTop: '0px' }}>
      <CardContent>
        <Header title='週間日記' icon={PenLine} />
        <div className='space-y-6'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <Button
                variant='outline'
                size='icon'
                onClick={() => navigateDay('prev')}
                disabled={!selectedDate}
              >
                <ChevronLeft className='h-4 w-4' />
              </Button>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant='outline'
                    className='w-[300px] justify-start text-center font-normal'
                  >
                    <CalendarIcon className='mr-2 h-4 w-4' />
                    {selectedDate ? getWeekRangeText(selectedDate) : <span>日付を選択</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    selected={selectedDate}
                    onSelect={handleDateSelect}
                    locale={ja}
                    modifiers={{
                      hasEntry: date => hasEntryOnDate(date),
                    }}
                    modifiersStyles={{
                      hasEntry: {
                        fontWeight: 'bold',
                        textDecoration: 'underline',
                      },
                    }}
                  />
                </PopoverContent>
              </Popover>

              <Button
                variant='outline'
                size='icon'
                onClick={() => navigateDay('next')}
                disabled={!selectedDate}
              >
                <ChevronRight className='h-4 w-4' />
              </Button>
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

          {currentWeekEntries.length > 0 && (
            <div className='mb-4'>
              <h3 className='text-sm font-medium mb-2'>この週の記録:</h3>
              <ul className='space-y-2'>
                {currentWeekEntries.map(entry => (
                  <li key={entry.id} className='text-sm'>
                    <div className='flex'>
                      <span className='font-medium min-w-[80px]'>
                        {format(entry.date, 'MM/dd (E)', { locale: ja })}:
                      </span>
                      <span className='truncate'>{entry.content}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className='space-y-4'>
            <textarea
              placeholder='この週のまとめを記録しましょう...'
              className='bg-gray-100 w-full h-40 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none'
              value={content}
              onChange={e => setContent(e.target.value)}
              disabled={!isEditing || !selectedDate}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DiaryCard;
