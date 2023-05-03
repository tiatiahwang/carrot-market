import { cls } from '@/libs/client/utils';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface PaginationProps {
  currentPage: number | undefined;
  total: number;
}

export default function Pagination({ currentPage, total }: PaginationProps) {
  const router = useRouter();
  const maxPage = Number((total / 10).toFixed()) + 1;
  const [pages, setPages] = useState<number[]>();

  const onClickPageNumber = (page: number) =>
    router.push(`${router.pathname}?page=${page}`);
  const onClickPrev = () =>
    router.push(`${router.pathname}?page=${currentPage! - 1}`);
  const onClickNext = () =>
    router.push(`${router.pathname}?page=${currentPage! + 1}`);

  useEffect(() => {
    if (
      currentPage !== undefined &&
      currentPage > 3 &&
      currentPage + 3 < maxPage
    ) {
      setPages([
        currentPage - 2,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        currentPage + 2,
      ]);
    }
    if (currentPage !== undefined && currentPage <= 3) {
      setPages([1, 2, 3, 4, 5]);
    }
    if (currentPage !== undefined && currentPage + 3 >= maxPage) {
      setPages([maxPage - 4, maxPage - 3, maxPage - 2, maxPage - 1, maxPage]);
    }
  }, [currentPage, maxPage]);

  return (
    <div className='flex items-center justify-center space-x-1 py-5'>
      <div
        className={cls(
          'flex aspect-square w-10 cursor-pointer items-center justify-center rounded-full',
          currentPage === 1 ? 'hidden' : 'block',
        )}
        onClick={onClickPrev}
      >
        <svg
          className='h-4 w-4'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M15 19l-7-7 7-7'
          ></path>
        </svg>
      </div>

      {pages?.map((page, index) => (
        <div
          key={index}
          className={cls(
            'flex aspect-square w-7 items-center justify-center rounded-full',
            currentPage === page ? 'text-orange-500' : 'cursor-pointer',
          )}
          onClick={() => onClickPageNumber(page)}
        >
          <span>{page}</span>
        </div>
      ))}
      <div
        className={cls(
          'flex aspect-square w-10 cursor-pointer items-center justify-center rounded-full',
          currentPage === maxPage ? 'hidden' : 'block',
        )}
        onClick={onClickNext}
      >
        <svg
          className='h-4 w-4'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M9 5l7 7-7 7'
          ></path>
        </svg>
      </div>
    </div>
  );
}
