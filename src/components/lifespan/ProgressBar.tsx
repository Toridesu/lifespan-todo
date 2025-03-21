import React from 'react';

/**
 * ProgressBarコンポーネントのプロパティ
 * @property {number} progress - 進捗率（0〜100の数値）
 */
interface ProgressBarProps {
  progress: number;
}

/**
 * 進捗バーコンポーネント
 * 進捗状況を視覚的に表示するバー
 * React.memoで最適化されており、progress値が変わった時だけ再レンダリングされる
 * 
 * @param {ProgressBarProps} props - コンポーネントのプロパティ
 * @returns {JSX.Element} 進捗バーUI
 */
const ProgressBar: React.FC<ProgressBarProps> = React.memo(({ progress }) => {
  return (
    // コンテナ - 丸みを帯びた灰色の背景
    <div className='relative h-4 bg-gray-200 rounded-full overflow-hidden'>
      {/* 進捗インジケーター - 幅がprogressに基づいて動的に変化 */}
      <div
        className='absolute h-full bg-gray-400 transition-all duration-1000'
        style={{ width: `${progress}%` }} // CSSのwidth属性で進捗率を表示
      />
    </div>
  );
});

export default ProgressBar;
