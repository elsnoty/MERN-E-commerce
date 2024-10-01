"use client"
// components/Accordion.tsx
import React, { useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';

interface AccordionProps {
  title: string;
  children: ReactNode;
}

const Accordion = ({ title, children }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen((prev) => !prev);

  return (
    <div className="border-b border-gray-300">
      <button
        className="flex justify-between w-full py-4 px-6 text-lg font-medium text-left text-gray-800 bg-gray-100 rounded-t-lg focus:outline-none sm:min-w-[320px]"
        onClick={handleToggle}
      >
        <span>{title}</span>
        <motion.span
          className="transform transition-transform duration-300"
          animate={{ rotate: isOpen ? 180 : 0 }}
        >
            <FontAwesomeIcon icon={faChevronUp} className="h-4 w-4 text-muted-foreground transition-transform duration-200" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 py-4 text-gray-700 md:max-w-[350px] w-full max-h-[250px] overflow-y-scroll ">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Accordion;

