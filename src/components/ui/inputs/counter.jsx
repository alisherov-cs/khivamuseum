import {useState} from 'react'
import {motion} from 'framer-motion'
import {Plus, Minus} from 'lucide-react'
import {useCallback} from 'react'

export default function Counter({initialValue = 0, min = 0, max = 10, onChange, onIncrement, onDecrement}) {
    const [count, setCount] = useState(initialValue)

    const handleIncrement = useCallback(() => {
        if (count < max) {
            const newValue = count + 1
            setCount(newValue)
            onChange?.(newValue)
            onIncrement?.(newValue)
        }
    }, [count, min, max, onChange, onIncrement])

    const handleDecrement = useCallback(() => {
        if (count > min) {
            const newValue = count - 1
            setCount(newValue)
            onChange?.(newValue)
            onDecrement?.(newValue)
        }
    }, [count, min, max, onChange, onDecrement])

    return (
        <div className='flex items-center justify-center gap-3'>
            <motion.button
                whileTap={{scale: 0.9}}
                whileHover={{scale: 1.05}}
                onClick={handleDecrement}
                disabled={count <= min}
                className={`p-2 rounded-full *:stroke-black ${
                    count <= min
                        ? 'bg-glow_color cursor-not-allowed'
                        : 'hover:bg-primary/70 bg-primary cursor-pointer *:stroke-white'
                }`}>
                <Minus className={`size-[18px] stroke-inherit`} />
            </motion.button>

            <motion.div
                key={count}
                transition={{type: 'spring', stiffness: 300, damping: 20}}
                className='flex items-center justify-center min-w-8'>
                <motion.span initial={{y: -20, opacity: 0}} animate={{y: 0, opacity: 1}} className='text-lg font-bold'>
                    {count}
                </motion.span>
            </motion.div>

            <motion.button
                whileTap={{scale: 0.9}}
                whileHover={{scale: 1.05}}
                onClick={handleIncrement}
                disabled={count >= max}
                className={`p-2 rounded-full *:stroke-black ${
                    count >= max
                        ? 'bg-glow_color cursor-not-allowed'
                        : 'hover:bg-primary/70 bg-primary cursor-pointer *:stroke-white'
                }`}>
                <Plus className={`size-[18px] stroke-inherit`} />
            </motion.button>
        </div>
    )
}
