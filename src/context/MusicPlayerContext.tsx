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

const MusicPlayerContext = createContext<MusicPlayerContextType | undefined>(undefined);

export const MusicPlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlist, setPlaylist] = useState<Song[]>([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(80);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    if (currentSong) {
      console.log("Current song changed:", currentSong);
      audioRef.current.src = currentSong.audioUrl;
      console.log("Audio source set to:", audioRef.current.src);
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
      console.log("Audio paused on cleanup");
    };
  }, [currentSong, isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleDurationChange = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);

    // Add volume change listener
    const handleVolumeChange = () => {
      audioRef.current.volume = volume / 100;
    };

    audio.addEventListener('volumechange', handleVolumeChange);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('volumechange', handleVolumeChange);
    };
  }, [volume]);

  // Update volume when it changes
  useEffect(() => {
    audioRef.current.volume = volume / 100;
  }, [volume]);

  const playSong = useCallback((song: Song) => {
    console.log("playSong called with:", song);
    setCurrentSong(song);
    setIsPlaying(true);
    audioRef.current.src = song.audioUrl;
    // Add a small delay before playing
    setTimeout(() => {
      audioRef.current.play()
        .then(() => console.log("Audio started playing from playSong"))
        .catch(error => console.error("Error playing audio from playSong:", error));
    }, 100);
    if (!playlist.some(s => s.id === song.id)) {
      setPlaylist(prev => [...prev, song]);
    }
  }, [playlist]);

  const pauseSong = useCallback(() => {
    console.log("pauseSong called");
    setIsPlaying(false);
    audioRef.current.pause();
  }, []);

  const togglePlay = useCallback(() => {
    console.log("togglePlay called, current isPlaying:", isPlaying);
    setIsPlaying(prev => !prev);
    if (isPlaying) {
      audioRef.current.pause();
      console.log("Audio paused from togglePlay");
    } else if (currentSong) {
      // Add a small delay before playing
      setTimeout(() => {
        audioRef.current.play()
          .then(() => console.log("Audio started playing from togglePlay"))
          .catch(error => console.error("Error playing audio from togglePlay:", error));
      }, 100);
    }
  }, [isPlaying, currentSong]);

  const nextSong = useCallback(() => {
    if (currentSong && playlist.length > 0) {
      const currentIndex = playlist.findIndex(song => song.id === currentSong.id);
      const nextIndex = (currentIndex + 1) % playlist.length;
      playSong(playlist[nextIndex]);
    }
  }, [currentSong, playlist, playSong]);

  const previousSong = useCallback(() => {
    if (currentSong && playlist.length > 0) {
      const currentIndex = playlist.findIndex(song => song.id === currentSong.id);
      const previousIndex = (currentIndex - 1 + playlist.length) % playlist.length;
      playSong(playlist[previousIndex]);
    }
  }, [currentSong, playlist, playSong]);

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
        playlist,
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
