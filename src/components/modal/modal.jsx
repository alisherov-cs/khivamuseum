import { XIcon } from "lucide-react";
import { AnimatePresence, motion as m } from "framer-motion";
import { useEffect, useCallback, memo } from "react";

const Modal = memo(function Modal({
  open = false,
  close = () => {},
  children,
  className = "",
  xmark = true,
}) {
  const escClose = useCallback(
    (e) => {
      if (e.key === "Escape") close();
    },
    [close],
  );

  useEffect(() => {
    if (open) {
      window.addEventListener("keyup", escClose);
      return () => window.removeEventListener("keyup", escClose);
    }
  }, [open, escClose]);

  if (!open) return null;

  return (
    <AnimatePresence mode="wait">
      <m.div
        onClick={close}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.2,
        }}
        className="fixed w-full h-full bg-black/30 backdrop-blur-md top-0 left-0 z-[1000] scrollbar-none overflow-y-scroll"
      >
        <div className="p-4 py-[5vh] flex flex-col items-center justify-center min-h-full">
          <m.div
            className={`card bg-bgcolor max-w-[500px] w-full relative ${className}`}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{
              duration: 0.2,
            }}
          >
            {xmark && (
              <button
                type="button"
                onClick={close}
                className="absolute top-0 right-0 z-50 translate-x-1/3 -translate-y-1/3 rounded-full bg-red-500 border border-white p-1.5"
              >
                <XIcon className="stroke-white size-5" />
              </button>
            )}
            {children}
          </m.div>
        </div>
      </m.div>
    </AnimatePresence>
  );
});

export default Modal;
