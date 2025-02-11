import React from 'react';
import ProgressBar from './ProgressBar';

const TodoSection: React.FC = () => {
  return (
    <div className='bg-white rounded-lg shadow-md p-6'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-2xl font-bold'>TODO</h2>
        <ProgressBar progress={50} />
      </div>
      <div className='space-y-4'>
        <div className='flex items-center space-x-3'>
          <input type='checkbox' className='w-5 h-5 rounded border-gray-300' />
          <input type='text' placeholder='新しいTODOを追加' className='flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' />
        </div>
        {/* TODO items will be mapped here */}
      </div>
    </div>
  );
};

export default TodoSection;
