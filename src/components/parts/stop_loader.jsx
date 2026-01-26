import {useDispatch} from 'react-redux'
import {updateLoader} from '../../store/user'
import {useEffect} from 'react'
import {Outlet} from 'react-router'

export default function StopLoader() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(updateLoader({value: {key: 'begin', loading: false}}))
    }, [])

    return <Outlet />
}
