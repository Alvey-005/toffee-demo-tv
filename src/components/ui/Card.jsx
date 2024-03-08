import React, { useEffect, useRef, useState } from 'react';
import { TestDataContext } from '../../providers/TestDataProvider';

function CardGrid({ movieData }) {
  const numCards = movieData.length;
  const numColumns = 4;
  const numRows = Math.ceil(numCards / numColumns);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const activeCardRef = useRef(null);
  const { data, setData } = TestDataContext();

  console.log(data);

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowLeft':
          if (activeCardIndex % numColumns !== 0) {
            setActiveCardIndex((prevIndex) => prevIndex - 1);
          }
          break;
        case 'ArrowRight':
          if (activeCardIndex % numColumns !== numColumns - 1 && activeCardIndex < numCards - 1) {
            setActiveCardIndex((prevIndex) => prevIndex + 1);
          }
          break;
        case 'ArrowUp':
          if (activeCardIndex - numColumns >= 0) {
            setActiveCardIndex((prevIndex) => prevIndex - numColumns);
          }
          break;
        case 'ArrowDown':
          if (activeCardIndex + numColumns < numCards) {
            setActiveCardIndex((prevIndex) => prevIndex + numColumns);
          }
          break;
        default:
          break;
      }
    };

    const handleMouseScroll = (event) => {
      const deltaY = event.deltaY; // Positive for scroll down, Negative for scroll up

      if (deltaY > 0) {
        // Scrolled down, move to next card (if possible)
        if (activeCardIndex + numColumns < numCards) {
          setActiveCardIndex((prevIndex) => prevIndex + numColumns);
        }
      } else if (deltaY < 0) {
        // Scrolled up, move to previous card (if possible)
        if (activeCardIndex - numColumns >= 0) {
          setActiveCardIndex((prevIndex) => prevIndex - numColumns);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('wheel', handleMouseScroll); // Use 'wheel' for wider compatibility

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('wheel', handleMouseScroll);
    };
  }, [activeCardIndex, numColumns, numCards]);

  useEffect(() => {
    if (activeCardRef.current) {
      activeCardRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeCardIndex]);

  return (
    <div className="grid grid-cols-4 gap-4 h-screen">
      {data.map((data, index) => (
        <div
          key={index}
          ref={index === activeCardIndex ? activeCardRef : null}
          className={`card flex justify-center items-center bg-gray-200 aspect-video rounded-md shadow-md transition-transform duration-300 transform hover:scale-105 `}
          onClick={() => setActiveCardIndex(index)}
        >
          <img src={data.image} className={`w-full h-full rounded-md ${activeCardIndex === index ? 'border-4 border-[#FF3988]' : ''}`} />
        </div>
      ))}
    </div>
  );
}

export default CardGrid;
