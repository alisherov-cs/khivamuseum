import {ArrowLeftIcon} from 'lucide-react'
import React from 'react'
import {useLocation, useNavigate} from 'react-router'

export default function CardTitle({children, back, className = ''}) {
    const location = useLocation()
    const router = useNavigate()
    const main_path = location.pathname.split('/')[1]

    return (
        <div className={`flex justify-between gap-3 mb-4 *:text-primary ${className}`}>
            <div className='flex gap-3 text-inherit'>
                {back && (
                    <button onClick={() => router(`/${main_path}`)}>
                        <ArrowLeftIcon className='size-[22px] font-bold' />
                    </button>
                )}
                <h3 className='font-semibold text-lg text-inherit'>{children}</h3>
            </div>
        </div>
    )
}
