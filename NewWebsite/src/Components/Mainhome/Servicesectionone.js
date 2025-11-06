import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils, faCamera } from '@fortawesome/free-solid-svg-icons'
import feature_icon_1 from "../../assets/images/bf_ico1.png"
import feature_1 from "../../assets/images/best-feature-1.png"
import feature_icon_2 from "../../assets/images/bf_ico2.png"
import feature_2 from "../../assets/images/best-feature-2.png"
import feature_icon_3 from "../../assets/images/bf_ico3.png"
import feature_3 from "../../assets/images/best-feature-3.png"
import appstore_blue from "../../assets/images/appstore_blue.png"
import appstore_white from "../../assets/images/appstore_white.png"
import googleplay_blue from "../../assets/images/googleplay_blue.png"
import googleplay_white from "../../assets/images/googleplay_white.png"
import { Link } from "react-router-dom"



const Servicesectionone = () => {
  return (
    <div>
      <section className="row_am service_section best_features">
        <div className="inner_sec">

          <div className="container">

            <div
              className="section_title aos-init aos-animate"
              data-aos="fade-up"
              data-aos-duration={1500}
              data-aos-delay={300}
            >
              <span className="title_badge mb-1">what we provide</span>

              <h2>Everything you need to stay on track</h2>

              <p>
                Nutri brings all the tools for balanced, healthy living into one simple app — so you can focus on progress, not perfection.
              </p>
            </div>

            <div className="row service_blocks">

              <div className="col-lg-1 col-md-12" />

              <div className="col-lg-5 col-md-12 ">
                <div
                  className="service_text aos-init aos-animate"
                  data-aos="fade-up"
                  data-aos-duration={1500}
                >
                  <span className="section_icon" style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    width: '70px',
                    height: '70px',
                    borderRadius: '50%',
                    backgroundColor: '#DBEAFE'
                  }}>
                    {" "}
                    <FontAwesomeIcon icon={faUtensils} style={{ fontSize: '30px', color: '#4A90E2' }} />{" "}
                  </span>
                  <h4>
                    <span>Personalized</span> meal planning
                  </h4>
                  <p>
                    Plan your meals for the week in seconds. Get suggestions that match your taste, goals, and schedule — no more guessing what's for dinner.
                  </p>
                </div>
              </div>

              <div className="col-lg-6 col-md-12">
                <div className="img aos-init aos-animate" data-aos="fade-up" data-aos-duration={1500}>
                  <img
                    className="moving_position_animatin"
                    src={feature_1}
                    alt="image"
                  />
                </div>
              </div>
            </div>

            <div className="row service_blocks flex-row-reverse">

              <div className="col-lg-6 col-md-12">
                <div
                  className="service_text right_side aos-init aos-animate"
                  data-aos="fade-up"
                  data-aos-duration={1500}
                >
                  <span className="section_icon" style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    width: '70px',
                    height: '70px',
                    borderRadius: '50%',
                    backgroundColor: '#e8f5e9'
                  }}>
                    {" "}
                    <FontAwesomeIcon icon={faCamera} style={{ fontSize: '30px', color: '#4caf50' }} />{" "}
                  </span>
                  <h4>
                    <span>Smart</span> food tracking
                  </h4>
                  <p>
                    Log meals easily or snap a photo to track your nutrition instantly. Nutri helps you understand what you eat and how it fuels your body.
                  </p>
                </div>
              </div>

              <div className="col-lg-6 col-md-12">
                <div className="img aos-init aos-animate" data-aos="fade-up" data-aos-duration={1500}>
                  <img
                    className="moving_position_animatin"
                    src={feature_2}
                    alt="image"
                  />
                </div>
              </div>
            </div>

            <div className="row service_blocks">

              <div className="col-lg-1 col-md-12" />
              <div className="col-lg-5 col-md-12">
                <div
                  className="service_text aos-init aos-animate"
                  data-aos="fade-up"
                  data-aos-duration={500}
                >
                  <span className="section_icon">
                    {" "}
                    <img src={feature_icon_3} alt="image" />{" "}
                  </span>
                  <h4>
                    <span>Goal progress</span> & insights
                  </h4>
                  <p>
                    See your progress in clear charts that make staying consistent simple. From calories to macros to mood, watch your improvements grow.
                  </p>
                </div>
              </div>

              <div className="col-lg-6 col-md-12">
                <div className="img aos-init aos-animate" data-aos="fade-up" data-aos-duration={1500}>
                  <img
                    className="moving_position_animatin"
                    src={feature_3}
                    alt="image"
                  />
                </div>
              </div>
            </div>

            <div className="row app_blocks justify-content-md-center">
              <h6>Download app to get started</h6>
              <ul className="app_btn">
                <li>
                  <Link to="/beta">
                    <img
                      className="blue_img"
                      src={appstore_blue}
                      alt="image"
                      to="/"
                    />
                    <img
                      className="white_img"
                      src={appstore_white}
                      alt="image"
                      to="/"
                    />
                  </Link>
                </li>
                <li>
                  <Link to="#">
                    <img
                      className="blue_img"
                      src={googleplay_blue}
                      alt="image"
                      to="/"
                    />
                    <img
                      className="white_img"
                      src={googleplay_white}
                      alt="image"
                      to="/"
                    />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </section>

    </div>
  )
}

export default Servicesectionone
