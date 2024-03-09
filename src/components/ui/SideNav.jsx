import React, { useEffect, useState } from "react";
import SideNavLayout from "../layout/SideNavLayout";
import SingleNavLink from "../custom/SingleNavLink";
import TvSvg from "../../assets/TvSvg";
import MovieSvg from "../../assets/MovieSvg";
import InfoSvg from "../../assets/InfoSvg";
import { TestDataContext } from "../../providers/TestDataProvider";
import { MovieData, TvData } from "../../data";

const SideNav = () => {
  const { data, setData } = TestDataContext();
  const [activeIndex, setActiveIndex] = useState(0);
  console.log(data, activeIndex);
  const exData = [MovieData, TvData, MovieData];

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
          setData({ ...data, location: "movie", MovieData: exData[activeIndex] });
          break;
        case "Enter":
          setData({ ...data, MovieData: exData[activeIndex] });
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
  }, [data.location, activeIndex]);

  return (
    <SideNavLayout>
      <SingleNavLink active={activeIndex === 0}>
        <TvSvg />
      </SingleNavLink>
      <SingleNavLink active={activeIndex === 1}>
        <MovieSvg />
      </SingleNavLink>
      <SingleNavLink active={activeIndex === 2}>
        <InfoSvg />
      </SingleNavLink>
    </SideNavLayout>
  );
};

export default SideNav;
