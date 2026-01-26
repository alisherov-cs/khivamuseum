import {priceFormat} from '../../../helper/price_format'
import FormInput from '../../ui/inputs/input'
import Button from '../../ui/button'
import {useTranslation} from 'react-i18next'

export default function PaymentInternationalForm({amount = 0}) {
    const {t} = useTranslation()
    return (
        <form className='space-y-6'>
            <div className='flex flex-col gap-4'>
                <FormInput title={t('card_number')} placeholder='0000 0000 0000 0000' />

                <div className='grid grid-cols-2 gap-4'>
                    <FormInput title={t('card_expiry')} placeholder='MM/YY' />
                    <FormInput title='CVV' placeholder='000' />
                </div>
            </div>
            <Button type='submit' className='w-full'>
                {t('pay')} - {priceFormat(amount)}
            </Button>
        </form>
    )
}
