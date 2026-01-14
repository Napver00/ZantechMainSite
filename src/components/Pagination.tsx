import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) pages.push(i);
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
            } else {
                pages.push(1);
                pages.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
                pages.push('...');
                pages.push(totalPages);
            }
        }

        return pages;
    };

    return (
        <div className="flex items-center justify-center gap-3 mt-12">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#0f1115] border border-white/5 text-gray-400 hover:text-white hover:bg-white/5 hover:border-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
                {getPageNumbers().map((page, index) => (
                    page === '...' ? (
                        <span key={`ellipsis-${index}`} className="w-10 h-10 flex items-center justify-center text-gray-600 font-medium">
                            ...
                        </span>
                    ) : (
                        <button
                            key={page}
                            onClick={() => onPageChange(page as number)}
                            className={`w-10 h-10 rounded-xl font-medium transition-all duration-300 flex items-center justify-center ${currentPage === page
                                ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.5)] border border-blue-500/50'
                                : 'bg-[#0f1115] border border-white/5 text-gray-400 hover:text-white hover:bg-white/5 hover:border-white/10'
                                }`}
                        >
                            {page}
                        </button>
                    )
                ))}
            </div>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#0f1115] border border-white/5 text-gray-400 hover:text-white hover:bg-white/5 hover:border-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
            >
                <ChevronRight className="w-5 h-5" />
            </button>
        </div>
    );
};

export default Pagination;
