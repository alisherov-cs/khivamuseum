import {motion} from 'framer-motion'
import {useTranslation} from 'react-i18next'
import {Link} from 'react-router-dom'

const containerVariants = {
    hidden: {opacity: 0},
    visible: {
        opacity: 1,
        transition: {
            delayChildren: 0.3,
            staggerChildren: 0.15
        }
    }
}

const itemVariants = {
    hidden: {y: 20, opacity: 0},
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: 'spring',
            stiffness: 100,
            damping: 12
        }
    }
}

const errorCircleVariants = {
    hidden: {scale: 0.8, opacity: 0},
    visible: {
        scale: 1,
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: 'easeOut'
        }
    }
}

const errorLineVariants = {
    hidden: {pathLength: 0, opacity: 0},
    visible: {
        pathLength: 1,
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: 'easeInOut',
            delay: 0.3
        }
    }
}

const melonRotateVariants = {
    initial: {rotateY: 0},
    animate: {
        rotateY: 360,
        transition: {
            duration: 4,
            repeat: Infinity,
            ease: 'linear'
        }
    }
}

const floatingAnimation = {
    initial: {y: 0},
    animate: {
        y: [0, -10, 0],
        transition: {
            duration: 3,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut'
        }
    }
}

export default function VerifyEmailError() {
    const {
        t,
        i18n: {language}
    } = useTranslation()
    return (
        <motion.div
            className='card p-0 max-w-lg rounded-2xl overflow-hidden'
            initial={{opacity: 0, y: 50}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5}}>
            {/* Header */}
            <div className='bg-red-500 py-6 px-8 text-center relative overflow-hidden'>
                <motion.div
                    className='absolute inset-0 opacity-20'
                    initial={{opacity: 0}}
                    animate={{
                        opacity: [0.1, 0.2, 0.1],
                        backgroundPosition: ['0% 0%', '100% 100%']
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        repeatType: 'mirror'
                    }}
                    style={{
                        backgroundImage:
                            "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20v20H0V0zm10 10a2 2 0 1 1 0-4 2 2 0 0 1 0 4z' fill='%23FFFFFF' fill-opacity='0.3' fill-rule='evenodd'/%3E%3C/svg%3E\")",
                        backgroundSize: '20px 20px'
                    }}
                />
                <h1 className='text-2xl font-bold text-white'>khivamuseum.uz</h1>
            </div>

            {/* Content */}
            <motion.div variants={containerVariants} initial='hidden' animate='visible' className='py-8 px-8'>
                {/* Error icon */}
                <motion.div
                    className='w-24 h-24 mx-auto mb-6 rounded-full bg-red-500/20 flex items-center justify-center'
                    variants={errorCircleVariants}>
                    <svg
                        className='w-12 h-12 text-red-500'
                        viewBox='0 0 24 24'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'>
                        <motion.path
                            d='M18 6L6 18'
                            stroke='currentColor'
                            strokeWidth='3'
                            strokeLinecap='round'
                            variants={errorLineVariants}
                        />
                        <motion.path
                            d='M6 6L18 18'
                            stroke='currentColor'
                            strokeWidth='3'
                            strokeLinecap='round'
                            variants={errorLineVariants}
                        />
                    </svg>
                </motion.div>

                {/* Error message */}
                <motion.h2 variants={itemVariants} className='text-2xl font-bold text-center my-5'>
                    {t('email_registration_failed')}!
                </motion.h2>
                {/* <motion.ul variants={itemVariants} className='bg-red-500/15 rounded-lg p-4 mb-8'>
                    {t('ui.error_reasons', {returnObjects: true}).map(t => {
                        return (
                            <li className='flex items-start mb-2'>
                                <span className='mr-2'>•</span>
                                <span>{t}</span>
                            </li>
                        )
                    })}
                </motion.ul> */}

                {/* Action buttons */}
                <motion.div variants={containerVariants} className='flex flex-col items-center space-y-3'>
                    <Link to={`/${language}/register`} className='button bg-red-500'>
                        {t('register_again')}
                    </Link>
                </motion.div>
            </motion.div>

            {/* Footer */}
            <motion.div
                className='py-4 px-8 bg-glow_color text-center text-sm'
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{delay: 1.2}}>
                <p>© 2025 khivamuseum.uz</p>
            </motion.div>
        </motion.div>
    )
}
