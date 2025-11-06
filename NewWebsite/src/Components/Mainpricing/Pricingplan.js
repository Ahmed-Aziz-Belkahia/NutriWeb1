import React from 'react'
import { Link } from "react-router-dom"

const Pricingplan = () => {
  return (
    <div>

      <section className="row_am pricing_page_block">
        <div className="container">
          <div className="section_title aos-init aos-animate " data-aos="fade-up" data-aos-duration={1500}>
            <span className="title_badge">Compare Plans</span>
            <h2>Detailed Feature Comparison</h2>
            <p>Find the perfect plan for your nutrition journey</p>
          </div>
          <div className="table_content">
            <div
              className="pricing_table aos-init aos-animate"
              data-aos="fade-up"
              data-aos-duration={1500}
            >

              <div className="pricing_block pricing_feature">
                <div className="pricing_title">
                  <h6>Features</h6>
                </div>
                <ul className="features">
                  <li>
                    <p>Meal Scans</p>
                  </li>
                  <li>
                    <p>Meal Plans</p>
                  </li>
                  <li>
                    <p>Recipe Generation</p>
                  </li>
                  <li>
                    <p>Shopping Lists</p>
                  </li>
                  <li>
                    <p>Body Analysis</p>
                  </li>
                  <li>
                    <p>Priority Support</p>
                  </li>
                </ul>
              </div>

              <div className="pricing_block">
                <div className="pricing_title">
                  <div className="t_block">
                    <h6>Free</h6>
                    <span>Start your journey</span>
                  </div>
                  <div className="pricing">
                    <h3>
                      $0 <span>/month</span>
                    </h3>
                  </div>
                </div>
                <ul>
                  <li>
                    <span className="mobile_text">Meal Scans</span>
                    <p>10 per day</p>
                  </li>
                  <li>
                    <span className="mobile_text">Meal Plans</span>
                    <p>
                      <i className="icofont-close-circled" />
                    </p>
                  </li>
                  <li>
                    <span className="mobile_text">Recipe Generation</span>
                    <p>
                      <i className="icofont-close-circled" />
                    </p>
                  </li>
                  <li>
                    <span className="mobile_text">Shopping Lists</span>
                    <p>
                      <i className="icofont-close-circled" />
                    </p>
                  </li>
                  <li>
                    <span className="mobile_text">Body Analysis</span>
                    <p>
                      <i className="icofont-close-circled" />
                    </p>
                  </li>
                  <li>
                    <span className="mobile_text">Priority Support</span>
                    <p>
                      <i className="icofont-close-circled" />
                    </p>
                  </li>
                </ul>
                <div className="btn_block">
                  <Link to="/beta" className="btn puprple_btn ml-0">
                    Get Started
                  </Link>
                  <div className="btn_bottom" />
                </div>
              </div>

              <div className="pricing_block recomend">
                <div className="pricing_title recomend">
                  <div className="t_block">
                    <h6>Premium</h6>
                    <span>Most popular</span>
                  </div>
                  <div className="pricing">
                    <h3>
                      $14.99 <span>/month</span>
                    </h3>
                  </div>
                </div>
                <ul>
                  <li>
                    <span className="mobile_text">Meal Scans</span>
                    <p>Unlimited</p>
                  </li>
                  <li>
                    <span className="mobile_text">Meal Plans</span>
                    <p>
                      <i className="icofont-check-circled" />
                    </p>
                  </li>
                  <li>
                    <span className="mobile_text">Recipe Generation</span>
                    <p>
                      <i className="icofont-check-circled" />
                    </p>
                  </li>
                  <li>
                    <span className="mobile_text">Shopping Lists</span>
                    <p>
                      <i className="icofont-check-circled" />
                    </p>
                  </li>
                  <li>
                    <span className="mobile_text">Body Analysis</span>
                    <p>
                      <i className="icofont-check-circled" />
                    </p>
                  </li>
                  <li>
                    <span className="mobile_text">Priority Support</span>
                    <p>
                      <i className="icofont-check-circled" />
                    </p>
                  </li>
                </ul>
                <div className="btn_block">
                  <Link to="/beta" className="btn puprple_btn ml-0">
                    Get Started
                  </Link>
                  <div className="btn_bottom" />
                </div>
              </div>

              <div className="pricing_block no_border">
                <div className="pricing_title">
                  <div className="t_block">
                    <h6>Pro</h6>
                    <span>Essential features</span>
                  </div>
                  <div className="pricing">
                    <h3>
                      $9.99 <span>/month</span>
                    </h3>
                  </div>
                </div>
                <ul>
                  <li>
                    <span className="mobile_text">Meal Scans</span>
                    <p>50 per day</p>
                  </li>
                  <li>
                    <span className="mobile_text">Meal Plans</span>
                    <p>
                      <i className="icofont-check-circled" />
                    </p>
                  </li>
                  <li>
                    <span className="mobile_text">Recipe Generation</span>
                    <p>
                      <i className="icofont-check-circled" />
                    </p>
                  </li>
                  <li>
                    <span className="mobile_text">Shopping Lists</span>
                    <p>
                      <i className="icofont-check-circled" />
                    </p>
                  </li>
                  <li>
                    <span className="mobile_text">Body Analysis</span>
                    <p>
                      <i className="icofont-close-circled" />
                    </p>
                  </li>
                  <li>
                    <span className="mobile_text">Priority Support</span>
                    <p>
                      <i className="icofont-close-circled" />
                    </p>
                  </li>
                </ul>
                <div className="btn_block">
                  <Link to="/beta" className="btn puprple_btn ml-0">
                    Get Started
                  </Link>
                  <div className="btn_bottom" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Pricingplan
