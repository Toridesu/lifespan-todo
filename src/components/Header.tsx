import { LucideIcon } from 'lucide-react';

interface HeaderProps {
  title: string;
  icon: LucideIcon;
}

export function Header({ title, icon: Icon }: HeaderProps) {
  return (
    <div className='flex items-center text-2xl mb-4 text-gray-900'>
      <Icon className='mr-2 w-6' />
      <p className='font-bold'>{title}</p>
    </div>
  );
}
