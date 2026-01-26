import { Menu, MenuButton, MenuItems } from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'

export default function DropMenu({ button, children, dropStyle = '' }) {
    return <div className="text-right">
        <Menu>
            { ({ open }) => <>
            <MenuButton className="flex items-center gap-2">
                { button }
            </MenuButton>
            <AnimatePresence>
                { open && <MenuItems
                transition
                anchor="bottom end"
                as={motion.div}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`card mt-2 min-w-52 z-[51] origin-top-right rounded-xl shadow-xl p-1 text-white transition duration-100 ease-out ${dropStyle}`}
            >
                { children }
            </MenuItems> }
            </AnimatePresence>
            </> }
        </Menu>
    </div>
}