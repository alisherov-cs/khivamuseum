import {motion} from 'framer-motion'
import {useEffect, useRef, useState, useCallback, useMemo} from 'react'

export const EffectItem = ({
    children,
    delay = 0.2,
    amount = 0.5,
    once = true,
    animate = {opacity: 1, y: 0},
    initial = {opacity: 0, y: 50},
    ...more
}) => {
    const ref = useRef(null)
    const observerRef = useRef(null)
    const [inView, setInView] = useState(false)

    const handleIntersect = useCallback(
        ([entry], observer) => {
            if (entry.isIntersecting) {
                setInView(true)
                if (once && observer) observer.disconnect()
            } else if (!once) {
                setInView(false)
            }
        },
        [once]
    )

    useEffect(() => {
        if (!ref.current) return
        observerRef.current = new window.IntersectionObserver(
            (entries, observer) => handleIntersect(entries, observer),
            {threshold: amount}
        )
        observerRef.current.observe(ref.current)
        return () => {
            observerRef.current && observerRef.current.disconnect()
        }
    }, [amount, handleIntersect])

    const transition = useMemo(
        () => ({
            type: 'spring',
            damping: 18,
            stiffness: 200,
            delay
        }),
        [delay]
    )

    return (
        <motion.div ref={ref} initial={initial} animate={inView ? animate : initial} transition={transition} {...more}>
            {children}
        </motion.div>
    )
}
