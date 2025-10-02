import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from './index';

describe('Pagination', () => {
  const defaultProps = {
    currentPage: 1,
    totalPages: 10,
    onPageChange: jest.fn(),
    pageSize: 50,
    onPageSizeChange: jest.fn(),
    totalItems: 200,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders pagination information', () => {
    render(<Pagination {...defaultProps} />);

    expect(
      screen.getByText('Showing 1 to 50 of 200 results')
    ).toBeInTheDocument();
  });

  it('renders page size selector', () => {
    render(<Pagination {...defaultProps} />);

    expect(screen.getByLabelText('Items per page')).toBeInTheDocument();
    expect(screen.getByDisplayValue('50')).toBeInTheDocument();
  });

  it('renders navigation buttons', () => {
    render(<Pagination {...defaultProps} />);

    expect(screen.getByLabelText('Previous page')).toBeInTheDocument();
    expect(screen.getByLabelText('Next page')).toBeInTheDocument();
  });

  it('disables previous button on first page', () => {
    render(<Pagination {...defaultProps} currentPage={1} />);

    const prevButton = screen.getByLabelText('Previous page');
    expect(prevButton).toBeDisabled();
  });

  it('disables next button on last page', () => {
    render(<Pagination {...defaultProps} currentPage={10} />);

    const nextButton = screen.getByLabelText('Next page');
    expect(nextButton).toBeDisabled();
  });

  it('calls onPageChange when previous button is clicked', () => {
    render(<Pagination {...defaultProps} currentPage={2} />);

    const prevButton = screen.getByLabelText('Previous page');
    fireEvent.click(prevButton);

    expect(defaultProps.onPageChange).toHaveBeenCalledWith(1);
  });

  it('calls onPageChange when next button is clicked', () => {
    render(<Pagination {...defaultProps} currentPage={1} />);

    const nextButton = screen.getByLabelText('Next page');
    fireEvent.click(nextButton);

    expect(defaultProps.onPageChange).toHaveBeenCalledWith(2);
  });

  it('calls onPageSizeChange when page size is changed', () => {
    render(<Pagination {...defaultProps} />);

    const pageSizeSelect = screen.getByLabelText('Items per page');
    fireEvent.change(pageSizeSelect, { target: { value: '50' } });

    expect(defaultProps.onPageSizeChange).toHaveBeenCalledWith(50);
  });

  it('renders page numbers correctly', () => {
    render(<Pagination {...defaultProps} currentPage={5} />);

    expect(screen.getByLabelText('Go to page 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to page 5')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to page 10')).toBeInTheDocument();
  });

  it('highlights current page', () => {
    render(<Pagination {...defaultProps} currentPage={5} />);

    const currentPageButton = screen.getByLabelText('Go to page 5');
    expect(currentPageButton).toHaveClass('bg-gray-800');
  });

  it('calls onPageChange when page number is clicked', () => {
    render(<Pagination {...defaultProps} currentPage={1} />);

    const pageButton = screen.getByLabelText('Go to page 3');
    fireEvent.click(pageButton);

    expect(defaultProps.onPageChange).toHaveBeenCalledWith(3);
  });

  it('renders ellipsis for large page counts', () => {
    render(<Pagination {...defaultProps} totalPages={20} currentPage={10} />);

    expect(screen.getAllByText('...')).toHaveLength(2);
  });

  it('does not render pagination when totalPages is 1', () => {
    render(<Pagination {...defaultProps} totalPages={1} />);

    expect(screen.queryByLabelText('Previous page')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Next page')).not.toBeInTheDocument();
    expect(
      screen.getByText('Showing 1 to 50 of 200 results')
    ).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<Pagination {...defaultProps} />);

    expect(screen.getByLabelText('Pagination')).toBeInTheDocument();
  });
});
