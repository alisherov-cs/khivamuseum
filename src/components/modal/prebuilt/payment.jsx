import {useState} from 'react'
import {motion} from 'framer-motion'
import {CheckCircle, AlertCircle, ArrowRightIcon, ArrowLeftIcon} from 'lucide-react'
import Modal from '../modal'
import Button from '../../ui/button'
import FormInput from '../../ui/inputs/input'
import {priceFormat} from '../../../helper/price_format'
import {payment_categories} from '../../../constant'
import {useTranslation} from 'react-i18next'

export default function ModalPayments({amount = 50000, ...more}) {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null)
    const [paymentStatus, setPaymentStatus] = useState('categories') // 'success', 'error', null
    const [selectedCategory, setSelectedCategory] = useState(null)
    const {t} = useTranslation()

    const paymentCategories = [
        {id: 'local', name: 'UzCard/Humo', icon: '🇺🇿', color: 'bg-green-500'},
        {id: 'mobile', name: 'Click/Payme', icon: '📱', color: 'bg-yellow-500'},
        {id: 'international', name: 'Visa/Mastercard', icon: '🌎', color: 'bg-blue-500'}
    ]

    const resetModal = () => {
        setSelectedPaymentMethod(null)
        setSelectedCategory(null)
        setPaymentStatus(null)
    }

    const selectCategory = category => {
        setSelectedCategory(category)
        setSelectedPaymentMethod(null)
        setPaymentStatus('method')
    }

    const selectPaymentMethod = method => {
        setSelectedPaymentMethod(method)
        setPaymentStatus('payment')
    }

    const handleSubmit = e => {
        e.preventDefault()
        // Simulate payment processing
        setPaymentStatus('processing')
        setTimeout(() => {
            // Randomly succeed or fail for demonstration
            setPaymentStatus(Math.random() > 0.3 ? 'success' : 'error')
        }, 1500)
    }

    const handleBackToCategories = () => {
        setSelectedCategory(null)
        setSelectedPaymentMethod(null)
        setPaymentStatus('categories')
    }

    // Background animation pattern for the melon festival theme
    const MelonPattern = () => (
        <div className='absolute inset-0 overflow-hidden z-0 opacity-10'>
            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={i}
                    className='absolute rounded-full bg-green-600'
                    style={{
                        width: `${Math.random() * 60 + 20}px`,
                        height: `${Math.random() * 60 + 20}px`,
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`
                    }}
                    animate={{
                        y: [0, Math.random() * 30 - 15],
                        x: [0, Math.random() * 30 - 15],
                        scale: [1, Math.random() * 0.3 + 0.9]
                    }}
                    transition={{
                        duration: Math.random() * 3 + 4,
                        repeat: Infinity,
                        repeatType: 'reverse'
                    }}
                />
            ))}
        </div>
    )

    return (
        <Modal close={close} open={open} {...more} className='p-0 bg-card max-w-md relative'>
            <div className='p-6 relative z-10 overflow-hidden'>
                {paymentStatus === 'categories' && (
                    <motion.div initial={{opacity: 0}} animate={{opacity: 1}}>
                        <p className='text-primary mb-4 text-center text-lg'>{t('select_payment_method')}</p>

                        <div className='space-y-3'>
                            {payment_categories.map(category => (
                                <motion.button
                                    key={category.id}
                                    className='button bg-transparent w-full border-border border flex-row rounded-lg p-2 px-3 shadow-none justify-between items-center'
                                    onClick={() => selectCategory(category)}>
                                    <div className='flex items-center'>
                                        <span className='text-2xl mr-3 flex flex-row items-center gap-1'>
                                            {category.payments.map(item => (
                                                <img
                                                    key={item.title}
                                                    className='h-10 bg-glow_color dark:bg-white rounded-md p-1.5 object-contain object-center'
                                                    src={item.logo}
                                                    alt=''
                                                />
                                            ))}
                                        </span>
                                    </div>
                                    <ArrowRightIcon className='size-5' />
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}

                {paymentStatus === 'method' && selectedCategory && (
                    <motion.div initial={{opacity: 0, x: 30}} animate={{opacity: 1, x: 0}}>
                        <div className='flex items-center mb-6'>
                            <motion.button
                                whileHover={{scale: 1.1}}
                                whileTap={{scale: 0.9}}
                                onClick={handleBackToCategories}
                                className='mr-2 '>
                                <ArrowLeftIcon className='size-5' />
                            </motion.button>
                            <h3 className='text-lg font-medium text-primary'>
                                {paymentCategories.find(c => c.id === selectedCategory)?.name}
                            </h3>
                        </div>

                        <div className='grid grid-cols-2 gap-3'>
                            {selectedCategory.payments.map(method => (
                                <motion.button
                                    key={method.id}
                                    className={`button bg-transparent w-full border-border border flex-col rounded-lg p-3 shadow-none justify-between items-center mr-2`}
                                    onClick={() => selectPaymentMethod(method)}>
                                    <img
                                        src={method.logo}
                                        alt=''
                                        className='w-full h-[80px] object-contain object-center'
                                    />
                                    <p className='font-medium text-primary'>{method.name}</p>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}

                {paymentStatus === 'payment' && selectedPaymentMethod && (
                    <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} onSubmit={handleSubmit}>
                        <div className='flex items-center mb-6'>
                            <button
                                onClick={() => {
                                    setSelectedPaymentMethod(null)
                                    setPaymentStatus('method')
                                }}
                                className='mr-2'>
                                <ArrowLeftIcon className='size-5' />
                            </button>
                            <h3 className='text-lg font-medium text-primary'>
                                {t('pay_with', {payment: selectedPaymentMethod.title})}
                            </h3>
                        </div>

                        <selectedPaymentMethod.form amount={amount} />
                    </motion.div>
                )}

                {paymentStatus === 'processing' && (
                    <div className='flex flex-col items-center py-10'>
                        <motion.div
                            animate={{rotate: 360}}
                            transition={{duration: 1, repeat: Infinity, ease: 'linear'}}
                            className='w-16 h-16 border-4 border-yellow-200 border-t-green-500 rounded-full mb-4'></motion.div>
                        <p className='text-lg font-medium text-primary'>To'lov amalga oshirilmoqda...</p>
                        <p className='text-sm text-green-600 mt-2'>Iltimos, kutib turing</p>
                    </div>
                )}

                {paymentStatus === 'success' && (
                    <motion.div
                        initial={{opacity: 0, scale: 0.8}}
                        animate={{opacity: 1, scale: 1}}
                        className='flex flex-col items-center py-10'>
                        <motion.div
                            initial={{scale: 0}}
                            animate={{scale: 1}}
                            transition={{type: 'spring', stiffness: 200, damping: 10}}>
                            <div className='relative'>
                                <CheckCircle className='w-20 h-20 text-green-500' />
                                <motion.div
                                    className='absolute inset-0'
                                    animate={{
                                        boxShadow: ['0 0 0 0 rgba(34, 197, 94, 0.4)', '0 0 0 20px rgba(34, 197, 94, 0)']
                                    }}
                                    transition={{duration: 1.5, repeat: Infinity}}
                                />
                            </div>
                        </motion.div>
                        <h3 className='text-xl font-bold text-primary mt-4 mb-2'>To'lov muvaffaqiyatli!</h3>
                        <p className='text-green-600 mb-6'>Qovun sayliga xush kelibsiz!</p>
                        <motion.button
                            whileHover={{scale: 1.05}}
                            whileTap={{scale: 0.95}}
                            className='px-6 py-2 bg-gradient-to-r from-yellow-400 to-green-400 text-primary rounded-lg font-medium'
                            onClick={() => {
                                resetModal()
                                onClose()
                            }}>
                            Yopish
                        </motion.button>
                    </motion.div>
                )}

                {paymentStatus === 'error' && (
                    <motion.div
                        initial={{opacity: 0, scale: 0.8}}
                        animate={{opacity: 1, scale: 1}}
                        className='flex flex-col items-center py-10'>
                        <motion.div
                            initial={{scale: 0}}
                            animate={{scale: 1}}
                            transition={{type: 'spring', stiffness: 200, damping: 10}}>
                            <AlertCircle className='w-20 h-20 text-yellow-500 mb-4' />
                        </motion.div>
                        <h3 className='text-xl font-bold text-primary mb-2'>To'lovda xatolik</h3>
                        <p className='text-green-600 mb-6'>Iltimos, qaytadan urinib ko'ring</p>
                        <div className='flex space-x-4'>
                            <Button
                                type='button'
                                click={() => {
                                    resetModal()
                                    onClose()
                                }}>
                                Bekor qilish
                            </Button>
                            <Button type='button' click={() => setPaymentStatus(null)}>
                                Qayta urinish
                            </Button>
                        </div>
                    </motion.div>
                )}
            </div>
        </Modal>
    )
}
