import {CheckIcon, ChevronDownIcon} from 'lucide-react'
import React, {useEffect, useMemo, useRef, useState} from 'react'
import {motion, AnimatePresence} from 'framer-motion'

// Animation variants
const dropdownVariants = {
    hidden: {
        opacity: 0,
        y: -10,
        scale: 0.95,
        transformOrigin: 'top center'
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: 'spring',
            stiffness: 500,
            damping: 25,
            mass: 0.5
        }
    },
    exit: {
        opacity: 0,
        y: -10,
        scale: 0.95,
        transition: {
            duration: 0.15,
            ease: 'easeOut'
        }
    }
}

export default function SelectColorful({
    options = [],
    label,
    change = () => {},
    valueProperty = () => {},
    titleProperty = () => {},
    empty,
    selected: default_selected = {},
    className = '',
    ...more
}) {
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState(options.find(item => valueProperty(item) === default_selected))

    const selectRef = useRef(null)

    useEffect(() => {
        const handleOutsideClick = event => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setOpen(false)
            }
        }

        document.addEventListener('mousedown', handleOutsideClick)
        return () => document.removeEventListener('mousedown', handleOutsideClick)
    }, [])

    const changeHandler = (e, opt) => {
        e.preventDefault()
        setSelected(opt)
        change(valueProperty(opt))
        setOpen(false)
    }

    const selected_title = useMemo(() => {
        return titleProperty(selected)
    }, [selected])

    const selected_value = useMemo(() => {
        return valueProperty(selected)
    }, [selected])

    return (
        <div ref={selectRef} className='w-full relative'>
            {label && <span className='label'>{label}</span>}
            <div className={`${className}`} {...more}>
                <motion.button
                    whileTap={{scale: 0.98}}
                    onClick={() => setOpen(prev => !prev)}
                    className='flex gap-3 w-full items-center p-2 pr-1 rounded-full text-start text-white stroke-white overflow-hidden'
                    style={{
                        backgroundColor: selected?.color ? selected.color : 'transparent'
                    }}>
                    {selected?.icon && (
                        <motion.div
                            initial={{rotate: 0}}
                            animate={{rotate: open ? [0, -10, 10, -5, 5, 0] : 0}}
                            className='ml-2'>
                            <selected.icon className='size-5 stroke-inherit' />
                        </motion.div>
                    )}
                    <span className='flex-1 text-inherit'>{selected_title}</span>
                    <div className='border-l border-border border-solid flex justify-center self-stretch items-center w-10'>
                        <motion.div
                            animate={{rotate: open ? 180 : 0}}
                            transition={{duration: 0.3, type: 'spring', stiffness: 400}}>
                            <ChevronDownIcon className='stroke-inherit' />
                        </motion.div>
                    </div>
                </motion.button>

                <AnimatePresence>
                    {open && (
                        <motion.div
                            className='absolute top-full min-w-full mt-1 z-50'
                            variants={dropdownVariants}
                            initial='hidden'
                            animate='visible'
                            exit='exit'>
                            <motion.div
                                className='card p-0 overflow-hidden'
                                initial={{boxShadow: '0 4px 6px rgba(0,0,0,0.1)'}}
                                animate={{
                                    boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                                    transition: {delay: 0.1}
                                }}>
                                {options.map((opt, index) => {
                                    const title = titleProperty(opt)
                                    const value = valueProperty(opt)
                                    const isSelected = value === selected_value
                                    return (
                                        <button
                                            disabled={isSelected}
                                            key={value}
                                            className={`w-full hover:bg-border group`}>
                                            <div
                                                custom={index}
                                                onClick={e => changeHandler(e, opt)}
                                                className='flex items-center gap-3 py-2 px-3'>
                                                {opt?.icon && (
                                                    <opt.icon
                                                        className='size-5 group-hover:scale-[120%]  group-hover:ml-2 transition-all'
                                                        stroke={opt?.color}
                                                    />
                                                )}
                                                <span className='flex-1 text-start text-inherit'>{title}</span>
                                                <AnimatePresence>
                                                    {isSelected && (
                                                        <motion.div
                                                            initial={{scale: 0, opacity: 0}}
                                                            animate={{
                                                                scale: 1,
                                                                opacity: 1,
                                                                transition: {type: 'spring', stiffness: 500}
                                                            }}
                                                            exit={{scale: 0, opacity: 0}}>
                                                            <CheckIcon className='size-5' />
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </button>
                                    )
                                })}
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
