import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-[calc(100vh-5rem)] flex items-center justify-center relative p-4"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      <div className="text-center space-y-6 relative z-10 max-w-3xl">
        <motion.h1
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-6xl font-bold crazy-text text-white"
        >
          <span className="animated-letter">Y</span>
          <span className="animated-letter">O</span>
          <span className="animated-letter">!</span>
          <br />
          <span className="animated-word">WELCOME</span> TO THE 
          <span className="animated-word">WILDEST</span> CORNER OF THE 
          <span className="animated-word">INTERNET</span>—MY 
          <span className="animated-word">PORTFOLIO!</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl gradient-text-animated"
        >
          I'm not just your average software engineer, I cooked up 
          <span className="animated-word">Four</span> 
          <span className="animated-word">MIND-BLOWING</span> TRACKS just for this little digital adventure.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg md:text-xl text-white"
        >
          So, hit that play button, crank up the volume, and let the beats take over!
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/about')}
            className="px-6 py-3 md:px-8 md:py-3 bg-spotify-green text-black rounded-full font-medium hover:bg-green-400 transition-colors text-lg md:text-xl"
          >
            Let's Begin
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Home;
