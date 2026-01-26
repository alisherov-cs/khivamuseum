import {useEffect, useState} from 'react'
import {useLocation, Link} from 'react-router-dom'
import API from '../../../api'
import {useTranslation} from 'react-i18next'
import {useDispatch} from 'react-redux'
import {updateLoader} from '../../../store/user'
import ForgotPasswordChangePassword from './change_password'
import {ArrowLeftIcon} from 'lucide-react'

export default function ForgotPasswordVerify() {
    const dispatch = useDispatch()
    const location = useLocation()
    const {
        t,
        i18n: {language}
    } = useTranslation()
    const [tokenValid, setTokenValid] = useState(false)

    useEffect(() => {
        const params = new URLSearchParams(location.search)
        const token = params.get('token')

        if (!token) {
            dispatch(updateLoader({value: {loading: false}}))
            setTokenValid(false)
            return
        }
        const checkToken = async () => {
            try {
                dispatch(updateLoader({value: {loading: true, loader_key: 'forgot_password_verify'}}))
                const response = await API.get('users/user', {
                    headers: {Authorization: token}
                })

                if (response.data.id) {
                    setTokenValid(true)
                } else {
                    setTokenValid(false)
                }
            } catch (err) {
                setTokenValid(false)
            } finally {
                dispatch(updateLoader({value: {loading: false}}))
            }
        }
        checkToken()
    }, [location.search])

    return !tokenValid ? (
        <div className='flex flex-col items-center justify-center min-h-[300px]'>
            <div className='rounded-full bg-red-100 p-6 mb-4'>
                <svg width='48' height='48' fill='none' viewBox='0 0 24 24' stroke='red'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
                </svg>
            </div>
            <h2 className='text-xl font-bold text-red-600 text-center mb-2'>{t('token_expired_or_invalid')}</h2>
            {/* <p className='text-text/70 text-center mb-4'>{t('ui.token_invalid_or_expired_desc')}</p> */}
            <Link
                to={`/${language}/login/forgot-password`}
                className='text-primary flex items-center gap-2 font-medium hover:underline'>
                <ArrowLeftIcon className='stroke-primary size-5' />
                {t('try_again')}
            </Link>
        </div>
    ) : (
        <ForgotPasswordChangePassword />
    )
}
