import React from 'react';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = React.memo(({ progress }) => {
  return (
    <div className='relative h-4 bg-gray-200 rounded-full overflow-hidden'>
      <div className='absolute h-full bg-gray-400 transition-all duration-1000' style={{ width: `${progress}%` }} />
    </div>
  );
});

export default ProgressBar;
