import React, { useEffect, useRef, useState } from 'react';
import { DataContext } from '../../providers/DataProvider';
import { serverData } from '../../data'
import Card from './Card';

function CardGrid({ }) {
  const { data, setData } = DataContext();
  const numCards = serverData[data.activeCategory].length;
  const numColumns = 4;
  const [activeCardIndex, setActiveCardIndex] = useState(data.activeCategoryIndex);
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
          setData({ ...data, location: 'video',
           activeCategoryIndex: activeCardIndex 
          });
          break;
        default:
          break;
      }
    };

    const handleMouseScroll = (event) => {
      const deltaY = event.deltaY;

      if (deltaY > 0) {
        if (activeCardIndex + numColumns < numCards) {
          setActiveCardIndex((prevIndex) => prevIndex + numColumns);
        }
      } else if (deltaY < 0) {
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
      {serverData[data.activeCategory].map((p, index) => (
        <Card
          key={index}
          index={index}
          activeCardIndex={activeCardIndex}
          setActiveCardIndex={setActiveCardIndex}
          data={data}
          ref={index === activeCardIndex ? activeCardRef : null} />
      ))}
    </div>
  );
}

export default CardGrid;
