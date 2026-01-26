import { motion } from "framer-motion"
import { useState } from "react"

export default function Switch({ onChange, value, className = '' }) {
    const [isOn, setIsOn] = useState(value)

    const toggleSwitch = () => {
        const value = !isOn
        setIsOn(value)
        if(onChange) onChange(value)
    }

    return (
        <button
            className={`flex rounded-full p-1 w-12 ${ isOn ? 'bg-primary' : 'bg-border' } ${className}`}
            style={{
                justifyContent: !isOn ? 'start' : 'end'
            }}
            onClick={toggleSwitch}
        >
            <motion.div
                className={`rounded-full w-1/2 aspect-square ${ isOn ? 'bg-white' : 'bg-primary' }`}
                layout
                transition={{
                    type: "spring",
                    visualDuration: 0.2,
                    bounce: 0.2,
                }}
            />
        </button>
    )
}
