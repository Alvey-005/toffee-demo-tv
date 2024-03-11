import React, { useEffect, useState } from "react";
import SideNavLayout from "../layout/SideNavLayout";
import SingleNavLink from "../custom/SingleNavLink";
import TvSvg from "../../assets/TvSvg";
import MovieSvg from "../../assets/MovieSvg";
import InfoSvg from "../../assets/InfoSvg";
import { DataContext } from "../../providers/DataProvider";

const SideNav = () => {
  const { data, setData } = DataContext();
  const [activeIndex, setActiveIndex] = useState(data.activeCategory);
  const navItemList = [
    {
      id: "drama",
      name: "Drama",
      icon: <TvSvg />,
    },
    {
      id: "movies",
      name: "Movies",
      icon: <MovieSvg />,
    },
    {
      id: "info",
      name: "Info",
      icon: <InfoSvg />,
    },
  ];

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case "ArrowUp":
          setActiveIndex((prevIndex) => {
            const newIndex = Math.max(0, prevIndex - 1);
            return newIndex;
          });
          setData({ ...data, activeCategory: Math.max(0, activeIndex - 1),activeCategoryIndex:0 }); // Update setData immediately
          break;
        case "ArrowDown":
          setActiveIndex((prevIndex) => {
            const newIndex = Math.min(2, prevIndex + 1);
            return newIndex;
          });
          setData({ ...data, activeCategory: Math.min(2, activeIndex + 1),activeCategoryIndex:0 }); // Update setData immediately
          break;
        case "ArrowRight":
          setData({ ...data, location: "movie", activeCategory: activeIndex,activeCategoryIndex:0 });
          break;
        case "Enter":
          setData({ ...data, location: "movie", activeCategory: activeIndex,activeCategoryIndex:0 });
          break;
        default:
          break;
      }
    };

    if (data.location === "nav") {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [data.location, data.activeCategory, activeIndex]);

  return (
    <SideNavLayout>
      {navItemList.map((item, index) => (
        <SingleNavLink key={item.id} active={activeIndex === index} onClick={()=>{setActiveIndex(index);
          setData({ ...data, activeCategory: index,activeCategoryIndex:0 })
        }}>
          {item.icon}
          <div
            className={`text-xl absolute ${activeIndex === index ? "text-[#FF3988]" : "text-white"} ${data.location === "nav" ? "left-16 opacity-100" : "-left-16 opacity-0"
              } transition-all duration-500 ease-in-out hover:text-[#ff3988]/60`}
          >
            {item.name}
          </div>
        </SingleNavLink>
      ))}
    </SideNavLayout>
  );
};

export default SideNav;
