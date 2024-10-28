import { motion } from 'framer-motion';
import { Play, Pause } from 'lucide-react';
import { useMusicPlayer } from '../context/MusicPlayerContext';
import { useEffect } from 'react';

const experienceDetails = [
  {
    title: "Software Engineer Intern",
    company: "Levo.ai",
    location: "Texas, USA",
    duration: "August 2024 – Present",
    responsibilities: [
      "Integrated authentication and authorization mechanisms using JWT and OAuth 2.0, ensuring secure access control for user data",
      "Automated CI/CD pipelines using Jenkins and Docker, reducing deployment times by 40%",
      "Built and optimized API security scanning and analysis tools to maintain high-security standards",
      "Conducted code reviews, contributing to maintaining high-quality, reliable code",
      "Wrote automated tests using Cypress, improving testing efficiency and coverage"
    ],
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    title: "Junior Software Engineer",
    company: "Levo.ai",
    location: "Remote (India)",
    duration: "August 2021 – July 2023 (2 Years)",
    responsibilities: [
      "Collaborated across teams to participate in all phases of the SDLC, ensuring successful project outcomes",
      "Designed and developed secure and scalable front-end interfaces using ReactJS, HTML, CSS, Javascript enhancing user engagement and improving site performance by 25%",
      "Implemented robust data models with MongoDB and PostgreSQL, optimizing database queries to reduce response times by 30%",
      "Automated deployment processes using CI/CD pipelines, resulting in faster, more reliable release cycles",
      "Developed and integrated RESTful APIs for seamless data exchange between front-end and back-end systems",
      "Implemented security best practices for relational and NoSQL databases, including encryption, secure authentication, and access control measures",
      "Automated API documentation, ensuring API specifications remain up-to-date, improving collaboration between development and QA teams",
      "Optimized API performance and stability through code refactoring, enhancing application response times",
      "Utilized Jira to track and manage project progress, ensuring alignment with timelines and objectives"
    ],
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  }
];

const Experience = () => {
  const { playSong, currentSong, isPlaying, togglePlay } = useMusicPlayer();

  useEffect(() => {
    fetch('../src/songs/experience.mp3')
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
    if (currentSong?.id === 'experience-song') {
      togglePlay();
    } else {
      playSong({
        id: 'experience-song',
        title: 'Experience song',
        subtitle: 'Amarnath Reddy',
        duration: '1:55',
        audioUrl: '../src/songs/experience.mp3',
        image: experienceDetails[0].image
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
        <h2 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-5 text-center tracking-wide px-2">
          "READY TO HEAR THE SYMPHONY OF MY CAREER? HIT PLAY AND LET MY EXPERIENCE ROCK YOUR WORLD!"
        </h2>
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:space-x-6 bg-spotify-black bg-opacity-40 p-3 sm:p-4 rounded-lg">
          <motion.img
            src={experienceDetails[0].image}
            alt="Album Cover"
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover shadow-xl"
            whileHover={{ scale: 1.1, rotate: 5 }}
          />
          <div className="flex-grow text-center sm:text-left">
            <p className="text-white font-semibold text-base sm:text-lg">Experience song</p>
            <p className="text-gray-400 text-sm sm:text-base">Artist: Amarnath Reddy</p>
            <p className="text-gray-500 text-sm">1:55</p>
          </div>
          <motion.button 
            className="flex items-center bg-spotify-green hover:bg-green-500 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-full font-medium shadow-lg text-sm sm:text-base"
            onClick={handlePlayClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {currentSong?.id === 'experience-song' && isPlaying ? (
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

      {/* Experience Content */}
      <motion.h1 
        className="text-3xl sm:text-4xl font-bold text-spotify-green text-center mt-4"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
      >
        Experience
      </motion.h1>
      <div className="grid gap-6 mb-16 sm:mb-0">
        {experienceDetails.map((experience, index) => (
          <motion.div
            key={index}
            className="bg-spotify-lightgray p-6 rounded-xl hover:shadow-xl transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex flex-col md:flex-row items-start gap-6">
              <motion.img 
                src={experience.image} 
                alt={experience.title} 
                className="w-full md:w-48 h-48 rounded-lg object-cover shadow-lg"
                whileHover={{ scale: 1.05 }}
              />
              <div className="flex-grow space-y-4">
                <div>
                  <h2 className="text-2xl font-bold text-white">{experience.title}</h2>
                  <p className="text-spotify-green text-lg">{experience.company} - {experience.location}</p>
                  <p className="text-gray-400">{experience.duration}</p>
                </div>
                <ul className="space-y-2">
                  {experience.responsibilities.map((responsibility, idx) => (
                    <motion.li 
                      key={idx}
                      className="text-gray-300 pl-4 border-l-2 border-spotify-green"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 * idx }}
                    >
                      {responsibility}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Experience;
