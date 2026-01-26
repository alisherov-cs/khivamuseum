import {useTranslation} from 'react-i18next'

import useFetch from '../../../hooks/useFetch'
import {loaders_keys} from '../../../constant'
import ChangePassword from './change_password'
import SetUserData from './set_user_data'

const CabinetSettings = () => {
    const {data: user, loading} = useFetch('users/user', {loader: loaders_keys.cabinet})
    return (
        !loading && (
            <>
                <SetUserData />

                <ChangePassword />
            </>
        )
    )
}

export default CabinetSettings
