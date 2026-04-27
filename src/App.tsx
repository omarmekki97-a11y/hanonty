/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Heart, Sparkles, ChevronRight } from 'lucide-react';
import FloatingHearts from './components/FloatingHearts';
import MusicPlayer from './components/MusicPlayer';
import HiddenHeartGame from './components/HiddenHeartGame';
import FlowerBurst from './components/FlowerBurst';

type Stage = 'landing' | 'letter' | 'game' | 'celebrate';

export default function App() {
  const [stage, setStage] = useState<Stage>('landing');
  const [burstTrigger, setBurstTrigger] = useState(0);
  const [maybeScale, setMaybeScale] = useState(1);
  const [showFinalMessage, setShowFinalMessage] = useState(false);

  const containerVariants = {
    initial: { opacity: 0, scale: 0.95, y: 10 },
    animate: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      scale: 1.05, 
      y: -10,
      transition: { duration: 0.6, ease: "easeIn" }
    }
  };

  const handleYesClick = () => {
    setBurstTrigger(prev => prev + 1);
    setShowFinalMessage(true);
  };

  return (
    <div className="min-h-screen relative overflow-hidden selection:bg-pink-200 selection:text-pink-700 font-sans">
      <FloatingHearts />
      <MusicPlayer />
      <FlowerBurst trigger={burstTrigger} />

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        <AnimatePresence mode="wait">
          {stage === 'landing' && (
            <motion.div
              key="landing"
              variants={containerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="text-center max-w-2xl px-6 py-12 bg-white/30 backdrop-blur-lg rounded-[40px] border border-white/50 shadow-2xl"
              id="landing-container"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="mb-8 inline-block"
              >
                <Heart className="w-20 h-20 text-pink-500 fill-pink-500" />
              </motion.div>
              <h1 className="font-display text-5xl md:text-7xl text-pink-700 leading-tight mb-6">
                I made this <br /> <span className="italic">just for Hana</span> ❤️
              </h1>
              <p className="text-pink-500 font-serif text-xl md:text-2xl italic mb-10">
                A little digital corner from Omar, just for you.
              </p>
              <button
                onClick={() => setStage('letter')}
                className="group relative inline-flex items-center gap-3 bg-pink-500 text-white px-10 py-5 rounded-full font-serif text-2xl shadow-xl hover:bg-pink-600 transition-all hover:scale-105 active:scale-95"
              >
                Open your surprise
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          )}

          {stage === 'letter' && (
            <motion.div
              key="letter"
              variants={containerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="max-w-xl w-full"
            >
              <div className="bg-white/70 backdrop-blur-xl p-10 md:p-16 rounded-[40px] shadow-2xl border border-white/80 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-300 via-pink-500 to-pink-300" />
                <Sparkles className="text-pink-400 w-10 h-10 mb-6" />
                <h2 className="font-display text-4xl text-pink-700 mb-8 italic">To my beautiful Hana,</h2>
                <div className="space-y-6 font-serif text-lg md:text-xl text-slate-700 leading-relaxed italic">
                  <p>
                    Every day with you feels like a beautiful dream I never want to wake up from. You've brought so much light, laughter, and warmth into my life.
                  </p>
                  <p>
                    I wanted to create this simple space just to remind you how much you mean to me. You are my best friend and my greatest happiness.
                  </p>
                  <p className="text-pink-600 font-bold">
                    With all my love,<br />
                    Omar
                  </p>
                </div>
                <div className="mt-12 flex justify-end">
                  <button
                    onClick={() => setStage('game')}
                    className="text-pink-600 font-serif text-xl flex items-center gap-2 hover:gap-4 transition-all"
                  >
                    One more thing... <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {stage === 'game' && (
            <motion.div
              key="game"
              variants={containerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full max-w-lg"
            >
              <HiddenHeartGame onWin={() => setStage('celebrate')} />
            </motion.div>
          )}

          {stage === 'celebrate' && (
            <motion.div
              key="celebrate"
              variants={containerVariants}
              initial="initial"
              animate="animate"
              className="w-full space-y-12"
            >
              <section className="text-center py-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                  transition={{ 
                    scale: { type: "spring", duration: 1 },
                    rotate: { duration: 1, ease: "easeInOut" }
                  }}
                  className="mb-6"
                >
                  <Heart className="w-24 h-24 text-pink-500 fill-pink-500 mx-auto" />
                </motion.div>
                <h2 className="font-display text-5xl md:text-7xl text-pink-700 mb-4 px-4">
                  Omar & Hana <br /> <span className="italic text-4xl md:text-6xl">Forever Together</span>
                </h2>
                <div className="flex justify-center gap-2">
                   {[...Array(5)].map((_, i) => (
                     <Sparkles key={i} className="text-pink-300 w-6 h-6 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                   ))}
                </div>
              </section>

              <section className="py-12 text-center px-6">
                <div className="bg-white/40 backdrop-blur-md p-12 md:p-20 rounded-[50px] shadow-xl border border-white/50 max-w-3xl mx-auto">
                   <h3 className="font-display text-4xl md:text-6xl text-pink-700 mb-8 italic">
                     Will you stay with me forever, Hana?
                   </h3>
                   <div className="flex flex-col md:flex-row gap-6 justify-center">
                     <motion.button
                       whileHover={{ scale: 1.1 }}
                       whileTap={{ scale: 0.95 }}
                       className="bg-pink-500 text-white px-12 py-5 rounded-full font-serif text-2xl shadow-lg cursor-pointer z-20"
                       onClick={handleYesClick}
                     >
                       Yes!
                     </motion.button>
                     <motion.button
                       whileHover={{ scale: 1.1 }}
                       whileTap={{ scale: 0.95 }}
                       className="bg-pink-100 text-pink-500 px-12 py-5 rounded-full font-serif text-2xl shadow-lg border border-pink-200 transition-all duration-300 z-20"
                       animate={{ scale: maybeScale }}
                       onClick={(e) => {
                         const btn = e.currentTarget as HTMLButtonElement;
                         btn.style.position = 'fixed';
                         btn.style.left = `${Math.random() * 60 + 20}vw`;
                         btn.style.top = `${Math.random() * 60 + 20}vh`;
                         setMaybeScale(prev => Math.max(prev * 0.7, 0.1));
                       }}
                     >
                       Maybe?
                     </motion.button>
                   </div>
                   
                   <AnimatePresence>
                     {showFinalMessage && (
                       <motion.div
                         initial={{ opacity: 0, y: 20, scale: 0.8 }}
                         animate={{ opacity: 1, y: 0, scale: 1 }}
                         exit={{ opacity: 0, scale: 0.5 }}
                         className="mt-12 p-6 bg-pink-50/50 rounded-2xl border border-pink-200"
                       >
                         <h4 className="font-display text-4xl text-pink-600 mb-2">I love you so much نونتي</h4>
                         <p className="text-pink-400 italic">Always and forever.</p>
                       </motion.div>
                     )}
                   </AnimatePresence>

                   <p className="mt-12 text-pink-400 italic font-serif text-xl">My heart belongs to you.</p>
                </div>
              </section>

              <footer className="py-8 text-center text-pink-300 font-serif italic">
                Made with love by Omar for Hana.
              </footer>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
