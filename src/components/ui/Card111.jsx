import React, { useEffect, useRef, useState } from 'react';

function CardGrid({ movieData }) {
  const numCards = movieData.length;
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
          } else if (activeCardIndex - 1 >= 0) {
            setActiveCardIndex((prevIndex) => prevIndex - 1);
            scrollActiveCardIntoView('left');
          }
          break;
        case 'ArrowRight':
          if (activeCardIndex % numColumns !== numColumns - 1 && activeCardIndex < numCards - 1) {
            setActiveCardIndex((prevIndex) => prevIndex + 1);
          } else if (activeCardIndex + 1 < numCards) {
            setActiveCardIndex((prevIndex) => prevIndex + 1);
            scrollActiveCardIntoView('right');
          }
          break;
        case 'ArrowUp':
          if (activeCardIndex - numColumns >= 0) {
            setActiveCardIndex((prevIndex) => prevIndex - numColumns);
            scrollActiveCardIntoView('up');
          }
          break;
        case 'ArrowDown':
          if (activeCardIndex + numColumns < numCards) {
            setActiveCardIndex((prevIndex) => prevIndex + numColumns);
            scrollActiveCardIntoView('down');
          }
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeCardIndex, numColumns, numCards]);

  const scrollActiveCardIntoView = (direction) => {
    if (!activeCardRef.current) return;

    const cardRect = activeCardRef.current.getBoundingClientRect();
    const gridRect = activeCardRef.current.parentElement.getBoundingClientRect();

    switch (direction) {
      case 'left':
        if (cardRect.left < gridRect.left) {
          activeCardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
        }
        break;
      case 'right':
        if (cardRect.right > gridRect.right) {
          activeCardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'end' });
        }
        break;
      case 'up':
        if (cardRect.top < gridRect.top) {
          activeCardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
        }
        break;
      case 'down':
        if (cardRect.bottom > gridRect.bottom) {
          activeCardRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' });
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="grid grid-cols-4 gap-4 h-screen">
      {movieData.map((data, index) => (
        <div
          key={index}
          ref={index === activeCardIndex ? activeCardRef : null}
          className={`card flex justify-center items-center bg-gray-200 aspect-video rounded-md shadow-md transition-transform duration-300 transform hover:scale-105 ${
            activeCardIndex === index ? 'activeCard' : ''
          }`}
          onClick={() => setActiveCardIndex(index)}
        >
          <img src={data.image} className="w-full h-full rounded-md" />
        </div>
      ))}
    </div>
  );
}

export default CardGrid;
