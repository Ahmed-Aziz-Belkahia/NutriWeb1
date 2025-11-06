import React from "react";
import Headerr from "../Global/Headerr";
import Bredcrumb from "../Global/Bredcrumb";
import Featureslist from "../Mainfeatures/Featureslist";
import Dashboard from "../Mainfeatures/Dashboard";
import Testimonal from "../Global/Testimonal";
import Featuresection from "../Mainfeatures/Featuresection";
import Downloadapp from "../Global/Downloadapp";
import Cta from "../Global/Cta";
import Footer from "../Global/Footer";

const main = () => {
  return (
    <div>
      <Headerr />
      <Bredcrumb
        Heading={"what we provide"}
        Description={
          "Everything you need to stay on track with your nutrition and wellness goals. Nutri brings smart tools and AI-powered insights into one simple app."
        }
        Title={"Features of NutriAI"}
        Subtitle={"Features"}
      />
      <Featureslist />
      <Dashboard />
      <Testimonal />
      <Featuresection />
      <Downloadapp />
      <Cta />
      <Footer />
    </div>
  );
};

export default main;
