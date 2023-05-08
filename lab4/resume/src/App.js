import React from "react";
import { Layout } from "./Components/Layout.js";
import { Home } from "./pages/Home.js";
import { About } from "./pages/About.js";
import { Education } from "./pages/Education.js";
import { Skills } from "./pages/Skills.js";
import { Projects } from "./pages/Projects.js";

function App() {
  return (
    <Layout>
        <Home />
        <About />
        <Education />
        <Skills />
        <Projects />
    </Layout>
  );
}

export default App;
