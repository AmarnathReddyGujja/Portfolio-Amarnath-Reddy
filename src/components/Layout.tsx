import React from 'react';
import Sidebar from './Sidebar';
import MusicPlayer from './MusicPlayer';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen bg-spotify-black text-white">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col">
          <div className="flex-grow">
            {children}
          </div>
          <Footer />
        </main>
      </div>
      <MusicPlayer />
    </div>
  );
};

export default Layout;
