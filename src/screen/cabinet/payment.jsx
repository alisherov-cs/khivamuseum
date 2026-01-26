import useFetch from '../../hooks/useFetch'
import {useTranslation} from 'react-i18next'
import {loaders_keys, PAYMENT_STATUSES} from '../../constant'
import {motion} from 'framer-motion'
import {ArrowUpRightIcon} from 'lucide-react'
import {priceFormat} from '../../helper/price_format'
import {format_date} from '../../helper/date_format'

export default function CabinetPayments() {
    const {t} = useTranslation()

    const {
        data: {items: transfers},
        loading
    } = useFetch('payment/user', {loader: loaders_keys.cabinet})
    return (
        !loading && (
            <>
                <h1 className='text-xl font-semibold text-text mb-4'>{t('transfer_history')}</h1>
                <div className='space-y-3'>
                    {transfers?.map((payment, index) => (
                        <motion.div
                            key={payment.id}
                            className='bg-white rounded-xl p-6 border border-[#022133]/10'
                            initial={{opacity: 0, x: -20}}
                            animate={{opacity: 1, x: 0}}
                            transition={{delay: index * 0.1}}>
                            <div className='flex justify-between items-center'>
                                <div className='flex items-center space-x-4'>
                                    <div className='w-12 h-12 bg-[#277fb3]/10 rounded-full flex items-center justify-center'>
                                        <ArrowUpRightIcon className='w-6 h-6 text-[#277fb3]' />
                                    </div>
                                    <div>
                                        <p className='font-semibold text-[#022133]'>Chipta #{payment.order_id}</p>
                                        <p className='text-sm text-[#022133]/60'>
                                            {payment.provider} •{' '}
                                            {format_date(payment.paid_time, {format: ['date', 'time']})}
                                        </p>
                                    </div>
                                </div>
                                <div className='text-right'>
                                    <p className='text-xl font-bold text-[#022133]'>
                                        {priceFormat(payment.order.total_price)}
                                    </p>
                                    <span
                                        className={`text-xs px-2 py-1 rounded-full`}
                                        style={{
                                            backgroundColor: `${PAYMENT_STATUSES[payment.status].color}22`,
                                            color: PAYMENT_STATUSES[payment.status].color
                                        }}>
                                        {PAYMENT_STATUSES[payment.status].title}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </>
        )
    )
}
