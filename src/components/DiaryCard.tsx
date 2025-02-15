import { Header } from './Header';
import { PenLine } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const DiaryCard = () => {
  return (
    <Card className='py-6 shadow-lg' style={{ marginTop: '0px' }}>
      <CardContent>
        <Header title='日記' icon={PenLine} />
        <div className='space-y-4'>
          <textarea placeholder='今日の出来事を記録しましょう...' className='w-full h-40 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none' />
          <div className='flex justify-end'>
            <button className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors'>保存</button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DiaryCard;
