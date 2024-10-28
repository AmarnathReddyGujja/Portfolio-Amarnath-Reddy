import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Music2, Home, User, Album, Mail, ChevronDown, ChevronUp, Menu } from 'lucide-react';
import { clsx } from 'clsx';

const Sidebar = () => {
  const [isAlbumsOpen, setIsAlbumsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: User, label: 'About', path: '/about' },
    {
      icon: Album,
      label: 'Albums',
      subItems: [
        { label: 'Experience', path: '/albums/experience' },
        { label: 'Projects', path: '/albums/projects' },
        { label: 'Education', path: '/albums/education' },
      ],
    },
    { icon: Mail, label: 'Contact', path: '/contact' },
  ];

  const SidebarContent = () => (
    <>
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 mt-4"
      >
        <Music2 className="w-12 h-12 text-spotify-green animate-pulse" />
      </motion.div>
      
      <motion.div 
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {navItems.map((item, index) => (
          <motion.div 
            key={item.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            {!item.subItems ? (
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  clsx(
                    'flex items-center space-x-3 p-2 rounded-lg transition-all duration-300 ease-in-out',
                    'hover:bg-spotify-hover hover:text-spotify-green',
                    isActive ? 'bg-spotify-lightgray text-spotify-green font-semibold' : 'text-gray-400'
                  )
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-sm tracking-wide">{item.label}</span>
              </NavLink>
            ) : (
              <div>
                <button
                  onClick={() => setIsAlbumsOpen(!isAlbumsOpen)}
                  className={clsx(
                    'w-full flex items-center justify-between p-2 rounded-lg transition-all duration-300 ease-in-out',
                    'hover:bg-spotify-hover hover:text-spotify-green',
                    isAlbumsOpen ? 'bg-spotify-lightgray text-spotify-green font-semibold' : 'text-gray-400'
                  )}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="w-5 h-5" />
                    <span className="text-sm tracking-wide">{item.label}</span>
                  </div>
                  <motion.div
                    animate={{ rotate: isAlbumsOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isAlbumsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isAlbumsOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="ml-8 mt-2 space-y-2">
                        {item.subItems.map((subItem) => (
                          <NavLink
                            key={subItem.label}
                            to={subItem.path}
                            className={({ isActive }) =>
                              clsx(
                                'block p-2 rounded-lg transition-all duration-300 ease-in-out text-sm',
                                'hover:bg-spotify-hover hover:text-spotify-green',
                                isActive ? 'text-spotify-green font-semibold' : 'text-gray-400'
                              )
                            }
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {subItem.label}
                          </NavLink>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </>
  );

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-spotify-green rounded-full"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Menu className="w-6 h-6 text-black" />
      </button>

      <nav className="hidden md:block w-64 bg-spotify-black border-r border-spotify-lightgray p-6 font-sans">
        <SidebarContent />
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-40 bg-spotify-black p-6 font-sans overflow-y-auto"
          >
            <SidebarContent />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
