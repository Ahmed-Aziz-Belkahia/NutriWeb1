import React from "react";
import feature1 from "../../assets/images/2.png";
import feature2 from "../../assets/images/3.png";
import feature3 from "../../assets/images/4.png";
import feature4 from "../../assets/images/5.png";
import featureframe from "../../assets/images/image2.png";


const features = [
  {
    image: feature1,
    title: "AI Meal Recognition",
    description:
      "Snap a photo and get instant nutritional breakdown with our advanced AI technology.",
    direction: "fade-right",
    initial: { opacity: 0, x: -50 },
    whileInView: { opacity: 1, x: 0 },
  },
  {
    image: feature2,
    title: "Smart Weekly Plans",
    description:
      "Personalized meal planning that adapts to your lifestyle, goals, and preferences.",
    direction: "fade-right",
    initial: { opacity: 0, x: -50 },
    whileInView: { opacity: 1, x: 0 },
  },
  {
    image: feature3,
    title: "Recipe Discovery",
    description:
      "Turn available ingredients into delicious meals with AI-generated recipe suggestions.",
    direction: "fade-left",
    initial: { opacity: 0, x: 50 },
    whileInView: { opacity: 1, x: 0 },
  },
  {
    image: feature4,
    title: "Progress Tracking",
    description:
      "Monitor your body composition, weight changes, and nutrition goals with visual insights.",
    direction: "fade-left",
    initial: { opacity: 0, x: 50 },
    whileInView: { opacity: 1, x: 0 },
  },
];

const Featuresection = () => {
  return (
    <div>
      <section className="row_am features_section">
        {/* container start */}
        <div className="container">
          <div
            className="section_title aos-init aos-animate"
            data-aos="fade-up"
            data-aos-duration={1500}
            data-aos-delay={100}
          >
            
              <span className="title_badge mb-1">Powered by AI</span>
              {/* h2 */}
              <h2>Your Personal Nutrition Assistant</h2>
              {/* p */}
              <p>
                NutriAI combines cutting-edge AI technology with personalized nutrition science to help you achieve your health goals effortlessly.
              </p>
           
          </div>
          <div className="feature_detail">
            {/* feature box left */}
            <div className="left_data feature_box">
              {features.slice(0, 2).map((feature, index) => (
                <div
                  key={index}
                  className="data_block aos-init aos-animate"
                  data-aos={feature.direction}
                  data-aos-duration={1500}
                >
                  
                    <div className="icon">
                      <img src={feature.image} alt="section-img" />
                    </div>
                    <div className="text">
                      <h6>{feature.title}</h6>
                      <p>{feature.description}</p>
                    </div>
                 
                </div>
              ))}
            </div>
            {/* feature box right */}
            <div className="right_data feature_box">
              {features.slice(2).map((feature, index) => (
                <div
                  key={index}
                  className="data_block aos-init aos-animate"
                  data-aos={feature.direction}
                  data-aos-duration={1500}
                >
                  
                    <div className="icon">
                      <img src={feature.image} alt="section-img" />
                    </div>
                    <div className="text">
                      <h6>{feature.title}</h6>
                      <p>{feature.description}</p>
                    </div>
                 
                </div>
              ))}
            </div>
            {/* feature image */}
            <div
              className="feature_img aos-init aos-animate"
              data-aos="fade-up"
              data-aos-duration={1500}
              data-aos-delay={100}
            >
             
                <img src={featureframe} alt="section-img" />
              
            </div>
          </div>
        </div>
        {/* container end */}
      </section>
    </div>
  );
};

export default Featuresection;
