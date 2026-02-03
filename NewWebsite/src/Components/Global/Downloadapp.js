import React from 'react'
import white1 from "../../assets/images/element-white1.png"
import white2 from "../../assets/images/element-white2.png"
import appstore from "../../assets/images/appstore_blue.png"
import googleplay from "../../assets/images/googleplay_blue.png"
import downlscreen from "../../assets/images/both.png"

const Downloadapp = () => {
  return (
    <div>
        <section className="row_am free_app_section white_text" id="getstarted">
  {/* container start */}
  <div className="container">
    <div
      className="free_app_inner aos-init aos-animate"
      data-aos="fade-in"
      data-aos-duration={1500}
      data-aos-delay={100}
    >
      {/* element start */}
      <div className="element">
        <span className="element1">
          
          <img src={white1} alt="download-app-img" />
        </span>
        <span className="element2">
          
          <img src={white2} alt="download-app-img" />
        </span>
      </div>
      {/* element end */}
      {/* row start */}
      <div className="row">
        {/* content */}
        <div className="col-md-6">
          <div className="free_text">
            <div className="section_title">
              <span className="title_badge lighter mb-1">Download app</span>
              <h2>Download Nutri AI and start your journey</h2>
              <p>
                Track meals, plan nutrition, and reach your health goals with AI-powered insights. Available now on iOS and Android.
              </p>
            </div>
            <ul className="app_btn">
              <li>
                <a href="https://apps.apple.com/app/nutri-ai" target="_blank" rel="noopener noreferrer">
                  <img src={appstore} alt="Download on App Store" />
                </a>
              </li>
              <li>
                <a href="https://play.google.com/store/apps/details?id=com.nutriai" target="_blank" rel="noopener noreferrer">
                  <img src={googleplay} alt="Get it on Google Play" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* images */}
        <div className="col-md-6">
          <div className="free_img">
            <img
              className="mobile_mockup"
              src={downlscreen}
              alt="download-app-img"
            />
          </div>
        </div>
      </div>
      {/* row end */}
    </div>
  </div>
  {/* container end */}
</section>

    </div>
  )
}

export default Downloadapp
