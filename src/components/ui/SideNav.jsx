import React from "react";
import SideNavLayout from "../layout/SideNavLayout";
import SingleNavLink from "../custom/SingleNavLink";
import TvSvg from "../../assets/TvSvg";
import MovieSvg from "../../assets/MovieSvg";
import InfoSvg from "../../assets/InfoSvg";

const SideNav = () => {
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
