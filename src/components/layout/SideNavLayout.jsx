import React from "react";

const SideNavLayout = ({children}) => {
  return (
    <div
      className="fixed left-0 top-0 h-full w-[57px] border border-black
    shadow-sm flex flex-col justify-center items-center gap-4
    bg-[linear-gradient(90deg,_#130016_0%,_rgba(19,_0,_22,_0)_164.91%)]
    "
    >
      {children}
    </div>
  );
};

export default SideNavLayout;
