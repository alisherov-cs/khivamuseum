import {motion} from 'framer-motion'
import {memo, useMemo} from 'react'

const ShinyText = memo(({children, className = ''}) => {
    const style = useMemo(
        () => ({
            backgroundSize: '200% 100%'
        }),
        []
    )

    const animate = useMemo(
        () => ({
            backgroundPosition: ['100%', '-100%']
        }),
        []
    )

    const transition = useMemo(
        () => ({
            repeat: Infinity,
            duration: 2,
            ease: 'linear'
        }),
        []
    )

    return (
        <motion.div
            className={`text-inherit text-opacity-70 inline-block bg-gradient-to-r bg-clip-text from-45% via-50% to-65% from-transparent via-white to-transparent ${className}`}
            animate={animate}
            transition={transition}
            style={style}>
            {children}
        </motion.div>
    )
})

export default ShinyText
