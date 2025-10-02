import { FC } from 'react';
import {
  SkeletonProps,
  SkeletonTextProps,
  SkeletonCardProps,
  SkeletonListProps,
} from './types';

export const Skeleton: FC<SkeletonProps> = ({
  className = '',
  width,
  height,
  rounded = false,
  animate = true,
}) => {
  const baseClasses = 'bg-gray-200';
  const roundedClasses = rounded ? 'rounded-full' : 'rounded';
  const animateClasses = animate ? 'animate-pulse' : '';

  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === 'number' ? `${width}px` : width;
  if (height)
    style.height = typeof height === 'number' ? `${height}px` : height;

  return (
    <div
      className={`${baseClasses} ${roundedClasses} ${animateClasses} ${className}`}
      style={style}
    />
  );
};

export const SkeletonText: FC<SkeletonTextProps> = ({
  lines = 1,
  className = '',
}) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: lines }).map((_, index) => (
      <Skeleton
        key={index}
        height="16px"
        width={index === lines - 1 ? '75%' : '100%'}
        className="h-4"
      />
    ))}
  </div>
);

export const SkeletonCard: FC<SkeletonCardProps> = ({ className = '' }) => (
  <div className={`p-4 border border-gray-200 rounded-lg ${className}`}>
    <div className="flex items-start space-x-3">
      <Skeleton width={40} height={40} rounded />
      <div className="flex-1 space-y-2">
        <Skeleton height="20px" width="60%" />
        <Skeleton height="16px" width="100%" />
        <Skeleton height="16px" width="80%" />
        <div className="flex space-x-2">
          <Skeleton height="12px" width="80px" />
          <Skeleton height="12px" width="100px" />
          <Skeleton height="12px" width="60px" />
        </div>
      </div>
    </div>
  </div>
);

export const SkeletonList: FC<SkeletonListProps> = ({
  items = 5,
  className = '',
}) => (
  <div className={`space-y-4 ${className}`}>
    {Array.from({ length: items }).map((_, index) => (
      <SkeletonCard key={index} />
    ))}
  </div>
);
