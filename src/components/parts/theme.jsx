import {MoonIcon, SunIcon} from 'lucide-react'
import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getUser, updateTheme} from '../../store/user'

export default function ThemeButton() {
    const {theme} = useSelector(getUser)
    const dispatch = useDispatch()

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [theme])

    return (
        <button
            onClick={() => dispatch(updateTheme(theme === 'dark' ? 'light' : 'dark'))}
            className='flex items-center justify-center'>
            {theme == 'dark' ? <SunIcon className='size-6' /> : <MoonIcon className='size-6' />}
        </button>
    )
}
