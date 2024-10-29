import { motion } from 'framer-motion';
import { useMusicPlayer } from '../context/MusicPlayerContext';
import { Play, Pause, Disc } from 'lucide-react';
import { FaGithub, FaCode, FaDatabase, FaServer } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const { playSong, currentSong, isPlaying, togglePlay } = useMusicPlayer();
  const navigate = useNavigate();

  const handlePlayClick = () => {
    if (currentSong?.id === 'about-song') {
      togglePlay();
    } else {
      playSong({
        id: 'about-song',
        title: 'Code Symphony',
        subtitle: 'Amarnath Reddy',
        duration: '3:21',
        audioUrl: '../src/songs/Anthem.mp3',
        image: '../src/assests/Rockstar.jpg'
      });
    }
  };

  const skills = [
    { icon: <FaCode />, title: "Frontend", text: "React, TypeScript, Tailwind" },
    { icon: <FaServer />, title: "Backend", text: "Node.js, Express, Python" },
    { icon: <FaDatabase />, title: "Database", text: "MongoDB, PostgreSQL" },
    { icon: <FaGithub />, title: "Tools", text: "Git, Docker, Jenkins" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 bg-gradient-to-b from-black to-spotify-darkgray rounded-lg overflow-hidden pb-24 md:pb-16"
    >
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <motion.img 
          src="../src/assests/Rockstar.jpg" 
          alt="Amarnath Reddy - Code Rockstar" 
          className="w-full h-full object-cover"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black bg-opacity-70">
          <div className="absolute bottom-0 left-0 p-8 space-y-4">
            <motion.h1 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-6xl font-bold text-white"
            >
              Amarnath Reddy
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-2xl text-spotify-green font-semibold"
            >
              Full Stack Developer | Code Rockstar
            </motion.p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-8 space-y-8">
        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="bg-spotify-lightgray p-4 rounded-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-spotify-green text-3xl mb-2">{skill.icon}</div>
              <h3 className="text-white font-bold mb-1">{skill.title}</h3>
              <p className="text-gray-400 text-sm">{skill.text}</p>
            </motion.div>
          ))}
        </div>

        {/* About Text */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-300 leading-relaxed"
          >
            🎸 Yo, tech heads! I'm Amarnath Reddy, the rockstar of the coding world! 
          </motion.p>

          <motion.div 
            className="bg-spotify-lightgray p-6 rounded-xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-gray-300 mb-4">
              I don't just write code, I compose digital symphonies! My fingers shred keyboards like 
              Hendrix shredded guitars. I've got 99 problems, but a glitch ain't one!
            </p>

            <p className="text-gray-300 mb-4">
              When I'm not crowd-surfing through lines of code, I'm stage-diving into databases and 
              moshing with APIs. My code is so clean, it makes soap jealous!
            </p>


          </motion.div>

          {/* Updated Button Section with two buttons */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex justify-center mt-8 space-x-4"
          >
            <motion.button 
              onClick={handlePlayClick}
              className="bg-spotify-green hover:bg-green-500 text-black py-4 px-8 rounded-full font-bold text-lg shadow-lg flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {currentSong?.id === 'about-song' && isPlaying ? (
                <>
                  <Pause className="w-6 h-6" />
                  <span>Pause My Anthem</span>
                </>
              ) : (
                <>
                  <Play className="w-6 h-6" />
                  <span>Play My Anthem</span>
                </>
              )}
            </motion.button>

            <motion.button 
              onClick={() => navigate('/albums/experience')}
              className="bg-spotify-lightgray hover:bg-gray-700 text-white py-4 px-8 rounded-full font-bold text-lg shadow-lg flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Disc className="w-6 h-6" />
              <span>Explore Albums</span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
