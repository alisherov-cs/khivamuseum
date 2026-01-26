import {useState} from 'react'
import {Link} from 'react-router-dom'
import Button from '../../components/ui/button'
import FormInput from '../../components/ui/inputs/input'
import {useTranslation} from 'react-i18next'
import {toast} from 'react-toastify'
import API from '../../api'
import SentEmailVerifyLink from '../../components/parts/sent_email_verify_link'

export default function UserRegister() {
    const {
        t,
        i18n: {language}
    } = useTranslation()

    const [register, setRegister] = useState({})
    const [loading, setLoading] = useState(false)
    const [isSent, setIsSent] = useState(false)

    const setUser = e => {
        const {name, value} = e.target
        setRegister(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const submit = async e => {
        e.preventDefault()
        setLoading(true)
        try {
            const {data} = await API.post('users/register', register)

            if (data.ok) {
                toast.success(t("successful_registration"))
                setIsSent(true)
            }
        } catch (err) {
            if (err.response?.data?.err) {
                toast.error(err.response.data.err)
            }
        } finally {
            setLoading(false)
        }
    }

    return isSent ? (
        <SentEmailVerifyLink data={register} />
    ) : (
        <form className='flex flex-col gap-y-6 rounded-xl'>
            <div className='space-y-2'>
                <h1 className='text-center text-xl uppercase font-semibold'>{t('sign_up')}</h1>
            </div>
            <div className='space-y-4 flex flex-col'>
                <FormInput onChange={setUser} value={register} name='first_name' placeholder={t('first_name')} />
                <FormInput onChange={setUser} value={register} name='last_name' placeholder={t('last_name')} />
                <FormInput onChange={setUser} value={register} name='email' placeholder={t('email')} />
                <FormInput
                    type='password'
                    onChange={setUser}
                    value={register}
                    name='password'
                    placeholder={t('password')}
                />
            </div>

            <Button click={submit} loading={loading}>
                {t('sign_up')}
            </Button>
            <p className='text-sm text-center font-normal'>
                {t('already_have_account')}
                <Link to={`/${language}/login`} className='text-primary font-medium ml-1'>
                    {t('login')}
                </Link>
            </p>
        </form>
    )
}
