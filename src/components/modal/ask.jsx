import Button from "../ui/button";
import Modal from "./modal";
import { useState } from 'react'

export default function ModalAsk({ open, close, children, next }) {
    const [ loading, setLoading ] = useState(false)

    const nextClick = async (e) => {
        setLoading(true)
        try {
            await next(e)
        } finally {
            setLoading(false)
            close()
        }
    }

    return <Modal close={close} open={open}>
        { children }
        <div className='flex justify-end gap-2 mt-4'>
            <Button type='button' className='bg-green-600 !text-white' click={close}>
                Yo'q
            </Button>
            <Button className='bg-red-500 !text-white' click={nextClick} loading={loading}>
                Ha
            </Button>
        </div>
    </Modal>
}
