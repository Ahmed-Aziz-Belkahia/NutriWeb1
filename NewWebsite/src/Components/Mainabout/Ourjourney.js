import React from "react";
import { Link } from "react-router-dom";
import element1 from "../../assets/images/element1.png";
import timeline1 from "../../assets/images/timeline_img1.png";
import timeline2 from "../../assets/images/timeline_img2.png";
import timeline3 from "../../assets/images/timeline_img3.png";


const Ourjourney = () => {

  const Data = [
    {
      year: "2023",
      title: "NutriAI Launch",
      description: "Launched AI-powered nutrition tracking with meal scanning technology",
      image: timeline1,
    },
    {
      year: "2024",
      title: "5,000+ Active Users",
      description: "Reached thousands of users tracking meals and achieving health goals",
      image: timeline2,
    },
    {
      year: "2025",
      title: "Advanced Features",
      description: "Introduced personalized meal planning and recipe generation",
      image: timeline3,
    },
  ];

  return (
    <div>
      <section className="row_am our_journey">
        {/* container start */}
        <div className="container">
          <div className="row">
            {/*  left colom  */}
            <div className="col-md-6">
              {/*  heading  */}
              <div className="parent">
                <div className="child">
                  <div className="jouney-title section_title">
                    <span className="title_badge mb-1">our journey</span>
                    <h2> Growing Together Towards Better Health</h2>
                    <p>
                      From our launch to today, NutriAI has been on a mission to make healthy eating 
                      simple and accessible through innovative AI technology.
                    </p>
                    <div className="btn_block">
                      
                        <Link
                          to="/contact"
                          className="btn puprple_btn aos-init aos-animate"
                          data-aos="fade-in"
                          data-aos-duration={1500}
                        >
                          Contact us
                        </Link>
                     
                    </div>
                  </div>
                </div>
              </div>
              {/* element   */}
              <div className="element">
                <span className="element1">
                  <img src={element1} alt="journey-img" />
                </span>
              </div>
            </div>
            {/* text side   */}
            <div className="col-md-6">
              <div className="timeline_info timeline" id="timeline">
                {/*  box 1  */}
                {Data.map((data, index) => (
                  <div className="timeline_box" key={index}>
                    <div className="timeline_img">
                      <img src={data.image} alt="journey-img" />
                    </div>
                    <div className="timeline_content">
                      <div className="year-tag">{data.year}</div>
                      <h6>{data.title}</h6>
                      <p>{data.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Ourjourney;
