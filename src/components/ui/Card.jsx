import React, { useEffect, useRef, useState } from 'react';
import { TestDataContext } from '../../providers/TestDataProvider';

function CardGrid({}) {
  const { data, setData } = TestDataContext();
  const numCards = data.MovieData.length;
  const numColumns = 4;
  const numRows = Math.ceil(numCards / numColumns);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const activeCardRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowLeft':
          if (activeCardIndex % numColumns !== 0) {
            setActiveCardIndex((prevIndex) => prevIndex - 1);
          } else {
            setData({ ...data, location: 'nav' });
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
        case 'Enter':
          setData({ ...data, location: 'video'});
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

    if (data.location === 'movie') {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('wheel', handleMouseScroll);
    }

    return () => {
      if (data.location === 'movie') {
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('wheel', handleMouseScroll);
      }
    };
  }, [activeCardIndex, numColumns, numCards, data, setData]);

  useEffect(() => {
    if (activeCardRef.current && data.location === 'movie') {
      activeCardRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeCardIndex, data]);

  return (
    <div className="grid grid-cols-4 gap-3 h-[80vh]">
      {data.MovieData.map((p, index) => (
        <div
          key={index}
          ref={index === activeCardIndex ? activeCardRef : null}
          className={`card flex justify-center items-center bg-gray-200 aspect-video rounded-md shadow-md transition-transform duration-300 transform hover:scale-105 `}
          onClick={() => setActiveCardIndex(index)}
        >
          <img src={p.image} className={`w-full h-full rounded-md ${data.location === 'movie' && activeCardIndex === index ? 'border-4 border-[#FF3988]' : ''}`} />
        </div>
      ))}
    </div>
  );
}

export default CardGrid;
