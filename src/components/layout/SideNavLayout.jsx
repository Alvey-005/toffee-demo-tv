import React from "react";
import { DataContext } from "../../providers/DataProvider";

const SideNavLayout = ({ children }) => {
  const { data, setData } = DataContext();
  return (
    <div
      onMouseEnter={() => setData({ ...data, location: "nav" })}
      onMouseLeave={() => setData({ ...data, location: "movie" })}
      className={`fixed left-0 top-0 h-full ${data.location === "nav" ? "w-[150px]" : "w-[57px]"} transition-width z-50
                flex flex-col items-center justify-center gap-4 border border-black
                bg-[linear-gradient(90deg,_#130016_0%,_rgba(19,_0,_22,_0)_164.91%)]
                shadow-sm duration-500 ease-in-out
            `}
    >
      {children}
    </div>
  );
};

export default SideNavLayout;
