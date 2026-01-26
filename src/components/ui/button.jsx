import {useState} from 'react'
import {toast} from 'react-toastify'
import {motion} from 'framer-motion'
import {useTranslation} from 'react-i18next'

const Button = ({children, className, click, loading: loading_attr, shiny = false, ...more}) => {
    const [loading, setLoading] = useState(false)
    const {t} = useTranslation()
    const onClick = async e => {
        e.preventDefault()
        if (!click) return
        setLoading(true)
        try {
            await click(e)
        } catch (error) {
            toast.error(t("error"))
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    const loader = loading_attr ?? loading

    return (
        <button
            {...(click ? {onClick} : {})}
            disabled={loader}
            className={`button relative overflow-hidden flex flex-col items-center ${className}`}
            {...more}>
            {loader && (
                <div className='absolute inset-0 flex items-center justify-center'>
                    <svg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 38 38' stroke='#fff'>
                        <g fill='none' fill-rule='evenodd'>
                            <g transform='translate(1 1)' strokeWidth='4'>
                                <circle stroke-opacity='.5' cx='18' cy='18' r='16' />
                                <path d='M34 20c0-9.94-7.08-20-20-17.5'>
                                    <animateTransform
                                        attributeName='transform'
                                        type='rotate'
                                        from='0 18 18'
                                        to='360 18 18'
                                        dur='1200ms'
                                        repeatCount='indefinite'
                                    />
                                </path>
                            </g>
                        </g>
                    </svg>
                </div>
            )}
            <span className={`text-inherit`} style={{opacity: loader ? 0 : 1}}>
                {children}
            </span>
            {shiny && (
                <motion.div
                    className='absolute h-[150%] w-5 bg-white/70 blur-lg'
                    initial={{left: '-100%', rotate: 45}}
                    animate={{left: '200%', rotate: 45}}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'linear'
                    }}
                />
            )}
        </button>
    )
}
export default Button
