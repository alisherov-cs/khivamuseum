import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

export default function BounceCards({
  className = "",
  images = [],
  containerWidth = 400,
  containerHeight = 400,
  animationDelay = 0.5,
  animationStagger = 0.06,
  transformStyles = [
    "rotate(10deg) translate(-170px)",
    "rotate(5deg) translate(-85px)",
    "rotate(-3deg)",
    "rotate(-10deg) translate(85px)",
    "rotate(2deg) translate(170px)"
  ],
  enableHover = true
}) {
  const controls = useAnimation();
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start((i) => ({
            scale: 1,
            opacity: 1,
            transition: {
              delay: animationDelay + i * animationStagger,
              type: "spring",
              stiffness: 120,
              damping: 20
            }
          }));
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, [controls, animationDelay, animationStagger]);

  const pushSiblings = (hoveredIdx) => {
    if (!enableHover) return;

    images.forEach((_, i) => {
      if (i === hoveredIdx) {
        controls.start((idx) =>
          idx === i
            ? { rotate: 0, scale: 1.1, transition: { duration: 0.3 } }
            : {}
        );
      } else {
        const offsetX = i < hoveredIdx ? -160 : 160;
        controls.start((idx) =>
          idx === i
            ? { x: offsetX, transition: { duration: 0.3 } }
            : {}
        );
      }
    });
  };

  const resetSiblings = () => {
    if (!enableHover) return;
    controls.start((i) => ({
      x: 0,
      rotate: parseFloat(transformStyles[i]?.match(/rotate\(([-0-9.]+)deg\)/)?.[1]) || 0,
      scale: 1,
      transition: { duration: 0.4 }
    }));
  };

  return (
    <div
      ref={containerRef}
      className={`bounceCardsContainer ${className}`}
      style={{
        position: "relative",
        width: containerWidth,
        height: containerHeight
      }}
    >
      {images.map((src, idx) => (
        <motion.div
          key={idx}
          custom={idx}
          initial={{ scale: 0, opacity: 0 }}
          animate={controls}
          className={`bounce-card absolute bounce-card-${idx}`}
          style={{
            transform: transformStyles[idx] ?? "none",
            zIndex: idx === 2 ? 10 : 5 // O‘rtadagi rasm oldinga chiqadi
          }}
          onMouseEnter={() => pushSiblings(idx)}
          onMouseLeave={resetSiblings}
        >
          <img className="image" src={src} alt={`bounce-card-${idx}`} />
        </motion.div>
      ))}
    </div>
  );
}
