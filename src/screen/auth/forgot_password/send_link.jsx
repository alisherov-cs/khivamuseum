import {useState} from 'react'
import {Link} from 'react-router-dom'
import Button from '../../../components/ui/button'
import {toast} from 'react-toastify'
import API from '../../../api'
import {useTranslation} from 'react-i18next'
import FormInput from '../../../components/ui/inputs/input'
import {ArrowLeftIcon} from 'lucide-react'

export default function ForgotPasswordSendLink() {
    const {
        t,
        i18n: {language}
    } = useTranslation()
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [sent, setSent] = useState(false)

    const sendLink = async e => {
        e.preventDefault()
        setLoading(true)
        try {
            await API.post('users/forgot-password/send-link', {email})
            setSent(true)
        } catch (err) {
            toast.error(err.response?.data?.err || t("error"))
        } finally {
            setLoading(false)
        }
    }

    return sent ? (
        <div className='flex flex-col items-center justify-center min-h-[200px]'>
            <div className='rounded-full bg-green-100 p-6 mb-4'>
                <svg width='48' height='48' fill='none' viewBox='0 0 24 24' stroke='green'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 13l4 4L19 7' />
                </svg>
            </div>
            <h2 className='text-lg font-bold text-green-600 mb-2'>{t('link_sent')}</h2>
            <p className='text-text/70 text-center mb-4'>{t('link_sent_desc', {email})}</p>
            <Link
                to={`/${language}/login`}
                className='text-primary flex items-center gap-2 font-medium hover:underline'>
                <ArrowLeftIcon className='stroke-primary size-5' /> {t('back_to_login')}
            </Link>
        </div>
    ) : (
        <div className='space-y-4'>
            <h1 className='text-center text-xl uppercase font-semibold'>{t('reset_password')}</h1>
            {/* <p className='text-text/70 text-sm text-center !mt-2'>{t('')}</p> */}
            <div className='space-y-4 flex flex-col'>
                <form className='flex flex-col gap-5' onSubmit={sendLink}>
                    <FormInput
                        type='email'
                        name='email'
                        value={{email}}
                        onChange={e => setEmail(e.target.value)}
                        placeholder={t('email')}
                    />
                    <Button className={'self-center'} click={sendLink} loading={loading}>
                        {t('send')}
                    </Button>
                </form>
            </div>
            <p className='text-sm text-center font-normal'>
                {t('havent_registered_yet')}
                <Link to={`/${language}/register`} className='text-primary font-medium ml-1'>
                    {t('sign_up')}
                </Link>
            </p>
        </div>
    )
}
