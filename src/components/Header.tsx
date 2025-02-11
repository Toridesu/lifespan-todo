import { Timer } from 'lucide-react';

export function Header() {
  return (
    <div className='flex items-center text-2xl mb-4 text-gray-900'>
      <Timer className='mr-2 w-6' />
      <p className='font-bold'>あなたの寿命</p>
    </div>
  );
} 