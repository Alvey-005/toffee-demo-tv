import { serverData } from "../../data";
import React from "react";

const Card = React.forwardRef(({ index, activeCardIndex, setActiveCardIndex, data }, ref) => {
    const isActive = data.location === "movie" && activeCardIndex === index;
    return (
        <div
            ref={ref}
            className={`card
             flex aspect-video transform
              items-center
               justify-center 
               rounded-md bg-gray-200 
               shadow-md transition-transform duration-300 
               `}
            onClick={() => setActiveCardIndex(index)}
        >
            <img
                src={serverData[data.activeCategory][index].image}
                className={`h-full w-full rounded-md 
           ${isActive ? "border-4 border-[#FF3988]" : ""} 
           hover:border-4 hover:border-[#FF398860]/60 `}
                onError={(e) => {
                    e.currentTarget.src = "./img/eee.png";
                }}
            />
        </div>
    );
});

export default Card;
