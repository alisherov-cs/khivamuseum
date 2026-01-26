import React from 'react'
import {Link} from 'react-router-dom'
import {AlertCircle, PhoneCall, ArrowRight} from 'lucide-react'
import Modal from '../modal'
import {useTranslation} from 'react-i18next'

export default function ModalPhoneNumberNotVerify({...more}) {
    // Modal animatsiya variantlari
    const {
        t,
        i18n: {language}
    } = useTranslation()

    return (
        <Modal {...more}>
            {/* Modal asosiy qismi */}
            <div className='flex flex-col items-center p-5'>
                {/* Xabar va icon */}
                <div className='flex flex-col items-center text-center mb-6'>
                    <div className='h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-4'>
                        <AlertCircle size={40} className='stroke-primary' />
                    </div>
                    <h2 className='text-2xl font-bold mb-2'>Telefon raqamingiz tasdiqlanmagan!</h2>
                    <p className='text-text/80 mb-2'>
                        Qovun sayli chiptalari sotib olish uchun avval telefon raqamingizni tasdiqlash lozim.
                    </p>
                    <p className='text-sm text-text/80'>
                        Bu xavfsizligingiz va chipta ma'lumotlarini olish imkoniyati uchun zarur.
                    </p>
                </div>

                {/* Tasdiqlash tugmasi */}
                <Link to={`/${language}/profile`} className='button rounded-full bg-secondary'>
                    <div className='flex items-center gap-3'>
                        <PhoneCall size={18} className='stroke-white' />
                        <span className='text-white'>Raqamni tasdiqlashga o'tish</span>
                        <ArrowRight size={18} className='stroke-white' />
                    </div>
                </Link>
            </div>
        </Modal>
    )
}
