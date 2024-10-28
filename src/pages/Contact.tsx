import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';

const ContactIcon: React.FC<{ icon: React.ReactNode, link?: string, label: string, onClick?: () => void }> = 
  ({ icon, link, label, onClick }) => (
    <motion.div
      className="text-6xl text-white hover:text-spotify-green transition-colors duration-300 relative cursor-pointer"
      whileHover={{ scale: 1.2, rotate: 360 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
    >
      {link ? (
        <a href={link} target="_blank" rel="noopener noreferrer">
          <span className="sr-only">{label}</span>
          {icon}
        </a>
      ) : (
        <>
          <span className="sr-only">{label}</span>
          {icon}
        </>
      )}
    </motion.div>
  );

const Contact = () => {
  const [showEmail, setShowEmail] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-black to-spotify-darkgray text-white p-8"
    >
      <motion.h1
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 10 }}
        className="text-6xl font-bold text-center mb-12 text-spotify-green"
      >
        Let's Rock Together!
      </motion.h1>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="max-w-3xl mx-auto bg-spotify-lightgray p-8 rounded-lg shadow-lg"
      >
        <p className="text-xl mb-8 text-center">
          Ready to collaborate on some epic code? Hit me up through these channels and let's make some noise!
        </p>

        <motion.div
          className="flex justify-center space-x-8"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
          initial="hidden"
          animate="show"
        >
          <motion.div 
            className="relative"
            onHoverStart={() => setShowEmail(true)}
            onHoverEnd={() => setShowEmail(false)}
          >
            <ContactIcon
              icon={<FaEnvelope />}
              label="Email"
            />
            <AnimatePresence>
              {showEmail && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-4 py-2 bg-spotify-green text-black rounded-md text-sm whitespace-nowrap"
                >
                  amarnathgujja@gmail.com
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          <ContactIcon
            icon={<FaLinkedin />}
            link="https://www.linkedin.com/in/amarnath-reddy-gujja-a10005298"
            label="LinkedIn"
          />
          <ContactIcon
            icon={<FaTwitter />}
            link="https://x.com/AmarnathGu34103?t=ncRVKWPxd-LgqzcUK9kcSg&s=08"
            label="Twitter"
          />
          <ContactIcon
            icon={<FaGithub />}
            link="https://github.com/AmarnathReddyGujja"
            label="GitHub"
          />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center mt-12"
      >
        <p className="text-2xl font-bold">Let's create a symphony of code together!</p>
        <p className="text-xl mt-2">Your next big hit is just a message away.</p>
      </motion.div>
    </motion.div>
  );
};

export default Contact;
