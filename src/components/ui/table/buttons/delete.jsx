import {Trash2Icon} from 'lucide-react'

export default function TableButtonDelete({children, click, className = '', modal, setModal, ...more}) {
    return (
        <button
            onClick={e => {
                if (modal) {
                    setModal({...modal, next: click})
                } else {
                    click(e)
                }
            }}
            className={`card items-center justify-center bg-red-500 px-2 py-1 rounded-md ${className}`}
            {...more}>
            {children ?? <Trash2Icon className='size-5' stroke='white' />}
        </button>
    )
}
