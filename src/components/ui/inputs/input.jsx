import {useCallback, useEffect, useMemo, useState} from 'react'

export default function FormInput({
    title,
    placeholder,
    icon,
    required,
    onChange,
    name,
    value,
    error: err,
    className = '',
    inputClassName = '',
    defaultValue = '',
    ...other
}) {
    const [error, setError] = useState(err)

    useEffect(() => {
        setError(err)
    }, [err])

    const current_value = useMemo(() => {
        return (!name ? value : name && value ? value[name] : undefined) ?? defaultValue
    }, [name, value, defaultValue])

    const setValue = useCallback(
        e => {
            if (required) {
                setError(e.target.value ? '' : required)
            }
            onChange(e)
        },
        [required, onChange]
    )

    return (
        <label className={`${className}`}>
            <span className='label'>
                {title} {required && title && <span className='text-red-500'>*</span>}
            </span>
            {other.type == 'textarea' ? (
                <textarea
                    rows={6}
                    {...other}
                    name={name}
                    value={current_value}
                    onChange={setValue}
                    required={required}
                    placeholder={placeholder}
                    className={`input w-full max-h-[400px] ${error ? 'input-error' : ''} ${inputClassName}`}
                />
            ) : (
                <input
                    {...other}
                    name={name}
                    value={current_value}
                    required={required}
                    onChange={setValue}
                    placeholder={placeholder}
                    className={`input w-full ${error ? 'input-error' : ''} ${inputClassName}`}
                />
            )}
            {error && (
                <span className={`block text-xs font-medium text-red-500 mt-1 ${error ? 'opacity-100' : 'opacity-0'}`}>
                    {error || 'Xatolik'}
                </span>
            )}
        </label>
    )
}
