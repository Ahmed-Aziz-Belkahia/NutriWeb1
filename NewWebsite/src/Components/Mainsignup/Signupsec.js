import React from 'react'
import { Link } from "react-router-dom"
import google from "../../assets/images/google_G.svg"
import logo from "../../assets/images/logo.png"
import rotate2 from "../../assets/images/pattern1.png"
import signupimg from "../../assets/images/sign-up-img.png"

const Signupsec = () => {
  return (
    <div>
      <div className="full_bg">
        <section className="signup_section">
          <div className="container">
            <div className="top_part">
              <Link to="/" className="back_btn">
                <i className="icofont-arrow-left" /> Back to home
              </Link>
              <Link className="navbar-brand" to="/Home">
                <img src={logo} alt="signup-img" />
              </Link>
            </div>

            <div className="form_block">

              <div className="pattern-rotate-2">
                <img src={rotate2} alt="signup-img" />
              </div>

              <div className="side_screen">
                <div className="section_title">
                  <h2>Sign up &amp; manage customers!</h2>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting
                    industry lorem Ipsum has been the industrys.
                  </p>
                </div>
                <div className="scrren">
                  <img src={signupimg} alt="signup-img" />
                </div>
              </div>

              <div className="form_side">
                <div className="section_title">
                  <span className="title_badge">Get Started</span>
                  <h4>Create an account</h4>
                  <p>Register with us to get started.</p>
                </div>
                <form>
                  <div className="form-group">
                    <input type="name" className="form-control" placeholder="Name" />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                    />
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
                        <span className="checkmark" />I agree to all Term, <Link to="/privacy">Privacy</Link> and
                        Fees
                      </label>
                    </div>
                  </div>
                  <div className="btn_block">
                    <button className="btn puprple_btn ml-0">Creae an Account</button>
                    <div className="btn_bottom" />
                  </div>
                  <button className="btn google_btn">
                    <img src={google} alt="signup-img" /> Sign Up with Google
                  </button>
                  <div className="sign_in_here">
                    <p>
                      Already have an account? <Link to="/Signin">Sign In here</Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>

    </div>
  )
}

export default Signupsec
