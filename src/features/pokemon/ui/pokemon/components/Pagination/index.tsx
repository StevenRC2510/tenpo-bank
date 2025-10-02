import React, { FC, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { PaginationProps } from './types';

const PageSizeSelector: FC<{
  value: number;
  onChange: (value: number) => void;
  className?: string;
}> = ({ value, onChange, className = '' }) => {
  const { t } = useTranslation();
  const options = [25, 50, 100];

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      onChange(Number(event.target.value));
    },
    [onChange]
  );

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <label htmlFor="page-size" className="text-xs sm:text-sm text-gray-700">
        {t('pagination.show')}
      </label>
      <select
        id="page-size"
        value={value}
        onChange={handleChange}
        className="border border-gray-300 rounded-md px-2 py-1 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        aria-label="Items per page"
      >
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  pageSize,
  onPageSizeChange,
  totalItems,
  className = '',
}) => {
  const { t } = useTranslation();

  const paginationInfo = useMemo(() => {
    const startItem = (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, totalItems);
    return { startItem, endItem };
  }, [currentPage, pageSize, totalItems]);

  const handlePrevious = useCallback(() => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  }, [currentPage, onPageChange]);

  const handleNext = useCallback(() => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  }, [currentPage, totalPages, onPageChange]);

  const handlePageClick = useCallback(
    (page: number) => {
      onPageChange(page);
    },
    [onPageChange]
  );

  const visiblePages = useMemo(() => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  }, [currentPage, totalPages]);

  if (totalPages <= 1) {
    return (
      <div className={`flex items-center justify-between ${className}`}>
        <div className="text-sm text-gray-700">
          {t('pagination.showing', {
            start: paginationInfo.startItem,
            end: paginationInfo.endItem,
            total: totalItems,
          })}
        </div>
        <PageSizeSelector
          value={pageSize}
          onChange={onPageSizeChange}
          className="ml-4"
        />
      </div>
    );
  }

  return (
    <div className={`flex flex-col space-y-4 ${className}`}>
      <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
        <div className="text-sm text-gray-700 text-center sm:text-left">
          {t('pagination.showing', {
            start: paginationInfo.startItem,
            end: paginationInfo.endItem,
            total: totalItems,
          })}
        </div>
        <PageSizeSelector value={pageSize} onChange={onPageSizeChange} />
      </div>

      <nav
        className="flex items-center justify-center space-x-1"
        aria-label="Pagination"
      >
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          aria-label="Previous page"
        >
          <span className="hidden sm:inline">{t('pagination.previous')}</span>
          <span className="sm:hidden">‹</span>
        </button>

        <div className="flex space-x-1">
          {visiblePages.map((page, index) => {
            if (page === '...') {
              return (
                <span
                  key={`dots-${index}`}
                  className="px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium text-gray-500"
                >
                  ...
                </span>
              );
            }

            const pageNumber = page as number;
            const isCurrentPage = pageNumber === currentPage;

            return (
              <button
                key={pageNumber}
                onClick={() => handlePageClick(pageNumber)}
                className={`px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 ${
                  isCurrentPage
                    ? 'bg-gray-800 text-white border border-gray-800'
                    : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                }`}
                aria-label={`Go to page ${pageNumber}`}
                aria-current={isCurrentPage ? 'page' : undefined}
              >
                {pageNumber}
              </button>
            );
          })}
        </div>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          aria-label="Next page"
        >
          <span className="hidden sm:inline">{t('pagination.next')}</span>
          <span className="sm:hidden">›</span>
        </button>
      </nav>
    </div>
  );
};
