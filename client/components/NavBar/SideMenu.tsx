"use client";
import React, { useState, useEffect, useRef } from 'react';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import { motion, AnimatePresence } from 'framer-motion'; // Import Framer Motion
import Navbar from './Links';

const SideMenu = ({ className }: { className?: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(prev => !prev); // Simplified toggle
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={className}>
      <FontAwesomeIcon
        icon={faBars}
        className='cursor-pointer hover:bg-gray-500 rounded-full p-2 transition-colors duration-200'
        size='xl'
        onClick={toggleMenu}
      />
        <AnimatePresence mode='wait'>
      {isOpen && (
        <motion.div
          ref={menuRef}
          initial={{ x: '100%' }}
          animate={{ x: 0 }} 
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          className={`absolute right-0 top-0 bg-green-700 p-5 text-black h-screen w-[60%] max-sm:w-full `}
          style={{ zIndex: 100 }}
        >
          <div className='flex justify-between items-start pb-4'>
            <FontAwesomeIcon
              icon={faXmark}
              className='cursor-pointer hover:bg-gray-500 rounded-full p-2 w-5 h-5 font-light'
              onClick={toggleMenu}
            />
          </div>
          <Navbar />
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
};

export default SideMenu;
