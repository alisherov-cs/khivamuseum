import React, {useState, useEffect} from 'react'
import FormInput from './input'

const TimeRangePicker = ({
    initial_start = '08:00',
    initial_end = '17:00',
    onChange,
    title = 'Time Range',
    required = false,
    disabled = false
}) => {
    const [timeRange, setTimeRange] = useState({
        start: initial_start,
        end: initial_end
    })

    const [error, setError] = useState('')

    useEffect(() => {
        setTimeRange({
            start: initial_start,
            end: initial_end
        })
    }, [initial_start, initial_end])

    const validateTimeRange = (from, end) => {
        if (from >= end) {
            setError("Tugash vaqti boshlanish vaqtidan keyin bo'lishi shart")
            return false
        }
        setError('')
        return true
    }

    const handleTimeChange = e => {
        const {name, value} = e.target
        const newTimeRange = {...timeRange, [name]: value}

        if (validateTimeRange(name === 'from' ? value : timeRange.start, name === 'end' ? value : timeRange.end)) {
            setTimeRange(newTimeRange)
            if (onChange) onChange(newTimeRange)
        }
    }

    return (
        <div className='mb-4'>
            {title && (
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                    {title} {required && <span className='text-red-500'>*</span>}
                </label>
            )}

            <div className={`flex items-center space-x-4 ${disabled ? 'opacity-50' : ''}`}>
                <div className='flex flex-col flex-1'>
                    <FormInput
                        type='time'
                        name='start'
                        title='Boshlanish'
                        required='Kiritish zarur'
                        value={timeRange.start}
                        onChange={handleTimeChange}
                        disabled={disabled}
                    />
                </div>

                <div className='flex flex-col flex-1'>
                    <FormInput
                        type='time'
                        name='end'
                        title='Tugash'
                        value={timeRange.end}
                        onChange={handleTimeChange}
                        disabled={disabled}
                        min={timeRange.start}
                    />
                </div>
            </div>

            {error && <p className='mt-1 text-sm text-red-600'>{error}</p>}
        </div>
    )
}

export default TimeRangePicker
