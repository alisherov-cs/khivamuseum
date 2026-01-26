import {useState} from 'react'
import {languages} from '../../i18n'

export default function LanguageCard({children, className = ''}) {
    const [open, setOpen] = useState(languages[0])

    const changeLanguage = lang => {
        setOpen(lang)
    }

    return (
        <div>
            <div className='flex overflow-x-auto gap-1 !mb-4'>
                {languages.map(lang => {
                    const active = open.code === lang.code
                    return (
                        <button
                            title={`${lang.lang} tili`}
                            type='button'
                            onClick={() => changeLanguage(lang)}
                            className={`p-2 px-3 rounded glow border-none ${active ? 'bg-primary' : ''}`}>
                            <div className={`transition uppercase font-bold ${active ? 'scale-110 text-white' : ''}`}>
                                {lang.short}
                            </div>
                        </button>
                    )
                })}
            </div>
            <div className={className}>{children(open)}</div>
        </div>
    )
}
