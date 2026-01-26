import FormInput from '../../../components/ui/inputs/input'
import Button from '../../../components/ui/button'
import {useState} from 'react'
import API from '../../../api'
import {useTranslation} from 'react-i18next'
import {toast} from 'react-toastify'
import {useDispatch, useSelector} from 'react-redux'
import {getUser, updateUser} from '../../../store/user'

export default function SetUserData() {
    const {
        t,
        i18n: {language}
    } = useTranslation()
    const dispatch = useDispatch()
    const {user: user_data} = useSelector(getUser)

    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(false)

    const changeUser = e => {
        const {name, value} = e.target
        console.log(name, value)

        setUser(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const submit = async e => {
        e.preventDefault()
        setLoading(true)
        try {
            await API.put('/users/user', user)
                .then(({data}) => {
                    toast.success(t("changed"))
                    dispatch(updateUser(data))
                    setUser({})
                })
                .catch(err => {
                    if (err.response?.data?.err) {
                        toast.error(err.response.data.err)
                    }
                })
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className='pb-8 border-b border-border/20'>
            <h1 className='text-xl font-semibold text-text mb-4'>{t('personal_data')}</h1>
            <form onSubmit={submit} className='grid sm:grid-cols-2 gap-y-4 gap-x-7'>
                <FormInput
                    onChange={changeUser}
                    value={user}
                    defaultValue={user_data.first_name}
                    name='first_name'
                    title={t('first_name')}
                    placeholder={t('first_name')}
                />
                <FormInput
                    onChange={changeUser}
                    value={user}
                    defaultValue={user_data.last_name}
                    name='last_name'
                    title={t('last_name')}
                    placeholder={t('last_name')}
                />
                <FormInput
                    onChange={e => {
                        let raw = e.target.value

                        let cleaned = raw.replace(/[^\d+]/g, '')

                        if (cleaned[0] === '+') {
                            cleaned = '+' + cleaned.slice(1).replace(/[+]/g, '')
                        } else {
                            cleaned = '+' + cleaned.replace(/[+]/g, '')
                        }

                        cleaned = cleaned.slice(0, 16) // 1 belgi "+" + 15 ta raqam

                        changeUser({
                            target: {
                                name: e.target.name,
                                value: cleaned
                            }
                        })
                    }}
                    value={user}
                    defaultValue={user_data.phone}
                    name='phone'
                    title={t('phone')}
                    placeholder='+998901234567'
                    pattern='^\+?[1-9]\d{1,14}$'
                />
                <Button loading={loading} type='submit' className='mt-4 col-span-full place-self-end'>
                    {t('save_changes')}
                </Button>
            </form>
        </div>
    )
}
