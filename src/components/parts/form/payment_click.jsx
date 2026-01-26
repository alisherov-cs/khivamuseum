import {priceFormat} from '../../../helper/price_format'
import FormInput from '../../ui/inputs/input'
import Button from '../../ui/button'
import {useTranslation} from 'react-i18next'

export default function PaymentClickForm({amount = 0}) {
    const {t} = useTranslation()
    return (
        <form className='space-y-6'>
            <div className='flex flex-col gap-4'>
                <FormInput title={t('phone')} placeholder='+998901234567' />
            </div>
            <Button type='submit' className='w-full'>
                {t('pay')} - {priceFormat(amount)}
            </Button>
        </form>
    )
}
