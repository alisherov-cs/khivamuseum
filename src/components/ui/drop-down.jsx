import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const dropdownVariants = {
    hidden: {
        opacity: 0,
        y: -10,
        transition: {
            duration: 0.15,
            ease: "easeInOut",
        },
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.25,
            ease: "easeInOut",
        },
    },
    exit: {
        opacity: 0,
        y: 10,
        transition: {
            duration: 0.15,
            ease: "easeInOut",
        },
    },
};

export default function DropDown({
    title,
    className = "",
    titleClassName = "",
    alignClassName = "",
    children,
    vector = <ChevronDown size={20} className="stroke-white" />,
    hover = true,
    dropClickClose,
}) {
    const [open, setOpen] = useState(false);

    return (
        <button
            onClick={() => setOpen((prev) => !prev)}
            onMouseEnter={() =>
                hover && window.innerWidth >= 768 && setOpen(true)
            }
            onMouseLeave={() => setOpen(false)}
            className={`relative p-2 py-1 ${vector ? "pl-0.5" : ""} ${className}`}
        >
            <div
                className={`flex items-center h-full gap-1 z-[3] font-medium glow-hover ${
                    open ? "" : ""
                } ${titleClassName}`}
            >
                {title}
                {vector && (
                    <div
                        className={`transition stroke-white! ${open ? "rotate-180" : ""}`}
                    >
                        {vector}
                    </div>
                )}
            </div>

            <AnimatePresence>
                {open && (
                    <motion.div
                        className={`absolute pt-3 z-[999] ${alignClassName}`}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={dropdownVariants}
                        onClick={(e) => {
                            if (dropClickClose) {
                                setOpen(false);
                            }
                            e.stopPropagation();
                        }}
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </button>
    );
}
