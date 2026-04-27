import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import { useState } from 'react';

export default function HiddenHeartGame({ onWin }: { onWin: () => void }) {
  const [clickCount, setClickCount] = useState(0);
  const targetClicks = 5;

  const handleClick = () => {
    if (clickCount + 1 >= targetClicks) {
      onWin();
    }
    setClickCount(prev => prev + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white/40 backdrop-blur-sm rounded-3xl border-2 border-pink-100 shadow-inner" id="heart-game">
      <h3 className="font-serif text-2xl text-pink-700 mb-6 text-center">
        {clickCount === 0 ? "Something is hidden here..." : `Keep going... ${targetClicks - clickCount} more!`}
      </h3>
      <motion.button
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
        onClick={handleClick}
        className="p-6 bg-pink-100/50 rounded-full text-pink-500 shadow-lg relative active:bg-pink-200"
      >
        <Heart className="w-12 h-12 fill-pink-500" />
        <motion.div
           animate={{
             scale: [1, 1.5, 1],
             opacity: [0.5, 0, 0.5]
           }}
           transition={{ duration: 2, repeat: Infinity }}
           className="absolute inset-0 bg-pink-400 rounded-full"
        />
      </motion.button>
      <p className="mt-4 text-pink-400 text-sm italic">Tap the heart to unlock a secret message</p>
    </div>
  );
}
