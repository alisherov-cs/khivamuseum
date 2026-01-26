import React, {useState, useRef, useEffect, useCallback, useMemo} from 'react'
import {motion, AnimatePresence} from 'framer-motion'
import {ChevronDown, Check, X} from 'lucide-react'

const Select = ({
    options = [],
    value = null,
    onChange,
    placeholder = 'Tanlang...',
    isMulti = false,
    searchable = true,
    disabled = false,
    className = '',
    clearable = true,
    noOptionsMessage = 'Variantlar topilmadi',
    maxHeight = 300
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const selectRef = useRef(null)
    const inputRef = useRef(null)

    useEffect(() => {
        const handleOutsideClick = event => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleOutsideClick)
        return () => document.removeEventListener('mousedown', handleOutsideClick)
    }, [])

    useEffect(() => {
        if (isOpen && searchable && inputRef.current) {
            inputRef.current.focus()
        }
    }, [isOpen, searchable])

    const filteredOptions = useMemo(
        () => options.filter(option => option.label.toLowerCase().includes(searchTerm.toLowerCase())),
        [options, searchTerm]
    )

    const handleSelect = useCallback(
        option => {
            if (isMulti) {
                const isSelected = (value || []).some(item => item.value === option.value)
                const newValue = isSelected
                    ? (value || []).filter(item => item.value !== option.value)
                    : [...(value || []), option]
                onChange(newValue)
                if (searchable && inputRef.current) {
                    inputRef.current.focus()
                    setSearchTerm('')
                }
            } else {
                onChange(option)
                setIsOpen(false)
                setSearchTerm('')
            }
        },
        [isMulti, onChange, value, searchable]
    )

    const handleClear = useCallback(
        e => {
            e.stopPropagation()
            onChange(isMulti ? [] : null)
            setSearchTerm('')
        },
        [onChange, isMulti]
    )

    const toggleDropdown = useCallback(() => {
        if (!disabled) {
            setIsOpen(prev => !prev)
            if (!isOpen) setSearchTerm('')
        }
    }, [disabled, isOpen])

    const renderValue = useMemo(() => {
        if (!value || (isMulti && value.length === 0)) {
            return <span className='text-gray-400'>{placeholder}</span>
        }
        if (isMulti) {
            return (
                <div className='flex flex-wrap gap-1'>
                    {value.map(item => (
                        <div
                            key={item.value}
                            className='flex items-center bg-blue-100 text-blue-800 rounded-md px-2 py-1 text-sm'>
                            <span>{item.label}</span>
                            <button
                                type='button'
                                onClick={e => {
                                    e.stopPropagation()
                                    handleSelect(item)
                                }}
                                className='ml-1 text-blue-600 hover:text-blue-800'>
                                <X size={14} />
                            </button>
                        </div>
                    ))}
                </div>
            )
        }
        return <span className='truncate'>{value.label}</span>
    }, [value, isMulti, placeholder, handleSelect])

    return (
        <div ref={selectRef} className={`relative ${className}`}>
            <motion.div
                whileTap={{scale: disabled ? 1 : 0.98}}
                onClick={toggleDropdown}
                className={`flex items-center justify-between w-full px-3 py-2 border rounded-lg bg-white ${
                    isOpen ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-300'
                } ${disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'cursor-pointer'}`}>
                <div className='flex-grow overflow-hidden'>{renderValue}</div>
                <div className='flex items-center ml-2'>
                    {value && clearable && !disabled && (
                        <motion.button
                            whileHover={{scale: 1.1}}
                            whileTap={{scale: 0.9}}
                            type='button'
                            onClick={handleClear}
                            className='p-1 text-gray-400 hover:text-gray-600 rounded-full'>
                            <X size={16} />
                        </motion.button>
                    )}
                    <motion.div
                        animate={{rotate: isOpen ? 180 : 0}}
                        transition={{duration: 0.2}}
                        className='text-gray-400 ml-1'>
                        <ChevronDown size={18} />
                    </motion.div>
                </div>
            </motion.div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{opacity: 0, y: -10}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -10}}
                        transition={{duration: 0.15}}
                        className='absolute z-[9999] w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden'
                        style={{maxHeight: maxHeight}}>
                        {searchable && (
                            <div className='sticky top-0 p-2 bg-white border-b border-gray-100'>
                                <input
                                    ref={inputRef}
                                    type='text'
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                    placeholder='Qidirish...'
                                    className='w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500'
                                    onClick={e => e.stopPropagation()}
                                />
                            </div>
                        )}

                        <div className='max-h-64 overflow-y-auto'>
                            {filteredOptions.length > 0 ? (
                                filteredOptions.map(option => {
                                    const isSelected = isMulti
                                        ? (value || []).some(item => item.value === option.value)
                                        : value && value.value === option.value

                                    return (
                                        <motion.div
                                            key={option.value}
                                            whileHover={{backgroundColor: '#f3f4f6'}}
                                            onClick={() => handleSelect(option)}
                                            className={`flex items-center px-3 py-2 cursor-pointer ${
                                                isSelected ? 'bg-blue-50 text-blue-700' : ''
                                            }`}>
                                            {isMulti && (
                                                <div
                                                    className={`w-5 h-5 mr-2 flex items-center justify-center border rounded ${
                                                        isSelected ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
                                                    }`}>
                                                    {isSelected && <Check size={14} color='white' />}
                                                </div>
                                            )}
                                            <span className='truncate'>{option.label}</span>
                                            {!isMulti && isSelected && (
                                                <Check size={16} className='ml-auto text-blue-500' />
                                            )}
                                        </motion.div>
                                    )
                                })
                            ) : (
                                <div className='px-3 py-6 text-center text-gray-500'>{noOptionsMessage}</div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Select
