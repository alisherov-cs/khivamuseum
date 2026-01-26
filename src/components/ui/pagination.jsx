import {ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon} from 'lucide-react'
import {useSearchParams} from 'react-router-dom'
import {motion, AnimatePresence} from 'framer-motion'
import {useMemo} from 'react'

export default function Pagination({data, refresh, limit, className}) {
    const {page, total_pages} = data
    if (!(total_pages >= 1)) return null
    const [params, setParams] = useSearchParams()

    const clickPagination = newPage => {
        if (total_pages >= newPage && newPage > 0) {
            params.set('page', newPage)
            refresh({query: `${params.toString()}${limit ? `&limit=${limit}` : ''}`, loading: true})
            setParams(params)
            window.scrollTo({top: 0, behavior: 'smooth'})
        }
    }

    // Generate visible page numbers
    const getVisiblePages = () => {
        const visiblePages = []
        const maxVisible = 5 // Maximum visible page numbers

        let start = Math.max(1, page - 2)
        let end = Math.min(total_pages, page + 2)

        if (page <= 3) {
            end = Math.min(maxVisible, total_pages)
        } else if (page >= total_pages - 2) {
            start = Math.max(total_pages - maxVisible + 1, 1)
        }

        for (let i = start; i <= end; i++) {
            visiblePages.push(i)
        }

        return visiblePages
    }

    const visiblePages = useMemo(() => {
        return getVisiblePages()
    }, [data])

    return (
        <div className={`flex justify-center items-center py-4 gap-x-1 ${className}`}>
            {/* First Page Button */}
            <motion.button
                whileHover={{scale: 1.05}}
                whileTap={{scale: 0.95}}
                onClick={() => clickPagination(1)}
                disabled={page === 1}
                className={`p-2 rounded-full flex items-center justify-center ${
                    page === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-primary hover:bg-primary/10 cursor-pointer'
                }`}>
                <ChevronsLeftIcon className='w-5 h-5' />
            </motion.button>

            {/* Previous Page Button */}
            <motion.button
                whileHover={{scale: 1.05}}
                whileTap={{scale: 0.95}}
                onClick={() => clickPagination(page - 1)}
                disabled={page === 1}
                className={`p-2 rounded-full flex items-center justify-center ${
                    page === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-primary hover:bg-primary/10 cursor-pointer'
                }`}>
                <ChevronLeftIcon className='w-5 h-5' />
            </motion.button>

            {/* Page Numbers */}
            <div className='flex items-center gap-x-1 mx-2'>
                <AnimatePresence initial={false}>
                    {visiblePages.map(pageNum => {
                        const active = pageNum === page
                        return (
                            <motion.button
                                initial={{opacity: 0, scale: 0.8}}
                                animate={{opacity: 1, scale: 1}}
                                exit={{opacity: 0, scale: 0.8}}
                                transition={{type: 'spring', stiffness: 300, damping: 20}}
                                onClick={() => clickPagination(pageNum)}
                                disabled={active}
                                className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 ${
                                    active
                                        ? 'bg-primary text-white shadow-md'
                                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer'
                                }`}>
                                {pageNum}
                            </motion.button>
                        )
                    })}
                </AnimatePresence>
            </div>

            {/* Next Page Button */}
            <motion.button
                whileHover={{scale: 1.05}}
                whileTap={{scale: 0.95}}
                onClick={() => clickPagination(page + 1)}
                disabled={page === total_pages}
                className={`p-2 rounded-full flex items-center justify-center ${
                    page === total_pages
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-primary hover:bg-primary/10 cursor-pointer'
                }`}>
                <ChevronRightIcon className='w-5 h-5' />
            </motion.button>

            {/* Last Page Button */}
            <motion.button
                whileHover={{scale: 1.05}}
                whileTap={{scale: 0.95}}
                onClick={() => clickPagination(total_pages)}
                disabled={page === total_pages}
                className={`p-2 rounded-full flex items-center justify-center ${
                    page === total_pages
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-primary hover:bg-primary/10 cursor-pointer'
                }`}>
                <ChevronsRightIcon className='w-5 h-5' />
            </motion.button>
        </div>
    )
}
