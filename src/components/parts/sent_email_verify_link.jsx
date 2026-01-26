import {motion} from 'framer-motion'
import {Check, Mail, ArrowRight} from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function SentEmailVerifyLink({data}) {
    const {t} = useTranslation()
    return (
        <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5}}
            className='overflow-hidden '>
            {/* Card header with festival colors */}
            <div className=''>
                {/* Success icon */}
                <motion.div
                    className='mx-auto mb-4 bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center'
                    initial={{scale: 0}}
                    animate={{scale: 1, rotate: 360}}
                    transition={{type: 'spring', stiffness: 260, damping: 20}}>
                    <Mail className='h-8 w-8 stroke-primary' />
                </motion.div>

                {/* Main heading */}
                <motion.h2
                    className='text-center text-2xl font-bold mb-2'
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: 0.3}}>
                    {t("confirm_email")}
                </motion.h2>

                {/* Descriptive text */}
                <motion.p
                    className='text-center text-text/80 mb-6'
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: 0.4}}>
                    {t("thank_you_for_registering")}
                </motion.p>

                {/* Melon themed decoration */}
                <div className='flex justify-center mb-6'>
                    <div className='flex space-x-3'>
                        <motion.div
                            className='w-4 h-4 rounded-full bg-primary'
                            animate={{y: [0, -10, 0]}}
                            transition={{repeat: Infinity, duration: 1.5, delay: 0}}
                        />
                        <motion.div
                            className='w-4 h-4 rounded-full bg-primary/50'
                            animate={{y: [0, -10, 0]}}
                            transition={{repeat: Infinity, duration: 1.5, delay: 0.3}}
                        />
                        <motion.div
                            className='w-4 h-4 rounded-full bg-primary'
                            animate={{y: [0, -10, 0]}}
                            transition={{repeat: Infinity, duration: 1.5, delay: 0.6}}
                        />
                    </div>
                </div>

                {/* Info box */}
                <motion.div
                    className='bg-secondary/5 border border-secondary/50 rounded-lg p-4 mb-6'
                    initial={{opacity: 0, x: -20}}
                    animate={{opacity: 1, x: 0}}
                    transition={{delay: 0.5}}>
                    <div className='flex items-start'>
                        <div className='flex-shrink-0'>
                            <Check className='size-5 stroke-secondary' />
                        </div>
                        <div className='ml-3'>
                            <p className='text-sm text-text/80'>
                                {t("please_check_email")}
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Action buttons */}
                <div className='flex flex-col space-y-3'>
                    <a className='button flex flex-row items-center justify-center' href={`mailto: ${data.email}`}>
                        <span>{t("check_email")}</span>
                        <ArrowRight className='ml-2 h-4 w-4' />
                    </a>

                    {/* <motion.a
                        whileHover={{scale: 1.02}}
                        whileTap={{scale: 0.98}}
                        className='flex items-center justify-center px-4 py-2 border border-green-500 text-green-500 rounded-lg font-medium hover:bg-green-50 transition-colors duration-200'
                        href='#'>
                        <span>Qaytadan yuborish</span>
                        <Loader2 className='ml-2 h-4 w-4 animate-spin' />
                    </motion.a> */}
                </div>


            </div>
        </motion.div>
    )
}
