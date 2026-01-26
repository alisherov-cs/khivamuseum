import { useScroll, useTransform, motion, useSpring } from 'framer-motion';
import { useRef } from 'react';
import useDimension from '../../../hooks/useDimension';

export default function Parallax({ children, className, scroll_height = 200 }) {
  const ref = useRef(null);
  const { height } = useDimension()

  const speed = scroll_height <= 1 ? height * scroll_height : scroll_height
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // const smoothProgress = useSpring(scrollYProgress, {
  //   mass: 0.2,
  //   stiffness: 100,
  //   damping: 10,
  // });

  const y = useTransform(scrollYProgress, [0, 1], [0, -speed]);
  
  return (
      <motion.div
        className={`w-full h-full ${className || ""}`}
        style={{ y }}
      >
        {children}
      </motion.div>
  );
}
