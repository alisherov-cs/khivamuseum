import {useState} from 'react'
import ReactTelephoneInput from 'react-telephone-input'

export default function PhoneInput() {
    const [phone, setPhone] = useState('')

    return (
        <ReactTelephoneInput
            className='input'
            defaultCountry='uz'
            value={phone}
            onChange={setPhone}
            inputStyle={{
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid #ddd'
            }}
        />
    )
}
