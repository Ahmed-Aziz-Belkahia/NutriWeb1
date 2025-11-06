import React from 'react'
import { Link } from 'react-router-dom'
import whitesmall from "../../assets/images/element-white-small.png"
import customericon from "../../assets/images/customer-icon.png"

const Cta = () => {
  return (
    <div>
        <section className="cta_section new white_text" id="support_sec">
  
  <div className="container">
    <div className="cta_box">
      <div className="element">
        <span className="element1">
          
          <img src={whitesmall} alt="cta-img" />
        </span>
        <span className="element2">
          
          <img src={whitesmall} alt="cta-img" />
        </span>
      </div>
      <div className="left">
        <div
          className="section_title aos-init aos-animate"
          data-aos="fade-in"
          data-aos-duration={1500}
          data-aos-delay={100}
        >
          <img
            src={customericon}
            className="customer_icon"
            alt="cta-img"
          />
          
          <h3>Need support?</h3>
        
          <p>Lorem Ipsum is simply dummy text of the printing.</p>
        </div>
      </div>
      <div className="right">
        <div className="btn_block ">
          <Link
            to="tel:123-456-7890"
            className="btn puprple_btn aos-init aos-animate call_btn"
          >
            <i className="icofont-ui-call" /> Call us now
          </Link>
          <Link
            to="mailto:someone@example.com"
            className="btn aos-init aos-animate email_btn"
          >
            <i className="icofont-envelope-open" /> Email us Now
          </Link>
        </div>
      </div>
    </div>
  </div>

</section>

    </div>
  )
}

export default Cta