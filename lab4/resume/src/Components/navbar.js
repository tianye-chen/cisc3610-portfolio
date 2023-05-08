import React from "react";
import { NavItem } from "./NavItem.js";
import { Link } from "react-scroll";

export const Navbar = () => {
  return (
    <nav class="fixed inline-flex items-center justify-between w-full bg-[#02271A]">
      <h1 class="flex w-full font-bold text-3xl ml-8 my-4 text-white"> Tianye Chen </h1>
      <ul class="md:flex items-center justify-end w-full mr-3 my-2 hidden">
        <Link to="home" smooth="true" duration="500">
          <NavItem text="Home" />
        </Link>
        <Link to="about" smooth="true" duration="500">
          <NavItem text="About" />
        </Link>
        <Link to="education" smooth="true" duration="500">
          <NavItem text="Education" />
        </Link>
        <Link to="skills" smooth="true" duration="500">
          <NavItem text="Skills" />
        </Link>
        <Link to="projects" smooth="true" duration="500">
          <NavItem text="Projects" />
        </Link>
      </ul>
    </nav>
  );
};
