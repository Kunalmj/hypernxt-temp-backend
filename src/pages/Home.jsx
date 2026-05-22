import React, { useState } from "react";
import Hero from "../components/homepage/Hero";
import BrowseServices from "../components/homepage/BrowseServices";
import NeedHelp from "../components/homepage/NeedHelp";
import AIBanner from "../components/homepage/AIBanner";
import Testimonials from "../components/homepage/Testimonials";
import Services from "./Services";

const Home = () => {
  const [query, setQuery] = useState("");

  return (
    <div 
      style={{ 
        background: "linear-gradient(160deg, #f0f7ff 0%, #f5f8ff 40%, #fdf4fb 75%, #fff8f5 100%)", 
        minHeight: "100vh", 
        fontFamily: "'Inter', 'Segoe UI', sans-serif" 
      }}
    >
      <Hero query={query} setQuery={setQuery} />
      
      <BrowseServices query={query} />
      
      {/* <NeedHelp /> */}
      <Services hideCTA={true} isHome={true} />
      {/* <AIBanner /> */}
      
      <Testimonials />
    </div>
  );
};

export default Home;