import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUtensils, 
  faCamera, 
  faChartLine, 
  faCalendarAlt, 
  faShoppingCart, 
  faAppleAlt 
} from '@fortawesome/free-solid-svg-icons';


const features = [
  {
    title: "AI Meal Scanning",
    description:
      "Snap a photo of your meal and let AI instantly identify ingredients, calculate nutrition, and log it automatically. No manual entry needed.",
    icon: faCamera,
    color: "#C51A1B",
    bgColor: "#e8f5e9"
  },
  {
    title: "Smart Meal Planning",
    description:
      "Get personalized weekly meal plans based on your goals, preferences, and dietary needs. Planning your nutrition has never been easier.",
    icon: faCalendarAlt,
    color: "#75C5C1",
    bgColor: "#DBEAFE"
  },
  {
    title: "Nutrition Tracking",
    description:
      "Track calories, macros, and micronutrients effortlessly. Understand what fuels your body and make informed dietary choices every day.",
    icon: faChartLine,
    color: "#ff9800",
    bgColor: "#fff3e0"
  },
  {
    title: "Recipe Generation",
    description:
      "Scan ingredients in your kitchen and discover what you can make. Get creative recipe suggestions to reduce waste and eat better.",
    icon: faUtensils,
    color: "#e91e63",
    bgColor: "#fce4ec"
  },
  {
    title: "Shopping Lists",
    description:
      "Automatically generate shopping lists from your meal plans. Stay organized and never forget an ingredient at the store again.",
    icon: faShoppingCart,
    color: "#9c27b0",
    bgColor: "#f3e5f5"
  },
  {
    title: "Body Analysis",
    description:
      "Track your body composition, weight changes, and progress over time. See how your nutrition impacts your physical transformation.",
    icon: faAppleAlt,
    color: "#00bcd4",
    bgColor: "#e0f7fa"
  },
];

const Featureslist = () => {
  return (
    <div>
      <section className="row_am features_list">
        {/* container start */}
        <div className="container">
          <div className="row">
            {/* box 1  */}
            {features.map((feature, index) => (
              <div className="col-lg-4 col-md-6" key={index}>
                
                  <div
                    className="list-box aos-init aos-animate"
                    data-aos="fade-left"
                    data-aos-duration={1500}
                  >
                    <div className="list-content">
                      <div className="icon" style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '70px',
                        height: '70px',
                        borderRadius: '50%',
                        backgroundColor: feature.bgColor
                      }}>
                        <FontAwesomeIcon 
                          icon={feature.icon} 
                          style={{ 
                            fontSize: '30px', 
                            color: feature.color 
                          }} 
                        />
                      </div>
                      <div className="text">
                        <h6>{feature.title}</h6>
                        <p>{feature.description}</p>
                      </div>
                    </div>
                  </div>
                
              </div>
            ))}
            {/* button   */}
            <div className="btn_block">
              
                <a
                  href="https://apps.apple.com/app/nutri-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn puprple_btn aos-init aos-animate"
                  data-aos="fade-in"
                  data-aos-duration={1500}
                >
                  Download NutriAI
                </a>
             
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Featureslist;
