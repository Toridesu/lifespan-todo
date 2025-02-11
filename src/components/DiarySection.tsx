import React from 'react';
import ProgressBar from './ProgressBar';

const DiarySection: React.FC = () => {
  return (
    <div className='bg-white rounded-lg shadow-md p-6'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-2xl font-bold'>日記</h2>
        <ProgressBar progress={50} />
      </div>
      <div className='space-y-4'>
        <textarea placeholder='今日の出来事を記録しましょう...' className='w-full h-40 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none' />
        <div className='flex justify-end'>
          <button className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors'>保存</button>
        </div>
      </div>
    </div>
  );
};

export default DiarySection;
