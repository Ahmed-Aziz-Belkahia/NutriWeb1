import React from 'react'
import { Link } from "react-router-dom"
import pay_one_img from "../../assets/images/image3.png"
import pay_two_img from "../../assets/images/image4.png"

const Customerpayone = () => {
  return (
    <div>

      <section className="row_am two_colom_section">

        <div className="container">

          <div className="row service_blocks customer_payment">

            <div className="col-lg-6 col-md-12">
              <div className="img aos-init aos-animate" data-aos="fade-up" data-aos-duration={1500}>
                <img src={pay_one_img} alt="image" />
              </div>
            </div>

            <div className="col-lg-6 col-md-12">
              <div
                className="service_text aos-init aos-animate"
                data-aos="fade-up"
                data-aos-duration={1500}
              >

                <div className="title_badge">
                  {" "}
                  <i className="icofont-tasks-alt"> </i>
                  <span>AI-Powered Nutrition</span>
                </div>

                <h3>Scan meals, track nutrition instantly</h3>
                <p>
                  Nutri uses advanced AI to analyze your meals from a simple photo. Get detailed nutritional breakdowns, calorie counts, and macro tracking without manual logging.
                </p>

                <ul className="listing_block">
                  <li>
                    <div className="icon">
                      <span>
                        <i className="icofont-ui-check" />
                      </span>
                    </div>
                    <div className="text">
                      <h6>Instant meal recognition</h6>
                      <p>
                        Snap a photo and let AI identify ingredients, portions, and nutritional values in seconds.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="icon">
                      <span>
                        <i className="icofont-ui-check" />
                      </span>
                    </div>
                    <div className="text">
                      <h6>Accurate tracking</h6>
                      <p>
                        Track calories, macros, vitamins, and more with precise AI-powered analysis.
                      </p>
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
                    Get Started
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="row service_blocks sb_2">

            <div className="col-lg-6 col-md-12">
              <div
                className="service_text left_side aos-init aos-animate"
                data-aos="fade-up"
                data-aos-duration={1500}
              >

                <div className="title_badge ">
                  <i className="icofont-ui-clock" />
                  <span>Smart Insights</span>
                </div>

                <h3>Track your progress with visual insights</h3>
                <p>
                  Nutri provides clear, actionable insights about your eating habits, progress toward goals, and nutritional balance with easy-to-understand charts and reports.
                </p>

                <ul className="feature_list">
                  <li>
                    <div className="icon">
                      <span>
                        <i className="icofont-check-circled" />
                      </span>
                    </div>
                    <div className="text">
                      <p>Daily, weekly, and monthly nutrition trends</p>
                    </div>
                  </li>
                  <li>
                    <div className="icon">
                      <span>
                        <i className="icofont-check-circled" />
                      </span>
                    </div>
                    <div className="text">
                      <p>Goal tracking with progress visualization</p>
                    </div>
                  </li>
                  <li>
                    <div className="icon">
                      <span>
                        <i className="icofont-check-circled" />
                      </span>
                    </div>
                    <div className="text">
                      <p>Personalized recommendations based on your data</p>
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
                    Get Started
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-md-12">
              <div className="img aos-init aos-animate" data-aos="fade-up" data-aos-duration={1500}>
                <img src={pay_two_img} alt="image" />
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Customerpayone
