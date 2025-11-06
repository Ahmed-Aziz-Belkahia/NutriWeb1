import React from 'react'
import { Link } from "react-router-dom"
import logo from "../../assets/images/logo.png"
import signin_image from "../../assets/images/sign-up-img.png"
import google from "../../assets/images/google_G.svg"

const Signupsection = () => {
  return (
    <div>

      <section className="signup_section">
        <div className="container">
          <div className="top_part">
            <Link to="/" className="back_btn">
              <i className="icofont-arrow-left" /> Back to home
            </Link>
            <Link className="navbar-brand" to="/">
              <img src={logo} alt="image" />
            </Link>
          </div>

          <div className="form_block">

            <div className="side_screen">
              <div className="section_title ">
                <h2>login to access your account.</h2>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and typesetting
                  industry lorem Ipsum has been the industrys.
                </p>
              </div>
              <div className="scrren">
                <img src={signin_image} alt="image" />
              </div>
            </div>

            <div className="form_side">
              <div className="section_title">
                <span className="title_badge">Welcome Back</span>
                <h4>
                  <span>Sign in</span> to your account
                </h4>
                <p>Quickly access your features.</p>
              </div>
              <form>
                <div className="form-group">
                  <input type="email" className="form-control" placeholder="Email" />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                  />
                </div>
                <div className="forgate_check">
                  <div className="coustome_checkbox">
                    <label htmlFor="remamber_check">
                      <input type="checkbox" id="remamber_check" />
                      <span className="checkmark" />
                      Remember for 30 days
                    </label>
                  </div>
                  <Link to="Signup">Forgot password ?</Link>
                </div>
                <div className="btn_block">
                  <button className="btn puprple_btn ml-0">Sign Up Now</button>
                  <div className="btn_bottom" />
                </div>
                <button className="btn google_btn">
                  <img src={google} alt="image" /> Sign Up with Google
                </button>
                <div className="sign_in_here">
                  <p>
                    Don’t have an account? <Link to="/Signup">Sign Up here</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Signupsection
