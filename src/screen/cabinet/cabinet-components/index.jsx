import {useState} from 'react'
import {useTranslation} from 'react-i18next'
import './profile.css'
import {Link, NavLink, Outlet, useLocation, useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {logoutUser} from '../../../store/user'
import {toast, Bounce} from 'react-toastify'

const ProfileInfo = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const {t} = useTranslation()

    const handleLogout = () => {
        setLoading(true)

        setTimeout(() => {
            toast.success('You successfully logged out!', {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
                transition: Bounce
            })
        }, 1000)

        setTimeout(() => {
            dispatch(logoutUser())
            navigate('/')
            setLoading(false)
        }, 2000)
    }
    return (
        <>
            <header className='bg-[#2980B3] w-full py-6'>
                <div className='container'>
                    <div className='nav-bar flex items-center justify-between'>
                        <Link to='/' className='block'>
                            <h1 className='text-2xl font-bold text-white'>Web Logo</h1>
                        </Link>
                        <div className='flex items-center gap-x-4'>
                            <NavLink to='request'>
                                <button
                                    className={`${
                                        location.pathname === '/profile/request'
                                            ? 'bg-white bg-opacity-[14%]'
                                            : 'hover:bg-white hover:bg-opacity-[14%]'
                                    } cursor-pointer flex items-center sm:gap-x-2 py-3 sm:px-5 px-3 duration-300 rounded-full text-white font-semibold text-lg`}>
                                    {t('my_applications')}
                                </button>
                            </NavLink>

                            <NavLink to='history'>
                                <button
                                    className={`${
                                        location.pathname === '/profile/history'
                                            ? 'bg-white bg-opacity-[14%]'
                                            : 'hover:bg-white hover:bg-opacity-[14%]'
                                    } cursor-pointer flex items-center sm:gap-x-2 py-3 sm:px-5 px-3 duration-300 rounded-full text-white font-semibold text-lg`}>
                                    {t('application_history')}
                                </button>
                            </NavLink>
                        </div>
                        <div className=''>
                            <button
                                disabled={loading}
                                onClick={handleLogout}
                                className='hover:bg-white  py-3 sm:px-8 px-3 min-w-[150px] cursor-pointer hover:bg-opacity-[14%]  duration-300 rounded-full text-white font-semibold text-lg'>
                                {loading ? (
                                    <div className='flex w-full items-center  justify-center gap-x-2'></div>
                                ) : (
                                    <div className='flex items-center justify-center gap-x-2'>
                                        <span>{t('logout')}</span>
                                        <span>
                                            <i className='fa-regular fa-right-from-bracket'></i>
                                        </span>
                                    </div>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            <section className='bg-gray-100'>
                <div className='container'>
                    <Outlet />
                </div>
            </section>
        </>
    )
}

export default ProfileInfo
