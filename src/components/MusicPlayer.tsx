import { Music, Music2 } from 'lucide-react';
import { useRef, useState } from 'react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => console.error("Audio play blocked", err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <audio
        ref={audioRef}
        loop
        src="https://cdn.pixabay.com/audio/2022/02/22/audio_d193672957.mp3?filename=soft-piano-100-bpm-121529.mp3"
      />
      <button
        onClick={togglePlay}
        id="music-toggle"
        className="bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg border border-pink-200 text-pink-500 hover:scale-110 transition-transform flex items-center justify-center"
      >
        {isPlaying ? <Music className="w-6 h-6 animate-pulse" /> : <Music2 className="w-6 h-6 opacity-50" />}
      </button>
    </div>
  );
}
