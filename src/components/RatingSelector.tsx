import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import sound1 from "/public/stars.mp3"
import fiveStarSound from "/public/five.mp3"

interface RatingStarProps {
  rating: number;
  onRatingSelect: (score: number) => void;
}

const RatingSelector: React.FC<RatingStarProps> = ({
  rating,
  onRatingSelect,
}) => {
  const [currentRating, setCurrentRating] = useState<number>(rating);
  const voice1 = new Audio(sound1)
  const fiveStarVoice = new Audio(fiveStarSound)
  const isDragging = useRef<boolean>(false);


  useEffect(() => {
    setCurrentRating(rating);
  }, [rating]);

  useEffect(() => {
    const handlePointerUpOutside = () => {
      if (isDragging.current) {
        isDragging.current = false; // Stop dragging when pointer is released outside
      }
    };

    document.addEventListener("pointerup", handlePointerUpOutside);

    return () => {
      document.removeEventListener("pointerup", handlePointerUpOutside);
    };
  }, []);

  const handleRatingClick = (score: number) => {
    setCurrentRating(score);
    onRatingSelect(score);

    // Play the appropriate audio effect
    if (score === 5) {
		fiveStarVoice.currentTime = 0
		fiveStarVoice.play();
    } else {
		voice1.currentTime = 0
		voice1.play();
    }
  };

  const handlePointerDown = () => {
    isDragging.current = true;
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const handlePointerMove = (score: number) => {
    if (isDragging.current) {
      setCurrentRating(score);
    }
  };

  return (
    <div
      className="flex items-center mt-4"
      onPointerUp={handlePointerUp} // Finalize selection
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.svg
          key={star}
          className={`w-10 h-10 cursor-pointer ms-1 outline-none ${
            currentRating >= star ? "text-yellow-400" : "text-gray-300"
          }`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
          onClick={() => handleRatingClick(star)}
          onPointerDown={handlePointerDown} // Start dragging
          onPointerEnter={() => handlePointerMove(star)} // Handle drag over stars
          whileTap={{ scale: 1.7 }} // Adds the scale animation on click
          transition={{ type: "spring", stiffness: 300 }} // Spring effect for smooth scaling
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </motion.svg>
      ))}
    </div>
  );
};

export default RatingSelector;
