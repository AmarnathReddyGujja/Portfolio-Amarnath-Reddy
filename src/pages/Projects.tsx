import { motion } from 'framer-motion';
import { Play, Pause } from 'lucide-react';
import { useMusicPlayer } from '../context/MusicPlayerContext';
import { useEffect } from 'react';

const projectsDetails = [
  {
    title: "Webinar Platform",
    description: "A full-stack platform for discovering, registering, and uploading webinars. Features smooth animations and intuitive design.",
    technologies: ["ReactJS", "Node.js", "MongoDB", "Express.js", "Cypress", "CSS animations"],
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80"
  },
  {
    title: "LearnerStreak",
    description: "A social learning platform for sharing daily learning experiences. Features include global feed, interactions, and streak tracking.",
    technologies: ["ReactJS", "Node.js", "MongoDB", "Express.js", "CSS", "Real-time updates"],
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
  }
];

const Projects = () => {
  const { playSong, currentSong, isPlaying, togglePlay } = useMusicPlayer();

  useEffect(() => {
    fetch('../src/songs/Project.mp3')
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
    if (currentSong?.id === 'projects-song') {
      togglePlay();
    } else {
      playSong({
        id: 'projects-song',
        title: 'Projects song',
        subtitle: 'Amarnath Reddy',
        duration: '3:59',
        audioUrl: '../src/songs/Project.mp3',
        image: projectsDetails[0].image
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 p-6 bg-spotify-darkgray rounded-lg"
    >
      {/* Music Player Section */}
      <motion.div 
        className="bg-gradient-to-r from-spotify-darkgray via-spotify-lightgray to-spotify-darkgray p-6 rounded-xl shadow-lg"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <h2 className="text-lg font-bold text-white mb-5 text-center tracking-wide">
          "READY TO DIVE INTO MY PROJECT SYMPHONY? HIT PLAY AND LET THE CODE MELODIES BLOW YOUR MIND!"
        </h2>
        <div className="flex items-center space-x-6 bg-spotify-black bg-opacity-40 p-4 rounded-lg">
          <motion.img
            src={projectsDetails[0].image}
            alt="Album Cover"
            className="w-20 h-20 rounded-lg object-cover shadow-xl"
            whileHover={{ scale: 1.1, rotate: 5 }}
          />
          <div className="flex-grow">
            <p className="text-white font-semibold text-lg">Projects song</p>
            <p className="text-gray-400">Artist: AI & Amarnath Reddy</p>
            <p className="text-gray-500">3:59</p>
          </div>
          <motion.button 
            className="flex items-center bg-spotify-green hover:bg-green-500 text-white py-3 px-6 rounded-full font-medium shadow-lg"
            onClick={handlePlayClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {currentSong?.id === 'projects-song' && isPlaying ? (
              <>
                <Pause className="w-5 h-5 mr-2" /> Pause
              </>
            ) : (
              <>
                <Play className="w-5 h-5 mr-2" /> Play
              </>
            )}
          </motion.button>
        </div>
      </motion.div>

      {/* Projects Content */}
      <motion.h1 
        className="text-4xl font-bold text-spotify-green text-center"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
      >
        Projects
      </motion.h1>
      <div className="grid gap-6">
        {projectsDetails.map((project, index) => (
          <motion.div
            key={index}
            className="bg-spotify-lightgray p-6 rounded-xl hover:shadow-xl transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <motion.img 
                src={project.image} 
                alt={project.title} 
                className="w-full md:w-48 h-48 rounded-lg object-cover shadow-lg"
                whileHover={{ scale: 1.05 }}
              />
              <div className="flex-grow space-y-4">
                <h2 className="text-2xl font-bold text-white">{project.title}</h2>
                <p className="text-gray-300 text-lg leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 bg-spotify-green bg-opacity-20 text-spotify-green rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Projects;
