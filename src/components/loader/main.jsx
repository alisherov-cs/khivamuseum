import { useEffect } from "react";
import { AnimatePresence, motion as m } from "framer-motion";

export default function LoaderMain({ open }) {
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "auto";
    }, [open]);

    return (
        <AnimatePresence initial={false}>
            {open && (
                <m.div
                    initial={{ opacity: 0, transition: { duration: 0 } }}
                    animate={{ opacity: 1, transition: { duration: 0 } }}
                    exit={{ opacity: 0, transition: { duration: 0.2 } }}
                    className="bg-bgcolor !fixed z-[1100] loader-container w-screen h-screen flex flex-col justify-center items-center"
                >
                    <div className="w-40 aspect-square relative flex flex-col items-center justify-center">
                        <img
                            className="w-[55%] h-[55%] object-contain animate-scale !duration-100"
                            src={"/images/logo.png"}
                            alt="Loading..."
                        />
                        <div className="absolute top-0 w-full aspect-square border-[3px] border-glow_color border-t-secondary rounded-full animate-spin"></div>
                    </div>
                </m.div>
            )}
        </AnimatePresence>
    );
}
