import {useEffect, useState} from 'react'

export default function useTheme() {
    const [theme, setTheme] = useState(document.documentElement.classList.contains('dark') ? 'dark' : 'light')

    useEffect(() => {
        const updateTheme = () => {
            setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light')
        }
        const observer = new MutationObserver(updateTheme)
        observer.observe(document.documentElement, {attributes: true, attributeFilter: ['class']})
        const mq = window.matchMedia('(prefers-color-scheme: dark)')
        mq.addEventListener('change', updateTheme)
        return () => {
            observer.disconnect()
            mq.removeEventListener('change', updateTheme)
        }
    }, [])

    return theme
}
