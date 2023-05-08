import React from "react";
import { Github, Linkedin, Envelope, Files } from "react-bootstrap-icons";

export const Home = () => {
  return (
    <div name="home" class="h-screen w-screen flex flex-col justify-center border-2 px-8 mx-auto">
      {/* Subject text */}
      <h1 class="text-7xl font-thin text-slate-400">
        Hello, I'm <span class="text-white font-normal border-b-4 border-[#00FFA7] text-8xl">Tianye Chen</span>,
      </h1>
      <h2 class="text-5xl font-thin text-slate-400 mt-3">
        I am a <span class="text-white">Software Developer</span>.
      </h2>
      <i class="bi bi-github"></i>

      {/* Social media links */}
      <div class="flex flex-row gap-4 mt-3">
        <a href="https://github.com/tianye-chen" target="_blank" rel="noreferrer">
          <Github size="32" class="text-slate-400 hover:text-white" />
        </a>
        <a href="https://www.linkedin.com/in/tianyechen/" target="_blank" rel="noreferrer">
          <Linkedin size="32" class="text-slate-400 hover:text-white" />
        </a>
      </div>

      {/* Email contact info */}
      <div class="flex flex-row gap-2 mt-3 ml-[0.2rem] w-min">
        <div class="flex flex-row gap-2 group/email">
          <Envelope size="24" class="text-slate-400 group-hover/email:text-white" />
          <p class="text-slate-400 group-hover/email:text-white font-thin">tianyecf@gmail.com</p>
        </div>
        <Files
          size="16"
          class="text-slate-400 hover:text-white mt-[0.3rem] cursor-pointer"
          onClick={() => navigator.clipboard.writeText("tianyecf@gmail.com")}
        />
      </div>
    </div>
  );
};
