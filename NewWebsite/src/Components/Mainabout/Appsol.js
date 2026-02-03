import React from "react";
import { Link } from "react-router-dom";
import page1 from "../../assets/images/image2.png";


const Appsol = () => {
  return (
    <div>
      <section className="row_am app_solution_section">
        {/* container start */}
        <div className="container">
          {/* row start */}
          <div className="row">
            <div className="col-lg-6">
              {/* UI content */}
              <div className="app_text">
                <div
                  className="section_title aos-init aos-animate"
                  data-aos="fade-up"
                  data-aos-duration={1500}
                  data-aos-delay={100}
                >
                  
                    <span className="title_badge mb-1">company overview</span>
                    <h3>
                      Transform Your Nutrition Journey with AI-Powered Intelligence
                    </h3>
                 
                </div>
                
                  <p
                    data-aos="fade-up"
                    data-aos-duration={1500}
                    className="aos-init aos-animate"
                  >
                    NutriAI is your complete nutrition companion, designed to make healthy eating effortless. 
                    Our advanced AI technology scans and recognizes meals instantly, generates personalized 
                    meal plans, and tracks your progress with detailed insights. Whether you're managing your 
                    weight, building muscle, or simply eating healthier, NutriAI adapts to your unique goals 
                    and lifestyle.
                  </p>
                  {/* button   */}
                  <div className="btn_block">
                    <a
                      href="https://apps.apple.com/app/nutri-ai"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn puprple_btn aos-init aos-animate"
                      data-aos="fade-in"
                      data-aos-duration={500}
                    >
                      Download NutriAI
                    </a>
                  </div>
               
              </div>
            </div>
            {/*  image  */}
            <div className="col-lg-6">
              <div
                className="app_images aos-init aos-animate"
                data-aos="fade-in"
                data-aos-duration={1500}
              >
                
                  <img src={page1} alt="app-img" />
                
              </div>
            </div>
          </div>
        </div>
        {/* container end */}
      </section>
    </div>
  );
};

export default Appsol;
