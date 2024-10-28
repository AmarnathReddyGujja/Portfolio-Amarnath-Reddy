import { motion } from 'framer-motion';
import { Play, Pause } from 'lucide-react';
import { useMusicPlayer } from '../context/MusicPlayerContext';
import { useEffect } from 'react';

const educationDetails = {
  institution: "University of Central Missouri",
  duration: "August 2023 to December 2024",
  degree: "MS in Computer Science",
  gpa: "GPA: 3.55",
  
  institution1: "Jawaharlal Nehru Technological University",
  duration1: "August 2019 to July 2023",
  degree1: "Bachelor of Technology in Computer Science and Engineering",
  image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1"
};

const Education = () => {
  const { playSong, currentSong, isPlaying, togglePlay } = useMusicPlayer();

  useEffect(() => {
    fetch('../src/songs/education.mp3')
      .then(response => {
        if (!response.ok) throw new Error('Audio file not found');
        return response.blob();
      })
      .then(blob => {
        const fileType = blob.type;
        if (!fileType.startsWith('audio/')) console.error('File is not an audio file');
      })
      .catch(error => console.error('Error checking audio file:', error));
  }, []);

  const handlePlayClick = () => {
    if (currentSong?.id === 'education-song') {
      togglePlay();
    } else {
      playSong({
        id: 'education-song',
        title: 'Education song',
        subtitle: 'Amarnath Reddy',
        duration: '2:46',
        audioUrl: '../src/songs/education.mp3',
        image: educationDetails.image
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 p-6 pb-32 md:pb-24 bg-spotify-darkgray rounded-lg"
    >
      {/* Music Player Section */}
      <motion.div 
        className="bg-gradient-to-r from-spotify-darkgray via-spotify-lightgray to-spotify-darkgray p-4 sm:p-6 rounded-xl shadow-lg"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <h2 className="text-base sm:text-lg font-bold text-white mb-4 sm:mb-5 text-center tracking-wide px-2">
          "WHY READ WHEN YOU CAN CRANK UP THE VOLUME AND LET MY EDUCATION DROP BEATS INTO YOUR EARS? HIT PLAY AND LET THE KNOWLEDGE JAM BEGIN!"
        </h2>
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:space-x-6 bg-spotify-black bg-opacity-40 p-3 sm:p-4 rounded-lg">
          <motion.img
            src={educationDetails.image}
            alt="Album Cover"
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover shadow-xl"
            whileHover={{ scale: 1.1, rotate: 5 }}
          />
          <div className="flex-grow text-center sm:text-left">
            <p className="text-white font-semibold text-base sm:text-lg">Education song</p>
            <p className="text-gray-400 text-sm sm:text-base">Artist: Amarnath Reddy</p>
            <p className="text-gray-500 text-sm">2:46</p>
          </div>
          <motion.button 
            className="flex items-center bg-spotify-green hover:bg-green-500 text-white py-2 px-4 sm:py-3 sm:px-6 rounded-full font-medium shadow-lg text-sm sm:text-base"
            onClick={handlePlayClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {currentSong?.id === 'education-song' && isPlaying ? (
              <>
                <Pause className="w-4 h-4 sm:w-5 sm:h-5 mr-2" /> Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2" /> Play
              </>
            )}
          </motion.button>
        </div>
      </motion.div>

      {/* Education Content */}
      <motion.h1 
        className="text-3xl sm:text-4xl font-bold text-spotify-green text-center mt-4"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
      >
        Education
      </motion.h1>
      <div className="grid gap-6 mb-16 sm:mb-0">
        <motion.div
          className="bg-spotify-lightgray p-6 rounded-xl hover:shadow-xl transition-shadow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex flex-col md:flex-row items-start gap-6">
            <motion.img 
              src={educationDetails.image} 
              alt="Education"
              className="w-full md:w-48 h-48 rounded-lg object-cover shadow-lg"
              whileHover={{ scale: 1.05 }}
            />
            <div className="flex-grow space-y-6">
              {/* Masters Education */}
              <motion.div
                className="space-y-2"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold text-white">{educationDetails.degree}</h2>
                <p className="text-spotify-green text-lg">{educationDetails.institution}</p>
                <p className="text-gray-400">{educationDetails.duration}</p>
                <p className="text-gray-300">{educationDetails.gpa}</p>
              </motion.div>

              {/* Bachelors Education */}
              <motion.div
                className="space-y-2 pt-4 border-t border-spotify-green"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-2xl font-bold text-white">{educationDetails.degree1}</h2>
                <p className="text-spotify-green text-lg">{educationDetails.institution1}</p>
                <p className="text-gray-400">{educationDetails.duration1}</p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Education;
