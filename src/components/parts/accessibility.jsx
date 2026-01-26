import {MoonIcon, SunIcon} from 'lucide-react'
import {useDispatch, useSelector} from 'react-redux'
import {getUser, updateTheme} from '../../store/user'
import Switch from '../ui/switch'
import SwitchMulti from '../ui/switch/multi'
import TextSizeController from '../ui/text_size'
import {useTranslation} from 'react-i18next'
import {useMemo} from 'react'

export default function Accessibility() {
    const {theme} = useSelector(getUser)

    const themeData = useMemo(() => {
        return [
            {
                title: <SunIcon />,
                theme: 'light'
            },
            {
                title: <MoonIcon />,
                theme: 'dark'
            }
        ]
    }, [])

    const dispatch = useDispatch()
    const {t} = useTranslation()
    const changeTheme = ({item}) => {
        dispatch(updateTheme(item.theme))
    }

    const onGray = isOn => {
        if (isOn) {
            document.body.style.filter = 'grayscale(1)'
            localStorage.setItem('gray', true)
        } else {
            document.body.style.filter = 'grayscale(0)'
            localStorage.removeItem('gray')
        }
    }

    return (
        <div className='card'>
            <div className='flex flex-col items-center gap-2'>
                <p>{t('font_size')}</p>
                <TextSizeController />
            </div>
            <div>
                <h3 className='text-center mb-2'>{t('theme_select')}</h3>
                <SwitchMulti
                    name='accessibility'
                    value={theme === 'dark' ? 1 : 0}
                    options={themeData}
                    onChange={changeTheme}
                />
            </div>
            <div className='mt-6 flex justify-between gap-2 items-center pl-2 pr-1 text-start'>
                <p>{t('grayscale')}</p>
                <Switch onChange={onGray} value={localStorage.getItem('gray')} />
            </div>
        </div>
    )
}
