import { LucideIcon } from 'lucide-react';
import { Avatar, AvatarFallback } from '../ui/avatar';

/**
 * Headerコンポーネントのプロパティ
 * @property {string} title - ヘッダーに表示するタイトルテキスト
 * @property {LucideIcon} icon - ヘッダーに表示するアイコン（Lucideアイコンライブラリから）
 */
interface HeaderProps {
  title: string;
  icon: LucideIcon;
}

/**
 * 共通ヘッダーコンポーネント
 * アプリケーション内のさまざまなセクションで使用される統一されたヘッダーデザイン
 * アイコンとタイトルテキストを組み合わせて表示します
 * 
 * @param {HeaderProps} props - ヘッダーのプロパティ
 * @returns {JSX.Element} アイコン付きのヘッダーコンポーネント
 */
export function Header({ title, icon: Icon }: HeaderProps) {
  return (
    <div className="flex items-center text-2xl mb-4 text-gray-900">
      {/* アイコンを丸い背景で表示するAvatar */}
      <Avatar className="h-8 w-8 mr-2 bg-gray-100">
        <AvatarFallback className="bg-transparent">
          {/* 引数で渡されたアイコンを表示 */}
          <Icon className="h-5 w-5 text-gray-700" />
        </AvatarFallback>
      </Avatar>
      {/* タイトルテキスト */}
      <p className="font-bold">{title}</p>
    </div>
  );
}