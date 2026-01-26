import {useEffect} from 'react'
import {useLocation} from 'react-router-dom'

export default function ScrollToTop({loading}) {
    const {pathname} = useLocation()

    useEffect(() => {
        if (!loading) {
            const pathParts = pathname.split('/') // Masalan: [ "", "uz", "news", "2" ]
            const currentLang = pathParts[1] // "uz"

            // Oldingi URL ni saqlash
            const prevPath = sessionStorage.getItem('prevPath') || ''
            const prevLang = prevPath.split('/')[1] // Oldingi til

            if (currentLang === prevLang) {
                window.scrollTo({top: 0})
            }

            // Hozirgi URL ni saqlab qo‘yamiz
            sessionStorage.setItem('prevPath', pathname)
        }
    }, [pathname, loading]) // Har safar route o'zgarganda ishlaydi

    return null
}
