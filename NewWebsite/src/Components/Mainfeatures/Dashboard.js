import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faChartLine, faUtensils } from '@fortawesome/free-solid-svg-icons';
import analyticimg from "../../assets/images/best-feature-1.png";
import reportimg from "../../assets/images/best-feature-2.png";
import paymentimg from "../../assets/images/best-feature-3.png";


const Dashboard = () => {
  return (
    <div>
      <section className="row_am dashboard_analytics" id="analytics">
        {/* container start */}
        <div className="container">
          <div
            className="section_title top_content aos-init aos-animate"
            data-aos="fade-up"
            data-aos-duration={1500}
            data-aos-de
            lay={300}
          >
            
              <span className="title_badge mb-1">core features</span>
              <h2>Everything You Need in One App</h2>
              <p>
                Track your meals, plan your week, and understand your nutrition with powerful AI-driven tools designed for simplicity and results.
              </p>
            
          </div>
          <div className="row">
            {/* box 1  */}
            <div className="col-md-12">
              <div className="analytic-box">
                <div className="row">
                  <div className="col-md-6">
                    <div className="analytic-content">
                      <div className="icon" style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '70px',
                        height: '70px',
                        borderRadius: '50%',
                        backgroundColor: '#DBEAFE'
                      }}>
                        <FontAwesomeIcon icon={faUtensils} style={{ fontSize: '30px', color: '#75C5C1' }} />
                      </div>
                      <div className="text">
                        <h4>Personalized Meal Planning</h4>
                        <p>
                          Plan your meals for the week in seconds. Get suggestions that match your taste, goals, and schedule — no more guessing what's for dinner.
                        </p>
                      </div>
                      <div className="btn_block">
                        
                          <Link
                            to="/beta"
                            className="btn puprple_btn aos-init aos-animate"
                            data-aos="fade-in"
                            data-aos-duration={1500}
                          >
                            Try NutriAI
                          </Link>
                       
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="analytic-img">
                      <img src={analyticimg} alt="dashboard-img" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* box 2  */}
            <div className="col-md-6 mt-5">
              <div className="analytic-box">
                <div className="analytic-content">
                  <div className="icon" style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '70px',
                    height: '70px',
                    borderRadius: '50%',
                    backgroundColor: '#e8f5e9'
                  }}>
                    <FontAwesomeIcon icon={faCamera} style={{ fontSize: '30px', color: '#C51A1B' }} />
                  </div>
                  <div className="text">
                    <h4>Smart Food Tracking</h4>
                    <p>
                      Log meals easily or snap a photo to track your nutrition instantly. Nutri helps you understand what you eat and how it fuels your body.
                    </p>
                  </div>
                  <div className="analytic-img1">
                    <img src={reportimg} alt="dashboard-img" />
                  </div>
                </div>
              </div>
            </div>
            {/* box 3  */}
            <div className="col-md-6 mt-5">
              <div className="analytic-box">
                <div className="analytic-content">
                  <div className="icon" style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '70px',
                    height: '70px',
                    borderRadius: '50%',
                    backgroundColor: '#fff3e0'
                  }}>
                    <FontAwesomeIcon icon={faChartLine} style={{ fontSize: '30px', color: '#ff9800' }} />
                  </div>
                  <div className="text">
                    <h4>Goal Progress & Insights</h4>
                    <p>
                      See your progress in clear charts that make staying consistent simple. From calories to macros to mood, watch your improvements grow.
                    </p>
                  </div>
                  <div className="analytic-img1">
                    <img src={paymentimg} alt="dashboard-img" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
