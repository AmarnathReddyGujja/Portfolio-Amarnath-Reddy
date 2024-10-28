import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { useMusicPlayer } from '../context/MusicPlayerContext';

const MusicPlayer = () => {
  const { currentSong, isPlaying, togglePlay, nextSong, previousSong, currentTime, duration, seekTo, volume, setVolume } = useMusicPlayer();

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    seekTo(time);
  }, [seekTo]);

  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
  }, [setVolume]);

  if (!currentSong) return null;

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-spotify-darkgray border-t border-spotify-lightgray px-4 py-2 md:py-4"
    >
      <div className="flex flex-col md:flex-row items-center justify-between max-w-screen-xl mx-auto">
        <div className="flex items-center space-x-4 mb-2 md:mb-0">
          <div className="w-12 h-12 bg-spotify-lightgray rounded overflow-hidden">
            {currentSong.image && (
              <img src={currentSong.image} alt={currentSong.title} className="w-full h-full object-cover" />
            )}
          </div>
          <div>
            <h4 className="text-sm font-medium text-white">{currentSong.title}</h4>
            <p className="text-xs text-gray-400">{currentSong.subtitle}</p>
          </div>
        </div>

        <div className="flex flex-col items-center space-y-2 w-full md:w-auto">
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={previousSong}
              className="text-gray-400 hover:text-white"
            >
              <SkipBack className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={togglePlay}
              className="p-2 rounded-full bg-white text-black hover:scale-105 transition-transform"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6" />
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextSong}
              className="text-gray-400 hover:text-white"
            >
              <SkipForward className="w-5 h-5" />
            </motion.button>
          </div>
          <div className="flex items-center space-x-2 w-full max-w-md">
            <span className="text-xs text-gray-400">{formatTime(currentTime)}</span>
            <input
              type="range"
              min={0}
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="w-full accent-spotify-green"
            />
            <span className="text-xs text-gray-400">{formatTime(duration)}</span>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-2">
          <Volume2 className="w-5 h-5 text-gray-400" />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
            className="w-24 accent-spotify-green"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default MusicPlayer;
