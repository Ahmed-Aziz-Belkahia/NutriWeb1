import React from "react";
import { Link } from "react-router-dom";
import element1 from "../../assets/images/element1.png";
import element2 from "../../assets/images/element2.png";
import aboutpage2 from "../../assets/images/4.png";


const Appsection = () => {
  return (
    <div>
      <section className="row_am about_app_section about_page_sectino we_best">
        {/* element start */}
        <div className="element">
          <span className="element1">
            <img src={element1} alt="section-img" />
          </span>
          <span className="element2">
            <img src={element2} alt="section-img" />
          </span>
        </div>
        {/* element end */}
        {/* container start */}
        <div className="container">
          {/* row start */}
          <div className="row">
            <div className="col-lg-6">
              {/* about images */}
              
                <div
                  className="abt_img aos-init aos-animate"
                  data-aos="fade-in"
                  data-aos-duration={1500}
                >
                  <img src={aboutpage2} alt="section-img" />
                </div>
             
            </div>
            <div className="col-lg-6">
              {/* about text */}
              <div className="about_text">
                <div
                  className="section_title aos-init aos-animate"
                  data-aos="fade-up"
                  data-aos-duration={1500}
                  data-aos-delay={100}
                >
                  
                    <span className="title_badge mb-1"> Why we are best </span>
                    {/* h2 */}
                    <h3> Smart Technology, Personalized Results</h3>
                 
                </div>
                {/* p */}
                <p>
                  {" "}
                  NutriAI uses advanced artificial intelligence to provide accurate, personalized nutrition 
                  guidance that adapts to your unique lifestyle and goals.{" "}
                </p>
                <ul className="feature_list">
                  <li>
                    <div className="icon">
                      <span>
                        <i className="icofont-check-circled" />
                      </span>
                    </div>
                    <div className="text">
                      <p>AI-Powered Meal Recognition & Tracking</p>
                    </div>
                  </li>
                  <li>
                    <div className="icon">
                      <span>
                        <i className="icofont-check-circled" />
                      </span>
                    </div>
                    <div className="text">
                      <p>Personalized Weekly Meal Plans</p>
                    </div>
                  </li>
                  <li>
                    <div className="icon">
                      <span>
                        <i className="icofont-check-circled" />
                      </span>
                    </div>
                    <div className="text">
                      <p>Real-Time Progress & Insights</p>
                    </div>
                  </li>
                </ul>
                <div className="btn_block">
                  
                    <a
                      href="https://apps.apple.com/app/nutri-ai"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn puprple_btn aos-init aos-animate"
                      data-aos="fade-in"
                      data-aos-duration={1500}
                    >
                      Download Now
                    </a>
                 
                </div>
              </div>
            </div>
          </div>
          {/* row end */}
        </div>
        {/* container end */}
      </section>
    </div>
  );
};

export default Appsection;
