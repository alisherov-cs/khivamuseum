

import { AnimatePresence, motion as m } from 'framer-motion'
import { XIcon } from 'lucide-react';
import { useEffect } from "react";

export default function ImageViewer({ value = { open: false }, setValue }) {
    

    const close = () => {
        setValue(prev => ({ ...prev, open: false }))
    }

    useEffect(() => {
        const escClose = (e) => {
            if(e.keyCode === 27) {
                close()
            }
        }
        window.addEventListener('keyup', escClose)
        return () => {
            window.removeEventListener('keyup', escClose)
        }
    }, [])

    return <AnimatePresence>
        { value.open && <m.div
            onClick={close}
            initial={{ opacity: 0, backdropFilter: 'none' }}
            animate={{ opacity: 1, backdropFilter: 'blur(2px)' }}
            exit={{ opacity: 0, backdropFilter: 'none', }}
            transition={{
                duration: .1
            }}
            className="fixed flex items-center justify-center w-full h-screen bg-black/30 top-0 left-0 z-[1001]"
        >
            <div className="flex items-start  justify-center scrollbar-none overflow-y-auto w-full h-full py-[5vh]">
                <div className="flex items-center justify-center w-[75%] max-[600px]:w-[90%] min-h-full">
                    <m.img
                        onClick={e => e.stopPropagation()}
                        src={value?.src}
                        alt={value?.title}
                        className="w-full rounded-lg"
                        initial={{ scale: 0.85 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.85, transition: { stiffness: 1000 } }}
                        transition={{ type: "spring", stiffness: 800, damping: 30 }}
                    />
                </div>
            </div>
            <button className='button absolute top-[12px] right-[12px]'>
                <XIcon />
            </button>
        </m.div>}
    </AnimatePresence>
}
