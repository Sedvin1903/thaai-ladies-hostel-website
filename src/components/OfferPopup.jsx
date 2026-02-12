"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBranch } from "@/context/BranchContext";
import Image from "next/image";

export default function OfferPopup() {
  const { branch } = useBranch();
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const offerImages = {
    ambattur: "/data/offer_ambattur.png",
    pattabiram: "/data/offer_pattabiram.png"
  };

  useEffect(() => {
    // Set mounted state to true after component mounts
    setIsMounted(true);
    
    // Show popup when component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000); // Show after 1 second

    return () => clearTimeout(timer);
  }, []);

  // Reset popup when branch changes
  useEffect(() => {
    if (isMounted) {
      setIsVisible(false);
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 500); // Show new popup after branch change
      return () => clearTimeout(timer);
    }
  }, [branch, isMounted]);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isMounted && isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-2 sm:p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="relative w-full max-w-lg mx-4 sm:max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={offerImages[branch]}
              alt={`Special offer for ${branch === "ambattur" ? "Ambattur" : "Pattabiram"} branch`}
              width={800}
              height={600}
              className="w-full h-auto rounded-lg shadow-2xl"
              style={{ maxHeight: '70vh', objectFit: 'contain' }}
              unoptimized
            />
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 sm:p-3 shadow-lg transition-colors"
              aria-label="Close popup"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
