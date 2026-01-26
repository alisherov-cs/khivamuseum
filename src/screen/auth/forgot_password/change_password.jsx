import {useState} from 'react'
import {Link, useNavigate, useLocation} from 'react-router-dom'
import Button from '../../../components/ui/button'
import {toast} from 'react-toastify'
import API from '../../../api'
import {useTranslation} from 'react-i18next'
import FormInput from '../../../components/ui/inputs/input'

export default function ForgotPasswordChangePassword() {
    const router = useNavigate()
    const location = useLocation()
    const {
        t,
        i18n: {language}
    } = useTranslation()
    const [loading, setLoading] = useState(false)
    const [password, setPassword] = useState('')
    const [repeat_password, setRepeatPassword] = useState('')

    const changePassword = async e => {
        e.preventDefault()
        setLoading(true)
        try {
            const params = new URLSearchParams(location.search)
            const token = params.get('token')
            if (!token) return toast.error('Token topilmadi')
            await API.post('users/forgot-password/change-password', {password}, {headers: {Authorization: token}})
            toast.success(t('password_changed'))
            router(`/${language}/login`, {replace: true})
        } catch (err) {
            toast.error(err.response?.data?.err || t("error"))
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <h1 className='text-center text-xl uppercase font-semibold mb-4'>{t('update_password')}</h1>
            <form className='flex flex-col gap-3' onSubmit={changePassword}>
                <FormInput
                    type='password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder={t('new_password')}
                />
                <FormInput
                    type='password'
                    value={repeat_password}
                    onChange={e => setRepeatPassword(e.target.value)}
                    placeholder={t('repeat_password')}
                    error={
                        password && repeat_password && password !== repeat_password ? t('passwords_do_not_match') : ''
                    }
                />
                <Button className='mt-2' click={changePassword} loading={loading}>
                    {t('change_password')}
                </Button>
            </form>
            <p className='text-sm text-center font-normal mt-4'>
                {t('havent_registered_yet')}
                <Link to={`/${language}/register`} className='text-primary font-medium ml-1'>
                    {t('sign_up')}
                </Link>
            </p>
        </>
    )
}
