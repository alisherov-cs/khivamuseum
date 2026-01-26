import {PencilIcon} from 'lucide-react'

export default function TableButtonEdit({children, className = '', ...more}) {
    return (
        <button className={`card items-center justify-center bg-green-700 px-2 p-1 rounded-md ${className}`} {...more}>
            {children ?? <PencilIcon className='size-4' stroke='white' />}
        </button>
    )
}
