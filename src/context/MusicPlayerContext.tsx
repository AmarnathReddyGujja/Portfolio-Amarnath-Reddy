import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';

interface Song {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  audioUrl: string;
  image?: string;
}

interface MusicPlayerContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  playSong: (song: Song) => void;
  pauseSong: () => void;
  togglePlay: () => void;
  nextSong: () => void;
  previousSong: () => void;
  playlist: Song[];
  currentTime: number;
  duration: number;
  seekTo: (time: number) => void;
  volume: number;
  setVolume: (volume: number) => void;
}

// Define the ordered playlist
const orderedPlaylist: Song[] = [
  {
    id: 'about-song',
    title: 'Code Symphony',
    subtitle: 'Amarnath Reddy',
    duration: '3:21',
    audioUrl: '../src/songs/Anthem.mp3',
    image: '../src/assests/Rockstar.jpg'
  },
  {
    id: 'experience-song',
    title: 'Experience song',
    subtitle: 'Amarnath Reddy',
    duration: '1:55',
    audioUrl: '../src/songs/experience.mp3',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c'
  },
  {
    id: 'projects-song',
    title: 'Projects song',
    subtitle: 'Amarnath Reddy',
    duration: '3:59',
    audioUrl: '../src/songs/Project.mp3',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113'
  },
  {
    id: 'education-song',
    title: 'Education song',
    subtitle: 'Amarnath Reddy',
    duration: '2:46',
    audioUrl: '../src/songs/education.mp3',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1'
  }
];

const MusicPlayerContext = createContext<MusicPlayerContextType | undefined>(undefined);

export const MusicPlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(80);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    if (currentSong) {
      audioRef.current.src = currentSong.audioUrl;
      if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => console.log("Audio started playing"))
            .catch(error => console.error("Error playing audio:", error));
        }
      }
    }
    return () => {
      audioRef.current.pause();
    };
  }, [currentSong, isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleDurationChange = () => setDuration(audio.duration);
    const handleVolumeChange = () => audio.volume = volume / 100;

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('volumechange', handleVolumeChange);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('volumechange', handleVolumeChange);
    };
  }, [volume]);

  const playSong = useCallback((song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    setTimeout(() => {
      audioRef.current.play()
        .catch(error => console.error("Error playing audio:", error));
    }, 100);
  }, []);

  const pauseSong = useCallback(() => {
    setIsPlaying(false);
    audioRef.current.pause();
  }, []);

  const togglePlay = useCallback(() => {
    setIsPlaying(prev => !prev);
    if (isPlaying) {
      audioRef.current.pause();
    } else if (currentSong) {
      setTimeout(() => {
        audioRef.current.play()
          .catch(error => console.error("Error playing audio:", error));
      }, 100);
    }
  }, [isPlaying, currentSong]);

  const nextSong = useCallback(() => {
    if (!currentSong) return;
    
    const currentIndex = orderedPlaylist.findIndex(song => song.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % orderedPlaylist.length;
    playSong(orderedPlaylist[nextIndex]);
  }, [currentSong, playSong]);

  const previousSong = useCallback(() => {
    if (!currentSong) return;
    
    const currentIndex = orderedPlaylist.findIndex(song => song.id === currentSong.id);
    const previousIndex = (currentIndex - 1 + orderedPlaylist.length) % orderedPlaylist.length;
    playSong(orderedPlaylist[previousIndex]);
  }, [currentSong, playSong]);

  const seekTo = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  }, []);

  return (
    <MusicPlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        playSong,
        pauseSong,
        togglePlay,
        nextSong,
        previousSong,
        playlist: orderedPlaylist,
        currentTime,
        duration,
        seekTo,
        volume,
        setVolume,
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
};

export const useMusicPlayer = () => {
  const context = useContext(MusicPlayerContext);
  if (context === undefined) {
    throw new Error('useMusicPlayer must be used within a MusicPlayerProvider');
  }
  return context;
};
