import React, { Fragment } from "react";
import { Navbar } from "../Components/navbar.js";

export const Layout = (props) => {
  return (
    <Fragment>
      <Navbar />

      <main>
        {props.children}
      </main>
    </Fragment>
  )
}