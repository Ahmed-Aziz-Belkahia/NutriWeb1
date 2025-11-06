import React from 'react'
import appstore_blue from "../../assets/images/appstore_blue.png"
import appstore_white from "../../assets/images/appstore_white.png"
import googleplay_blue from "../../assets/images/googleplay_blue.png"
import googleplay_white from "../../assets/images/googleplay_white.png"
import hero_img from "../../assets/images/image2.png"
import hero_user_img from "../../assets/images/hero-user-img.png"
import { Link } from "react-router-dom"
import Typewriter from 'typewriter-effect';

const Bannerrone = () => {
  return (
    <div>

      <section className="banner_section">

        <div className="dotes_anim_bloack">
          <div className="dots dotes_1" />
          <div className="dots dotes_2" />
          <div className="dots dotes_3" />
          <div className="dots dotes_4" />
          <div className="dots dotes_5" />
          <div className="dots dotes_6" />
          <div className="dots dotes_7" />
          <div className="dots dotes_8" />
          <div className="dots dotes_9" />
          <div className="dots dotes_10" />
        </div>

        <div className="container">

          <div className="row">
            <div
              className="col-lg-6 col-md-12 aos-init aos-animate"
              data-aos="fade-right"
              data-aos-duration={1500}
            >

              <div className="banner_text">

                <div className="type-wrap">

                  <Typewriter
                    onInit={(typewriter) => {
                      typewriter
                        .typeString('<span style="color: #4A90E2;"> Stay on top of your nutrition, without overthinking it. </span>')
                        .pauseFor(2000)
                        .deleteAll()
                        .start()
                    }}
                    options={{
                      loop: true,
                    }}
                  />
                </div>

                <h1>
                  Track your <span> meals and habits </span> in one simple place.
                </h1>

                <p>
                  Nutri helps you plan your week, understand what fuels your body, and stay consistent with healthy routines.
                  Small steps, smarter choices, better results.
                </p>
              </div>

              <ul className="app_btn">
                <li>
                  <Link to="/beta-ios">
                    <img
                      className="blue_img"
                      src={appstore_blue}
                      alt="image"
                    />
                    <img
                      className="white_img"
                      src={appstore_white}
                      alt="image"
                    />
                  </Link>
                </li>
                <li>
                  <Link to="/beta-android">
                    <img
                      className="blue_img"
                      src={googleplay_blue}
                      alt="image"
                    />
                    <img
                      className="white_img"
                      src={googleplay_white}
                      alt="image"
                    />
                  </Link>
                </li>
              </ul>
            </div>

            <div
              className="col-lg-6 col-md-12 aos-init aos-animate"
              data-aos="fade-in"
              data-aos-duration={1500}
            >
              <div className="banner_shape_images">
                <div className="hero_image_1">
                  <img
                    src={hero_img}
                    className="moving_position_animatin"
                    alt="image"
                  />
                </div>
                {/* <div className="hero_image_2">
                  <Link to="https://themeforest.net/user/kalanidhithemes/portfolio">
                    <img
                      src={hero_user_img}
                      className="moving_position_animatin"
                      alt="image"
                    />
                  </Link>
                </div> */}
              </div>
            </div>

          </div>

        </div>

      </section>
    </div>
  )
}

export default Bannerrone
