import React, { useState } from "react";
import SideNav from "./components/ui/SideNav";
import CardGrid from "./components/ui/CardGrid";
import { MovieData } from "./data";
import { DataContext } from "./providers/DataProvider";
import Video from "./components/ui/video";
import ContentLayout from "./components/layout/ContentLayout";

function App() {
  const { data, setData } = DataContext();
  return data.location !== "video" ? (
    <div className="">
      <SideNav />
      <ContentLayout/>
    </div>
  ) : (
    <div>
      <Video />
    </div>
  );
}

export default App;
