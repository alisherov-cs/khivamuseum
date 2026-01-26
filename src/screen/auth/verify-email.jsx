import {useState, useEffect} from 'react'
import VerifyEmailSucces from './verify/succes'
import VerifyEmailError from './verify/error'
import {updateLoader} from '../../store/user'
import {useDispatch} from 'react-redux'
import {useSearchParams} from 'react-router-dom'
import API from '../../api'

export default function VerificationEmail() {
    const [params] = useSearchParams()
    const [status, setStatus] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        const token = params.get('token')
        const verifyUser = async () => {
            dispatch(updateLoader({value: {loading: true}}))
            try {
                const {data} = await API.get(`users/user/verify?verifyToken=${token}`)
                if (data) {
                    setStatus(true)
                }
            } catch (err) {
                setStatus(false)
            } finally {
                dispatch(updateLoader({value: {loading: false}}))
            }
        }
        if (token) verifyUser()
    }, [])
    return (
        <div className='min-h-screen bg-gradient-to-br from-primary/20 to-primary/15 flex items-center justify-center p-4'>
            {status !== null && (status ? <VerifyEmailSucces /> : <VerifyEmailError />)}
        </div>
    )
}
