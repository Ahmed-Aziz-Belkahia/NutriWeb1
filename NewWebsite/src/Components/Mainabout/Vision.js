import React from "react";
import valueicon from "../../assets/images/value-icon.png";
import visionicon from "../../assets/images/vision-icon.png";
import missionicon from "../../assets/images/mission-icon.png";


const value = {
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    600: {
      slidesPerView: 4,
    },
    1000: {
      slidesPerView: 4,
    },
    1400: {
      margin: 60,
    },
  },
};

const Vision = () => {
  const visionData = [
    {
      imgSrc: valueicon,
      title: "Core Values",
      description:
        "We believe in making nutrition accessible and enjoyable for everyone. Our commitment to innovation, accuracy, and user experience drives everything we do.",
      animation: "fade-left",
      duration: 1500,
    },
    {
      imgSrc: visionicon,
      title: "Our Vision",
      description:
        "To empower millions of people worldwide to achieve their health goals through intelligent, personalized nutrition guidance powered by AI technology.",
      animation: "fade-left",
      duration: 1800,
    },
    {
      imgSrc: missionicon,
      title: "Our Mission",
      description:
        "To revolutionize healthy eating by combining AI technology with nutrition science, making it simple for everyone to track meals, plan better, and live healthier lives.",
      animation: "fade-left",
      duration: 2000,
    },
  ];

  return (
    <div>
      <section className="row_am value_visoin_mision">
        {/* container start */}
        <div className="container">
          <div className="value_content">
            {/* row start */}
            <div className="row">
              {/*  box 1  */}
              {visionData.map((vision, index) => (
                <div className="col-md-4" key={index}>
                  
                    <div
                      className="value_box aos-init aos-animate"
                      data-aos={vision.animation}
                      data-aos-duration={vision.duration}
                    >
                      <img
                        src={vision.imgSrc}
                        alt="vision-img"
                        className="icon"
                      />
                      <h4>{vision.title}</h4>
                      <p>{vision.description}</p>
                    </div>
                  
                </div>
              ))}
            </div>
            {/* row end */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Vision;
