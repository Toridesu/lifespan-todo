import { LucideIcon } from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';

interface HeaderProps {
  title: string;
  icon: LucideIcon;
}

export function Header({ title, icon: Icon }: HeaderProps) {
  return (
    <div className="flex items-center text-2xl mb-4 text-gray-900">
      <Avatar className="h-8 w-8 mr-2 bg-gray-100">
        <AvatarFallback className="bg-transparent">
          <Icon className="h-5 w-5 text-gray-700" />
        </AvatarFallback>
      </Avatar>
      <p className="font-bold">{title}</p>
    </div>
  );
}