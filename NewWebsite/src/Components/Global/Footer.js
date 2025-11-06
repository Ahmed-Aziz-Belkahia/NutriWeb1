import React from 'react'
import { Link } from 'react-router-dom'
import footerlogo from "../../assets/images/footer_logo.png"
import appstore from "../../assets/images/appstore_blue.png"
import googleplay from "../../assets/images/googleplay_blue.png"

const Footer = () => {
  return (
    <div>
        <footer>
  <div className="top_footer" id="contact">
    {/* container start */}
    <div className="container">
      {/* row start */}
      <div className="row">
        {/* footer link 1 */}
        <div className="col-lg-5 col-md-6 col-12">
          <div className="abt_side">
            <div className="logo">
              
              <img src={footerlogo} alt="footer-img" />
            </div>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry lorem sum has been the industrys standard dummytext ever
              since the when an unknown printer took.
            </p>
            <ul className="app_btn">
              <li>
                <Link to="https://support.apple.com/">
                  <img src={appstore} alt="footer-img" />
                </Link>
              </li>
              <li>
                <Link to="https://play.google.com/">
                  <img src={googleplay} alt="footer-img" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {/* footer link 2 */}
        <div className="col-lg-2 col-md-6 col-12">
          <div className="links">
            <h6>Quick Links</h6>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/About">About us</Link>
              </li>
              <li>
                <Link to="/Feature">Features</Link>
              </li>
              <li>
                <Link to="/Bloglist">Blog</Link>
              </li>
              <li>
                <Link to="/Contact">Contact us</Link>
              </li>
            </ul>
          </div>
        </div>
        {/* footer link 3 */}
        <div className="col-lg-2 col-md-6 col-12">
          <div className="links">
            <h6>Suport</h6>
            <ul>
              <li>
                <Link to="#">FAQs</Link>
              </li>
              <li>
                <Link to="#">Support</Link>
              </li>
              <li>
                <Link to="#">How it works</Link>
              </li>
              <li>
                <Link to="#">Terms &amp; conditions</Link>
              </li>
              <li>
                <Link to="#">Privacy policy</Link>
              </li>
            </ul>
          </div>
        </div>
        {/* footer link 4 */}
        <div className="col-lg-3 col-md-6 col-12">
          <h6>Subscribe us</h6>
          <div className="news_letter">
            <p>
              Subscribe our newsleter to receive latest updates regularly from
              us!
            </p>
            <form>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                />
                <button className="btn" aria-label="subscribe">
                  <i className="icofont-paper-plane" />
                </button>
              </div>
              <p className="note">
                By clicking send link you agree to receive message.
              </p>
            </form>
          </div>
        </div>
      </div>
      {/* row end */}
    </div>
    {/* container end */}
    {/* last footer */}
    <div className="bottom_footer">
      {/* container start */}
      <div className="container">
        {/* row start */}
        <div className="row">
          <div className="col-md-4">
            <p>© Copyrights 2025. All rights reserved.</p>
          </div>
          <div className="col-md-4">
            <ul className="social_media">
              <li>
                <Link
                  to="https://www.facebook.com/"
                  aria-label="facebook page"
                >
                  <i className="icofont-facebook" />
                </Link>
              </li>
              <li>
                <Link
                  to="https://x.com/"
                  aria-label="twitter page"
                >
                  <i className="icofont-twitter" />
                </Link>
              </li>
              <li>
                <Link
                  to="https://www.instagram.com/"
                  aria-label="instagram page"
                >
                  <i className="icofont-instagram" />
                </Link>
              </li>
              <li>
                <Link
                  to="https://www.pinterest.com/"
                  aria-label="pinterest page"
                >
                  <i className="icofont-pinterest" />
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <p className="developer_text">
              Design &amp; developed by
              <Link
                to="https://themeforest.net/user/kalanidhithemes/portfolio"
                target="blank"
              >
                Kalanidhi Themes
              </Link>
            </p>
          </div>
        </div>
        {/* row end */}
      </div>
      {/* container end */}
    </div>
  </div>
</footer>

    </div>
  )
}

export default Footer