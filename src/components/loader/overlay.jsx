import {useEffect, useRef, useState} from 'react'
import {AnimatePresence, motion} from 'framer-motion'

export default function LoaderOverlay({children, className, loading}) {
    const containerRef = useRef(null)
    const [scrollWidth, setScrollWidth] = useState(0)

    useEffect(() => {
        if (containerRef.current) {
            setScrollWidth(containerRef.current.scrollWidth)
        }
    }, [loading])

    return (
        <div ref={containerRef} className={`relative ${className}`}>
            {children}

            <AnimatePresence mode='sync'>
                {loading && (
                    <motion.div
                        variants={{
                            hidden: {opacity: 0},
                            visible: {opacity: 1}
                        }}
                        initial='hidden'
                        animate='visible'
                        exit='hidden'
                        transition={{duration: 0.3}}
                        style={{width: scrollWidth}}
                        className='absolute h-full top-0 left-0 bg-bgcolor/80 z-30 pointer-events-none'
                    />
                )}
            </AnimatePresence>
        </div>
    )
}
