import {useState} from 'react'

import {toast} from 'react-toastify'
import FormInput from '../../../components/ui/inputs/input'
import Button from '../../../components/ui/button'
import API from '../../../api'
import { useTranslation } from 'react-i18next'

export default function ChangePassword() {
    const {t} = useTranslation()
    const [user, setUser] = useState({})

    const changeUser = (name, value) => {
        setUser(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const submit = async e => {
        e.preventDefault()
        if (!user.password || !user.reset_password || user.password !== user.reset_password) {
            toast.error(t("passwords_do_not_match"))
            return
        }
        try {
            await API.put('/users/user/password', {old_password: user.old_password, password: user.password})
                .then(() => {
                    toast.success(t("password_changed"))
                    setUser({})
                })
                .catch(err => {
                    if (err.response?.data?.err) {
                        toast.error(err.response.data.err)
                    }
                })
        } finally {
        }
    }

    return (
        <div className='pt-8'>
            <h1 className='text-xl font-semibold text-text mb-4'>{t("change_password")}</h1>

            <form className='grid sm:grid-cols-2 gap-y-4 gap-x-7'>
                <div className='flex-[1_1_300px]'>
                    <FormInput
                        className
                        name='old_password'
                        value={user}
                        title={t("old_password")}
                        required={t("old_password_required")}
                        placeholder={t("password")}
                        onChange={e => changeUser('old_password', e.target.value)}
                    />
                </div>
                <div className='flex-[1_1_300px]'>
                    <FormInput
                        title={t("new_password")}
                        name='password'
                        value={user}
                        required={t("new_password_required")}
                        placeholder={t("password")}
                        onChange={e => changeUser('password', e.target.value)}
                    />
                </div>
                <div className='flex-[1_1_300px]'>
                    <FormInput
                        name='reset_password'
                        value={user}
                        title={t("repeat_new_password")}
                        required={t("repeat_new_password_required")}
                        placeholder={t("password")}
                        onChange={e => changeUser('reset_password', e.target.value)}
                    />
                </div>
                <Button className='col-span-full place-self-end' click={submit}>
                    {t("change_password")}
                </Button>
            </form>
        </div>
    )
}
