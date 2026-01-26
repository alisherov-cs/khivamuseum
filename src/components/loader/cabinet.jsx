import { AnimatePresence, motion as m } from "framer-motion";

export default function CabinetLoader({ open }) {
  const containerVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeIn" },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.25, ease: "easeIn" },
    },
  };

  return (
    <AnimatePresence>
      {open && (
        <m.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="flex justify-center items-center bg-bgcolor-secondary absolute inset-0 z-[999]"
        >
          <svg viewBox="0 0 240 240" className="size-24">
            <circle
              strokeLinecap="round"
              strokeDashoffset="-330"
              strokeDasharray="0 660"
              strokeWidth="20"
              stroke="#f42f25"
              fill="none"
              r="105"
              cy="120"
              cx="120"
              className="pl__ring stroke-primary pl__ring--a"
            />
            <circle
              strokeLinecap="round"
              strokeDashoffset="-110"
              strokeDasharray="0 220"
              strokeWidth="20"
              stroke="#ffdd00"
              fill="none"
              r="35"
              cy="120"
              cx="120"
              className="pl__ring stroke-primary pl__ring--b"
            />
            <circle
              strokeLinecap="round"
              strokeDasharray="0 440"
              strokeWidth="20"
              stroke="#255ff4"
              fill="none"
              r="70"
              cy="120"
              cx="85"
              className="pl__ring stroke-primary pl__ring--c"
            />
            <circle
              strokeLinecap="round"
              strokeDasharray="0 440"
              strokeWidth="20"
              stroke="#2cf425"
              fill="none"
              r="70"
              cy="120"
              cx="155"
              className="pl__ring stroke-primary pl__ring--d"
            />
          </svg>
          <style jsx>{`
            .pl__ring {
              animation: ringA 2s linear infinite;
            }

            .pl__ring--a {
            }

            .pl__ring--b {
              animation-name: ringB;
            }

            .pl__ring--c {
              animation-name: ringC;
            }

            .pl__ring--d {
              animation-name: ringD;
            }

            @keyframes ringA {
              from,
              4% {
                stroke-dasharray: 0 660;
                stroke-width: 20;
                stroke-dashoffset: -330;
              }
              12% {
                stroke-dasharray: 60 600;
                stroke-width: 30;
                stroke-dashoffset: -335;
              }
              32% {
                stroke-dasharray: 60 600;
                stroke-width: 30;
                stroke-dashoffset: -595;
              }
              40%,
              54% {
                stroke-dasharray: 0 660;
                stroke-width: 20;
                stroke-dashoffset: -660;
              }
              62% {
                stroke-dasharray: 60 600;
                stroke-width: 30;
                stroke-dashoffset: -665;
              }
              82% {
                stroke-dasharray: 60 600;
                stroke-width: 30;
                stroke-dashoffset: -925;
              }
              90%,
              to {
                stroke-dasharray: 0 660;
                stroke-width: 20;
                stroke-dashoffset: -990;
              }
            }

            @keyframes ringB {
              from,
              12% {
                stroke-dasharray: 0 220;
                stroke-width: 20;
                stroke-dashoffset: -110;
              }
              20% {
                stroke-dasharray: 20 200;
                stroke-width: 30;
                stroke-dashoffset: -115;
              }
              40% {
                stroke-dasharray: 20 200;
                stroke-width: 30;
                stroke-dashoffset: -195;
              }
              48%,
              62% {
                stroke-dasharray: 0 220;
                stroke-width: 20;
                stroke-dashoffset: -220;
              }
              70% {
                stroke-dasharray: 20 200;
                stroke-width: 30;
                stroke-dashoffset: -225;
              }
              90% {
                stroke-dasharray: 20 200;
                stroke-width: 30;
                stroke-dashoffset: -305;
              }
              98%,
              to {
                stroke-dasharray: 0 220;
                stroke-width: 20;
                stroke-dashoffset: -330;
              }
            }

            @keyframes ringC {
              from {
                stroke-dasharray: 0 440;
                stroke-width: 20;
                stroke-dashoffset: 0;
              }
              8% {
                stroke-dasharray: 40 400;
                stroke-width: 30;
                stroke-dashoffset: -5;
              }
              28% {
                stroke-dasharray: 40 400;
                stroke-width: 30;
                stroke-dashoffset: -175;
              }
              36%,
              58% {
                stroke-dasharray: 0 440;
                stroke-width: 20;
                stroke-dashoffset: -220;
              }
              66% {
                stroke-dasharray: 40 400;
                stroke-width: 30;
                stroke-dashoffset: -225;
              }
              86% {
                stroke-dasharray: 40 400;
                stroke-width: 30;
                stroke-dashoffset: -395;
              }
              94%,
              to {
                stroke-dasharray: 0 440;
                stroke-width: 20;
                stroke-dashoffset: -440;
              }
            }

            @keyframes ringD {
              from,
              8% {
                stroke-dasharray: 0 440;
                stroke-width: 20;
                stroke-dashoffset: 0;
              }
              16% {
                stroke-dasharray: 40 400;
                stroke-width: 30;
                stroke-dashoffset: -5;
              }
              36% {
                stroke-dasharray: 40 400;
                stroke-width: 30;
                stroke-dashoffset: -175;
              }
              44%,
              50% {
                stroke-dasharray: 0 440;
                stroke-width: 20;
                stroke-dashoffset: -220;
              }
              58% {
                stroke-dasharray: 40 400;
                stroke-width: 30;
                stroke-dashoffset: -225;
              }
              78% {
                stroke-dasharray: 40 400;
                stroke-width: 30;
                stroke-dashoffset: -395;
              }
              86%,
              to {
                stroke-dasharray: 0 440;
                stroke-width: 20;
                stroke-dashoffset: -440;
              }
            }
          `}</style>
        </m.div>
      )}
    </AnimatePresence>
  );
}
