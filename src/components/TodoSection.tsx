import React from 'react';
import { Header } from './Header';
import { CheckSquare } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const TodoSection: React.FC = () => {
  return (
    <Card className='max-w-7xl mx-auto py-6 shadow-lg' style={{ marginTop: '0px' }}>
      <CardContent>
        <Header title='TODO' icon={CheckSquare} />
      </CardContent>
    </Card>
  );
};

export default TodoSection;
