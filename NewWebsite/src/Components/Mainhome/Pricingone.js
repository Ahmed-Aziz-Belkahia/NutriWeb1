import React, { useState } from 'react';
import pricing_img_1 from "../../assets/images/pkg1.png";
import pricing_img_2 from "../../assets/images/pkg2.png";
import pricing_img_3 from "../../assets/images/pkg3.png";
import { Link } from "react-router-dom";

const Pricingone = () => {
  const [activeTab, setActiveTab] = useState("monthly");

  const toggleTab = () => {
    setActiveTab(activeTab === "monthly" ? "yearly" : "monthly");
  };

  return (
    <div>
      <section className="row_am pricing_section" id="pricing">
        <div className="container">
          <div className="section_title aos-init aos-animate" data-aos="fade-up" data-aos-duration={1500} data-aos-delay={300}>
            <span className="title_badge mb-1">Pricing</span>
            <h2>Choose Your Plan</h2>
            <p>Start free or upgrade for advanced features</p>
          </div>


          <div className="toggle_block aos-init aos-animate" data-aos="fade-up" data-aos-duration={1500}>
            <span className="month">Monthly</span>
            <div className="tog_block" onClick={toggleTab}>
              <span
                className="tog_btn h-20"
                style={{ transform: activeTab === "yearly" ? "translateX(135%)" : "translateX(0%)" }}
              />
            </div>
            <span className="years">Yearly</span>
            <span className="offer">50% off</span>
          </div>


          <div className={`pricing_pannel aos-init aos-animate ${activeTab === "monthly" ? "active" : "hidden"}`} data-aos="fade-up" data-aos-duration={1500}>
            <div className="row">
              {[{ name: "Free", price: "$0" }, { name: "Pro", price: "$9.99" }, { name: "Premium", price: "$14.99" }].map((plan, index) => (
                <div key={index} className="col-md-4">
                  <div className={`pricing_block ${plan.name === "Pro" ? "highlited_block" : ""}`}>
                    {plan.name === "Pro" && <span className="offer">Popular</span>}
                    <div className="pkg_icon">
                      <img src={[pricing_img_1, pricing_img_2, pricing_img_3][index]} alt="image" />
                    </div>
                    <div className="pkg_name"><h6>{plan.name}</h6></div>
                    <span className="price">{plan.price} <span> / month </span></span>
                    <div className="benifits_block">
                      <ul className="benifits">
                        <li style={{ paddingBottom: 14  }}><span className="icon"><i className="icofont-check-circled" /></span> AI meal scanning</li>
                        <li><span className="icon"><i className="icofont-check-circled" /></span> Daily nutrition tracking</li>
                        <li><span className="icon"><i className={index >= 1 ? "icofont-check-circled" : "icofont-close-circled"} /></span> Personalized meal plans</li>
                        <li><span className="icon"><i className={index >= 1 ? "icofont-check-circled" : "icofont-close-circled"} /></span> Recipe generation</li>
                        <li><span className="icon"><i className={index >= 1 ? "icofont-check-circled" : "icofont-close-circled"} /></span> Shopping lists</li>
                        <li><span className="icon"><i className={index === 2 ? "icofont-check-circled" : "icofont-close-circled"} /></span> Body composition analysis</li>
                        <li><span className="icon"><i className={index === 2 ? "icofont-check-circled" : "icofont-close-circled"} /></span> Advanced insights</li>
                      </ul>
                      <a href="https://apps.apple.com/app/nutri-ai" target="_blank" rel="noopener noreferrer" className="btn puprple_btn">Get Started</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`pricing_pannel aos-init aos-animate ${activeTab === "yearly" ? "active" : "hidden"}`} data-aos="fade-up" data-aos-duration={1500}>
            <div className="row">
              {[{ name: "Free", price: "$0" }, { name: "Pro", price: "$59.99" }, { name: "Premium", price: "$89.99" }].map((plan, index) => (
                <div key={index} className="col-md-4">
                  <div className={`pricing_block ${plan.name === "Pro" ? "highlited_block" : ""}`}>
                    {plan.name === "Pro" && <span className="offer">Popular</span>}
                    <div className="pkg_icon">
                      <img src={[pricing_img_1, pricing_img_2, pricing_img_3][index]} alt="image" />
                    </div>
                    <div className="pkg_name"><h6>{plan.name}</h6></div>
                    <span className="price">{plan.price} <span> / year </span></span>
                    <div className="benifits_block">
                      <ul className="benifits">
                        <li><span className="icon"><i className="icofont-check-circled" /></span> AI meal scanning</li>
                        <li><span className="icon"><i className="icofont-check-circled" /></span> Daily nutrition tracking</li>
                        <li><span className="icon"><i className={index >= 1 ? "icofont-check-circled" : "icofont-close-circled"} /></span> Personalized meal plans</li>
                        <li><span className="icon"><i className={index >= 1 ? "icofont-check-circled" : "icofont-close-circled"} /></span> Recipe generation</li>
                        <li><span className="icon"><i className={index >= 1 ? "icofont-check-circled" : "icofont-close-circled"} /></span> Shopping lists</li>
                        <li><span className="icon"><i className={index === 2 ? "icofont-check-circled" : "icofont-close-circled"} /></span> Body composition analysis</li>
                        <li><span className="icon"><i className={index === 2 ? "icofont-check-circled" : "icofont-close-circled"} /></span> Advanced insights</li>
                      </ul>
                      <a href="https://apps.apple.com/app/nutri-ai" target="_blank" rel="noopener noreferrer" className="btn puprple_btn">Get Started</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="contact_text aos-init aos-animate" data-aos="fade-up" data-aos-duration={1500}>
            Not sure what to choose? <Link to="/contact">Contact us</Link> for custom packages
          </p>
        </div>
      </section>
    </div>
  );
};

export default Pricingone;
