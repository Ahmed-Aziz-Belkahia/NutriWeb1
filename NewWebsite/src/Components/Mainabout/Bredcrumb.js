import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import usp1 from "../../assets/images/usp1.png";
import usp2 from "../../assets/images/usp2.png";
import usp3 from "../../assets/images/usp3.png";
import usp4 from "../../assets/images/usp4.png";


const value = {
  breakpoints: {
    0: {
      slidesPerView: 2,
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

const Bredcrumb = () => {
  

  const uspData = [
    {
      imgSrc: usp1,
      count: 50,
      label: "k+",
      description: "Meals Scanned",
    },
    {
      imgSrc: usp2,
      count: 5,
      label: "k+",
      description: "Active Users",
    },
    {
      imgSrc: usp3,
      count: 98,
      label: "%",
      description: "Success Rate",
    },
    {
      imgSrc: usp4,
      count: 20,
      label: "k+",
      description: "Recipes Generated",
    },
  ];

  const [counterValues, setCounterValues] = useState(
    uspData.map((item) => ({ id: item.id, value: 0 }))
  );

  useEffect(() => {
    
    uspData.forEach((item, index) => {
      let currentCount = 0;
      const interval = setInterval(() => {
        if (currentCount < item.count) {
          currentCount += 1;
          setCounterValues((prev) => {
            const newValues = [...prev];
            newValues[index].value = currentCount;
            return newValues;
          });
        } else {
          clearInterval(interval);
        }
      }, 50); 
    });
  }, []);

  return (
    <div>
      <div className="bred_crumb abt abt-banner">
        
        <div className="dotes_anim_bloack">
          <div className="dots dotes_1" />
          <div className="dots dotes_2" />
          <div className="dots dotes_3" />
          <div className="dots dotes_4" />
          <div className="dots dotes_5" />
          <div className="dots dotes_6" />
          <div className="dots dotes_7" />
          <div className="dots dotes_8" />
          <div className="dots dotes_9" />
          <div className="dots dotes_10" />
        </div>
        
        <div className="container">
          {/*  banner text  */}
          <div className="bred_text">
            <span className="title_badge mb-1">about us</span>
            <h1>
              Your AI-Powered Nutrition Companion for a Healthier Lifestyle
            </h1>
            <p>
              NutriAI combines cutting-edge artificial intelligence with nutrition science to help you achieve your health goals. 
              From scanning meals to personalized meal plans, we make healthy eating simple and enjoyable. Our smart technology 
              tracks your progress, generates recipes, and provides insights to keep you motivated on your wellness journey.
            </p>
            <ul>
              <li>
                <Link to="/Home">Home</Link>
              </li>
              <li>
                <span>»</span>
              </li>
              <li>
                <Link to="/About">About us</Link>
              </li>
            </ul>
          </div>
          {/* banner usp number   */}
          <div className="banner-usp">
            <div className="container">
              <ul
                className="app_statstic aos-init aos-animate"
                id="counter"
                data-aos="fade-in"
                data-aos-duration={1500}
              >
                {uspData.map((uspData, index) => (
                  <li key={index}>
                    <div className="usp_box" {...value}>
                      
                        <div className="icon">
                          <img src={uspData.imgSrc} alt="bredcrumb-img" />
                        </div>
                        <div className="text">
                          <p>
                            <span className="counter-value">
                              {counterValues[index]
                                ? counterValues[index].value
                                : 0}
                            </span>
                            <span>{uspData.label}</span>
                          </p>
                          <p>{uspData.description}</p>
                        </div>
                      
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bredcrumb;
