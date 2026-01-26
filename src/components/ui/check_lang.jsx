import {useParams} from 'react-router'
import {languages} from '../../i18n'
import {useMemo} from 'react'
import NotFoundPage from '../../screen/not'

export default function CheckLang({children}) {
    const {lang} = useParams()
    const find = useMemo(() => languages.find(l => l.code === lang), [lang, languages])
    if (!find) return <NotFoundPage />
    return children
}
