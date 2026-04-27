import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface Heart {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
}

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * (30 - 10) + 10,
      duration: Math.random() * (15 - 5) + 8,
      delay: Math.random() * 10,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" id="floating-hearts">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: '110vh', opacity: 0, scale: 0 }}
          animate={{
            y: '-10vh',
            opacity: [0, 0.4, 0],
            scale: [0.5, 1, 0.5],
            x: `${heart.x + Math.sin(heart.id) * 5}vw`,
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: "linear",
          }}
          className="absolute text-pink-300"
          style={{ left: `${heart.x}vw`, fontSize: heart.size }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
}
