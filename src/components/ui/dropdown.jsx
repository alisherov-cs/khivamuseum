import { AnimatePresence, motion as m } from 'framer-motion';
import { ChevronDownIcon } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export default function DropDownLink({ default_value, route, set, close }) {

    return <div className={`select-none`}>
        <div onClick={() => { set() }} className={`flex glow px-3 py-[7px] rounded-lg items-center gap-2.5 ${ default_value ? 'bg-primary' : 'glow-hover' }`}>
            <route.icon className={`size-6 ${ default_value ? 'stroke-black' : ''}`} strokeWidth={1.5} />
            <h1 className={`text-sm font-medium flex-1 ${ default_value ? 'text-black' : ''}`}>{route.title}</h1>
            <ChevronDownIcon
                className={`w-[16px] aspect-ratio transition ${ default_value ? 'rotate-180 stroke-black' : 'rotate-0' }`}
            />
        </div>
        <AnimatePresence>
            { default_value && <m.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0, transition: { type: 'keyframes', duration: .3 } }}
                transition={{ duration: 0.5, ease: "easeInOut", type: 'spring' }}
                className={`overflow-hidden transition`}
            >
                <ul className="flex flex-col pl-3 py-2 list-disc">
                    { route.children.map(( route_child ) => {
                        if(!route_child.hidden) {
                            return <NavLink
                                onClick={close}
                                key={route_child.path}
                                to={ route.path + route_child.path}
                                className={({ isActive }) => `flex glow px-4 py-1.5 rounded-lg items-center gap-2.5 ${ isActive ? 'glow-active !bg-primary/15' : '' }`}
                            >
                                { ({ isActive }) => <li className={`ml-3 ${ isActive ? 'text-primary' : 'text-text'}`}>
                                    <h1 className={`text-sm font-medium text-inherit`}>{route_child.title}</h1>
                                </li>
                                }
                            </NavLink> 
                        }
                    }) }
                </ul>
            </m.div>}
        </AnimatePresence>
    </div> 
}
