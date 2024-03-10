import React, { useEffect, useState } from "react";
import SideNavLayout from "../layout/SideNavLayout";
import SingleNavLink from "../custom/SingleNavLink";
import TvSvg from "../../assets/TvSvg";
import MovieSvg from "../../assets/MovieSvg";
import InfoSvg from "../../assets/InfoSvg";
import { DataContext } from "../../providers/DataProvider";
import { MovieData, TvData } from "../../data";

const SideNav = () => {
  const { data, setData } = DataContext();
  const [activeIndex, setActiveIndex] = useState(data.activeCategory);
  const exData = [MovieData, TvData, MovieData];
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
      console.log(event.key);
      switch (event.key) {
        case "ArrowUp":
          setActiveIndex((prevIndex) => Math.max(0, prevIndex - 1));
          break;
        case "ArrowDown":
          setActiveIndex((prevIndex) => Math.min(2, prevIndex + 1));
          break;
        case "ArrowRight":
          setData({
            ...data,
            location: "movie",
            MovieData: exData[activeIndex],
          });
          break;
        case "Enter":
          setData({ ...data, location: "movie", activeCategory: activeIndex });
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
  }, [data.location,data.activeCategory, activeIndex]);

  return (
    <SideNavLayout>
      {navItemList.map((item, index) => (
        <SingleNavLink key={item.id} active={activeIndex === index}>
          {item.icon}
          <div
            className={`text-xl absolute ${activeIndex === index ? "text-[#FF3988]" : "text-white"} ${
              data.location === "nav" ? "left-16 opacity-100" : "-left-16 opacity-0"
            } transition-all duration-500 ease-in-out`}
          >
            {item.name}
          </div>
        </SingleNavLink>
      ))}
    </SideNavLayout>
  );
};

export default SideNav;
