export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  onPageSizeChange: (size: number) => void;
  totalItems: number;
  className?: string;
}

export interface PageSizeSelectorProps {
  value: number;
  onChange: (value: number) => void;
  options?: number[];
  className?: string;
}
