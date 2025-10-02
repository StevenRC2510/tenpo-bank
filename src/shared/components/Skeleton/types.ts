export interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  rounded?: boolean;
  animate?: boolean;
}

export interface SkeletonTextProps {
  lines?: number;
  className?: string;
}

export interface SkeletonCardProps {
  className?: string;
}

export interface SkeletonListProps {
  items?: number;
  className?: string;
}
