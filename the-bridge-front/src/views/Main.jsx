import React from "react";
import NavLanding from "../component/layers/NavLanding";

import { Outlet } from 'react-router-dom'


function Main() {
  return (
    <div className="h-full w-full">
      <div className="h-[80px] pt-2 pl-4 w-full bg-white">
        <NavLanding />
      </div>
      <Outlet />
    </div>
  );
}

export default Main;
