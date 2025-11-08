import React from "react";
import { Link } from "react-router-dom";
import element1 from "../../assets/images/element1.png";


const Ourjourney = () => {

  const Data = [
    {
      year: "December 2024",
      title: "The Idea is Born",
      description: "NutriAI began with a spark of inspiration — the vision to create an intelligent nutrition assistant that could personalize healthy eating for everyone. The founding team started research and early development of the app.",
      number: "1",
    },
    {
      year: "August 2025",
      title: "Securing Funding",
      description: "After months of progress and refining the concept, NutriAI received its first major investment from A.M.O. Company, providing the financial backing needed to expand the team and accelerate product development.",
      number: "2",
    },
    {
      year: "November 2025",
      title: "Beta Testing Launch",
      description: "NutriAI entered its beta testing phase, inviting early users to explore the app, provide feedback, and help shape the final product before its public launch.",
      number: "3",
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
                      <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '32px',
                        fontWeight: '700',
                        color: 'white'
                      }}>
                        {data.number}
                      </div>
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
