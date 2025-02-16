import { Header } from './Header';
import { List } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const TodoCard = () => {
  return (
    <Card className='py-6 shadow-lg' style={{ marginTop: '0px' }}>
      <CardContent>
        <Header title='TODO' icon={List} />
        <div className='space-y-4'>
          <div className='flex items-center space-x-3'>
            <input type='text' placeholder='＋ 新しいタスクを追加' className='flex-1 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100' />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TodoCard;
