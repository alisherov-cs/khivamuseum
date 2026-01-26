import {motion} from 'framer-motion'
import {Home, RefreshCw} from 'lucide-react'
import {useTranslation} from 'react-i18next'
import {Link} from 'react-router-dom'

const NotFoundPage = () => {
    const {t} = useTranslation()
    return (
        <div className='min-h-screen bg-primary/5 flex flex-col items-center justify-center p-6 overflow-hidden'>
            <h1 className='font-bold text-2xl'>NOT FOUND</h1>
        </div>
    )
}

export default NotFoundPage
