'use client';
import Link from 'next/link';
import clsx from 'clsx';

export interface Breadcrumb {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: Breadcrumb[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="inline-flex items-center space-x-2 text-sm">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="inline-flex items-center">
              {isLast ? (
                <span
                  className={clsx(
                    'font-medium',
                    'text-yellow-200', // цвет последнего
                    'hover:text-yellow-100' // hover для последнего (если нужно)
                  )}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href!}
                  className={clsx(
                    'text-yellow-300', // цвет неактивных
                    'hover:text-yellow-100', // цвет при наведении
                    'transition-colors',
                    'duration-200'
                  )}
                >
                  {item.label}
                </Link>
              )}
              {!isLast && (
                <svg
                  className="w-4 h-4 text-yellow-500 mx-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
