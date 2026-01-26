import {useTranslation} from 'react-i18next'
import useFetch from '../../../hooks/useFetch'

import {loaders_keys} from '../../../constant'
import OrderItem from '../order/order_item'

export default function CabinetCanceledOrders() {
    const {
        t,
        i18n: {language}
    } = useTranslation()

    const {
        data: {items: orders},
        setData,
        loading
    } = useFetch('orders/me', {loader: loaders_keys.cabinet, query: 'status=canceled'})

    return (
        !loading && (
            <div className='w-full'>
                <h1 className='text-xl font-semibold text-text mb-4'>{t('cancelled_list')}</h1>
                <div className='flex flex-col gap-y-3 mt-5'>
                    {orders?.map((order = {}, index) => (
                        <OrderItem key={order.id} order={order} setData={setData} i={index} />
                    ))}
                </div>
            </div>
        )
    )
}
