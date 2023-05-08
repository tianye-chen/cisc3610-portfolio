import React from "react";

export const NavItem = ({text}) => {
  return (
    <div class="cursor-pointer">
      <li class="mx-4 text-white text-xl font-thin">{text}</li>
    </div>
  );
}