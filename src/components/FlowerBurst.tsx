import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

interface Flower {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  scale: number;
  emoji: string;
}

const FLOWERS = ['🌸', '🌺', '🌷', '🌹', '💐', '🌻', '💗', '❤️'];

export default function FlowerBurst({ trigger }: { trigger: number }) {
  const [flowerGroups, setFlowerGroups] = useState<{ id: number; items: Flower[] }[]>([]);

  useEffect(() => {
    if (trigger === 0) return;

    const newItems = Array.from({ length: 50 }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 10 + 5;
      return {
        id: `flower-${trigger}-${i}`,
        x: 50,
        y: 50,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity - 5, // Upward initial boost
        rotation: Math.random() * 360,
        scale: Math.random() * 0.8 + 0.4,
        emoji: FLOWERS[Math.floor(Math.random() * FLOWERS.length)],
      };
    });

    const groupId = Date.now();
    setFlowerGroups(prev => [...prev, { id: groupId, items: newItems }]);

    const timer = setTimeout(() => {
      setFlowerGroups(prev => prev.filter(g => g.id !== groupId));
    }, 4000);

    return () => clearTimeout(timer);
  }, [trigger]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      <AnimatePresence>
        {flowerGroups.map((group) => (
          <div key={group.id}>
            {group.items.map((flower) => (
              <motion.div
                key={flower.id}
                initial={{ 
                  left: '50vw', 
                  top: '50vh', 
                  scale: 0, 
                  opacity: 1,
                  rotate: 0 
                }}
                animate={{ 
                  left: [`50vw`, `${50 + flower.vx * 4}vw`],
                  top: [`50vh`, `${50 + flower.vy * 4}vh`, `${110}vh`],
                  scale: flower.scale,
                  opacity: [1, 1, 0.8, 0],
                  rotate: flower.rotation * 5
                }}
                transition={{ 
                  duration: 2.5 + Math.random() * 1.5, 
                  ease: [0.23, 1, 0.32, 1] 
                }}
                className="absolute text-4xl select-none"
              >
                {flower.emoji}
              </motion.div>
            ))}
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
