import React from "react";
import SideNavLayout from "../layout/SideNavLayout";
import SingleNavLink from "../custom/SingleNavLink";
import TvSvg from "../../assets/TvSvg";
import MovieSvg from "../../assets/MovieSvg";
import InfoSvg from "../../assets/InfoSvg";
import { TestDataContext } from "../../providers/TestDataProvider";

const SideNav = () => {
  const { data, setData } = TestDataContext();
  return (
    <SideNavLayout>
      <SingleNavLink active={true} >
        <TvSvg />
      </SingleNavLink>
      <SingleNavLink active={false} >
        <MovieSvg />
      </SingleNavLink>
      <SingleNavLink active={false} >
        <InfoSvg />
      </SingleNavLink>

    </SideNavLayout>
  );
};

export default SideNav;
