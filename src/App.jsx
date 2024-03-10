import React, { useState } from "react";
import SideNav from "./components/ui/SideNav";
import CardGrid from "./components/ui/Card";
import { MovieData } from "./data";
import { DataContext } from "./providers/DataProvider";
import Video from "./components/ui/video";

function App() {
  const { data, setData } = DataContext();
  console.log("app", data);
  return data.location !== "video" ? (
    <div className="">
      <SideNav />
      <div className="ml-20 mr-8 mt-8">
        <div>
          <div className="mb-1 flex justify-end">
            <img src="./svg/toffee.svg" />
          </div>
          <div className="mb-[18px] text-xl text-[#E6EEF9]">Dramas & Series</div>
        </div>
        <div>
          <div className=" overflow-hidden">
            <CardGrid/>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <Video />
    </div>
  );
}

export default App;
