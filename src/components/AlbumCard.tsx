import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause } from 'lucide-react';
import { useMusicPlayer } from '../context/MusicPlayerContext';

interface AlbumCardProps {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  audioUrl: string;
  image?: string;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ id, title, subtitle, duration, audioUrl, image }) => {
  const { currentSong, isPlaying, playSong } = useMusicPlayer();
  const isCurrentSong = currentSong?.id === id;

  const handlePlay = () => {
    playSong({ id, title, subtitle, duration, audioUrl, image });
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-spotify-darkgray p-4 rounded-lg cursor-pointer group"
    >
      <div className="relative">
        <div className="aspect-square bg-spotify-lightgray rounded-md overflow-hidden">
          {image ? (
            <img src={image} alt={title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-4xl text-gray-600">♪</span>
            </div>
          )}
        </div>
        <motion.button
          onClick={handlePlay}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1, scale: 1.1 }}
          className={`absolute bottom-2 right-2 rounded-full p-3 shadow-lg ${
            isCurrentSong ? 'opacity-100 bg-spotify-green' : 'opacity-0 bg-spotify-green'
          } group-hover:opacity-100 transition-opacity`}
        >
          {isCurrentSong && isPlaying ? (
            <Pause className="w-6 h-6 text-black" />
          ) : (
            <Play className="w-6 h-6 text-black" />
          )}
        </motion.button>
      </div>
      <div className="mt-4">
        <h3 className="font-semibold text-white truncate">{title}</h3>
        <p className="text-sm text-gray-400 mt-1">{subtitle}</p>
        <p className="text-xs text-gray-500 mt-1">{duration}</p>
      </div>
    </motion.div>
  );
};

export default AlbumCard;