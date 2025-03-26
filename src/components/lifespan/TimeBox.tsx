import { Card, CardContent } from '../ui/card';

interface TimeBoxProps {
  label: string;
  value: number;
  unit: string;
  isWarning?: boolean;
}


export function TimeBox({ label, value, unit, isWarning = false }: TimeBoxProps) {
  return (
    <Card className='w-full bg-gray-100 border-0'>
      <CardContent className='p-2 md:p-4'>
        <p className='text-xs md:text-sm font-medium text-gray-800'>{label}</p>
        <p
          className={`text-xl md:text-3xl font-bold ${
            isWarning ? 'text-red-600' : 'text-gray-800'
          }`}
        >
          {value}
          {unit}
        </p>
      </CardContent>
    </Card>
  );
}
