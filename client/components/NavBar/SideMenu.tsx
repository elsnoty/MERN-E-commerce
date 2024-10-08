"use client";
import React, { useState, useEffect, useRef } from 'react';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Links';
import AuthNav from './AuthNav';

const SideMenu = ({ className }: { className?: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  // Lock scroll on body element
  useEffect(() => {
    if (isOpen) {
      // Store the current scroll position
      setScrollPosition(window.scrollY);

      // Lock the body scroll and position
      document.body.style.position = 'fixed';
      document.body.style.top = `-${window.scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden';
    } else {
      // Unlock scroll and restore the original position
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      
      // Restore the scroll position
      window.scrollTo(0, scrollPosition);
    }

    return () => {
      // Cleanup and unlock scroll on component unmount
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
    };
  }, [isOpen, scrollPosition]);

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
    <div className={`${className} `}>
      <FontAwesomeIcon
        icon={faBars}
        className='cursor-pointer hover:bg-gray-200 rounded-full p-2 transition-colors duration-200'
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
            className={`absolute right-0 top-0 bg-white shadow-2xl border-l border-gray-200 p-5 text-gray-900 min-h-screen w-[60%] max-sm:w-full rounded-l-lg`}
            style={{ zIndex: 100 }}
          >
            <div className='flex justify-between items-start pb-4'>
              <FontAwesomeIcon
                icon={faXmark}
                className='cursor-pointer hover:bg-gray-200 rounded-full p-2 w-5 h-5'
                onClick={toggleMenu}
              />
            </div>
            <div className='flex flex-col items-center gap-y-4'>
              <Navbar toggleMenu={toggleMenu} />
              <AuthNav className='flex flex-col items-center' toggleMenu={toggleMenu} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SideMenu;
