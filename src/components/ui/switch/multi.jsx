import {useCallback, useState} from 'react'
import {motion} from 'framer-motion'

export default function SwitchMulti({
    options = [],
    value = 0,
    name = 'asdf',
    onChange,
    className = '',
    itemClassName = ''
}) {
    const [selected, setSelected] = useState(value)

    const onSwitch = useCallback(
        (item, index) => {
            if (onChange) {
                setSelected(index)
                if (onChange) onChange({item, index})
            }
        },
        [onChange]
    )

    return (
        <div
            className={`bg-border flex overflow-x-auto scrollbar-none justify-start space-x-1 rounded-full !p-1 ${className}`}>
            {options.map((tab, index) => {
                const isActive = selected === index
                return (
                    <button
                        key={index}
                        disabled={isActive}
                        onClick={() => onSwitch(tab, index)}
                        className={`relative flex-1 cursor-pointer flex justify-center items-center rounded-full px-3 py-1.5 text-sm font-medium ${itemClassName}`}>
                        {isActive && (
                            <motion.span
                                layoutId={name}
                                className='absolute inset-0 rounded-full bg-primary'
                                transition={{type: 'spring', bounce: 0.2, duration: 0.5}}
                            />
                        )}
                        <div className='z-10'>{tab.title}</div>
                    </button>
                )
            })}
        </div>
    )
}
