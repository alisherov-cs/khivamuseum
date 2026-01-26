import {motion} from 'framer-motion'
import {useTranslation} from 'react-i18next'
import {Link} from 'react-router-dom'

const containerVariants = {
    hidden: {opacity: 0},
    visible: {
        opacity: 1,
        transition: {
            delayChildren: 0.3,
            staggerChildren: 0.2
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

const checkmarkVariants = {
    hidden: {pathLength: 0, opacity: 0},
    visible: {
        pathLength: 1,
        opacity: 1,
        transition: {
            duration: 0.8,
            ease: 'easeInOut'
        }
    }
}

const melonBounceVariants = {
    initial: {y: 0, rotate: 0},
    animate: {
        y: [0, -15, 0],
        rotate: [0, 10, -10, 0],
        transition: {
            duration: 1.5,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut'
        }
    }
}

export default function VerifyEmailSucces() {
    const {t} = useTranslation()
    return (
        <motion.div
            className='card p-0 rounded-2xl max-w-lg overflow-hidden'
            initial={{opacity: 0, y: 50}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5}}>
            {/* Header */}
            <div className='bg-primary py-6 px-8 text-white text-center relative overflow-hidden'>
                <motion.div
                    className='absolute inset-0 opacity-30'
                    initial={{opacity: 0}}
                    animate={{
                        opacity: [0.1, 0.3, 0.1],
                        backgroundPosition: ['0% 0%', '100% 100%']
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        repeatType: 'reverse'
                    }}
                    style={{
                        backgroundImage:
                            "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20v20H0V0zm10 10a2 2 0 1 1 0-4 2 2 0 0 1 0 4z' fill='%23FFFFFF' fill-opacity='0.3'/%3E%3C/svg%3E\")",
                        backgroundSize: '20px 20px'
                    }}
                />
                <h1 className='text-2xl font-bold text-white'>khivamuseum.uz</h1>
            </div>

            {/* Content */}
            <motion.div
                variants={containerVariants}
                initial='hidden'
                animate='visible'
                className='flex flex-col items-center py-8 px-8'>
                {/* Success icon */}
                <motion.div
                    className='w-24 h-24 mx-auto mb-6 rounded-full bg-primary flex items-center justify-center'
                    initial={{scale: 0}}
                    animate={{scale: 1}}
                    transition={{
                        type: 'spring',
                        stiffness: 200,
                        damping: 15,
                        delay: 0.2
                    }}>
                    <svg className='w-12 h-12' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <motion.path
                            d='M5 13L9 17L19 7'
                            stroke='#ffffff'
                            strokeWidth='3'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            variants={checkmarkVariants}
                        />
                    </svg>
                </motion.div>

                {/* Success message */}
                <motion.h2 variants={itemVariants} className='text-2xl font-bold text-center mb-3'>
                    {t('email_accepted')}!
                </motion.h2>

                <motion.p variants={itemVariants} className='text-text/80 text-center mb-8'>
                    {t('email_accepted_message')}
                </motion.p>

                {/* Button */}
                <Link to='/' className='max-w-sm w-full'>
                    <motion.div className='button' whileHover={{scale: 1.03}} whileTap={{scale: 0.98}}>
                        {t('home')}
                    </motion.div>
                </Link>
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
