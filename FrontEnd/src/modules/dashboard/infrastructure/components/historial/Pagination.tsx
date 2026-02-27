import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    itemsShown: number;
    totalItems: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({
    currentPage,
    totalPages,
    itemsShown,
    totalItems,
    onPageChange
}: PaginationProps) => {
    return (
        <div className="mt-8 flex flex-col items-center">
            <span className="text-[#848E9C] text-sm mb-4">
                Mostrando {itemsShown} de {totalItems} estrategias
            </span>

            <div className="flex items-center gap-1.5">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2.5 rounded-xl bg-[#1E2329] border border-[#2B3139] text-[#848E9C] hover:text-[#F0B90B] hover:border-[#F0B90B] disabled:opacity-20 transition-all"
                >
                    <ChevronLeft className="h-5 w-5" />
                </button>

                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => onPageChange(i + 1)}
                        className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${currentPage === i + 1
                            ? 'bg-[#F0B90B] text-black shadow-lg shadow-[#F0B90B]/10'
                            : 'bg-[#1E2329] border border-[#2B3139] text-[#848E9C] hover:text-white'
                            }`}
                    >
                        {i + 1}
                    </button>
                ))}

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages || totalPages === 0}
                    className="p-2.5 rounded-xl bg-[#1E2329] border border-[#2B3139] text-[#848E9C] hover:text-[#F0B90B] hover:border-[#F0B90B] disabled:opacity-20 transition-all"
                >
                    <ChevronRight className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
};

export default Pagination;
