import {useSelector} from 'react-redux'
import {getUser} from '../../store/user'
import {default_loader} from '../../constant'

export default function IsLoading(loader_key = default_loader) {
    const loaders = useSelector(getUser)

    if (!loaders[loader_key]) return false

    const {unknown_loaders = 0, ...others} = loaders[loader_key]

    const others_values = Object.values(others)

    return unknown_loaders > 0 || others_values.some(status => status === true)
}
