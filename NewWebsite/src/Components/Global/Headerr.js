import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header_logo from "../../assets/images/logo.png";

const Main = () => {

  const [headerScroll, setheaderScroll] = useState(false)
  const [mobile, setmobile] = useState()


  useEffect(() => {

    const fixedHeader = () => {
      if (window.pageYOffset > 150) {
        setheaderScroll(true)
      } else {
        setheaderScroll(false)
      }
    }
    window.addEventListener('scroll', fixedHeader)
  }, [])
  const [openDropdown, setOpenDropdown] = useState(null);
  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };
  const [Dropdown, setDropdown] = useState(null);
  const dropdown = (index) => {
    setDropdown(Dropdown === index ? null : index);
  };

  return (
    <>
      <header className={headerScroll ? "fixed fix_style" : ""} >
        <div className="container">
          <nav className="navbar navbar-expand-lg">
            <Link className="navbar-brand" to="/">
              <img src={Header_logo} alt="Logo" />
            </Link>
            <button className={`navbar-toggler ${mobile && "collapsed"}`} onClick={() => setmobile(mobile === true ? false : true)} type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <div className={`toggle-wrap ${mobile && "active"}`} onClick={() => setmobile(mobile === true ? false : true)}>
                <span className="toggle-bar"></span>
              </div>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/feature">
                    Features
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">
                    About us
                  </Link>
                </li>
                <li className="nav-item has_dropdown">
                  <Link className="nav-link" to="#" onClick={() => toggleDropdown(1)}>
                    Pages
                  </Link>
                  <span className="drp_btn ">
                    <i className="icofont-rounded-down" onClick={() => toggleDropdown(1)} />
                  </span>
                  {openDropdown === 1 && (
                    <div className="sub_menu show">
                      <ul>
                        <li>
                          <Link to="/about">About us</Link>
                        </li>
                        <li>
                          <Link to="/contact">Contact us</Link>
                        </li>
                        <li>
                          <Link to="/faq">Faq</Link>
                        </li>
                        <li>
                          <Link to="/signin">Sign In</Link>
                        </li>
                        <li>
                          <Link to="/signup">Sign Up</Link>
                        </li>
                        <li>
                          <Link to="/bloglist">Blog List</Link>
                        </li>
                        <li>
                          <Link to="/blogsingle">Blog Single</Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/pricing">
                    Pricing
                  </Link>
                </li>

                <li className="nav-item has_dropdown">
                  <Link className="nav-link" to="#" onClick={() => toggleDropdown(1)}>
                    Blog
                  </Link>
                  <span className="drp_btn ">
                    <i className="icofont-rounded-down" onClick={() => toggleDropdown(1)} />
                  </span>
                  {openDropdown === 1 && (
                    <div className="sub_menu show">
                      <ul>
                        <li>
                          <Link to="/bloglist">Blog List</Link>
                        </li>
                        <li>
                          <Link to="/blogsingle">Blog Single</Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/contact">
                    Contact
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="btn puprple_btn " to="/beta">
                    Get Started
                  </Link>
                </li>
              </ul>
            </div>

            {mobile &&
              <>
                <div className={`navbar-collapse collapse ${mobile && "show"}`} id="navbarSupportedContent" style={{}} >
                <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/feature">
                    Features
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">
                    About us
                  </Link>
                </li>
                <li className="nav-item has_dropdown">
                  <Link className="nav-link" to="#" onClick={() => dropdown(1)}>
                    Pages
                  </Link>
                  <span className="drp_btn ">
                    <i className="icofont-rounded-down" onClick={() => dropdown(1)} />
                  </span>
                  {Dropdown === 1 && (
                    <div className="sub_menu show">
                      <ul>
                        <li>
                          <Link to="/about">About us</Link>
                        </li>
                        <li>
                          <Link to="/contact">Contact us</Link>
                        </li>
                        <li>
                          <Link to="/faq">Faq</Link>
                        </li>
                        <li>
                          <Link to="/signin">Sign In</Link>
                        </li>
                        <li>
                          <Link to="/signup">Sign Up</Link>
                        </li>
                        <li>
                          <Link to="/bloglist">Blog List</Link>
                        </li>
                        <li>
                          <Link to="/blogsingle">Blog Single</Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/pricing">
                    Pricing
                  </Link>
                </li>

                <li className="nav-item has_dropdown">
                  <Link className="nav-link" to="#" onClick={() => toggleDropdown(1)}>
                    Blog
                  </Link>
                  <span className="drp_btn ">
                    <i className="icofont-rounded-down" onClick={() => toggleDropdown(1)} />
                  </span>
                  {openDropdown === 1 && (
                    <div className="sub_menu show">
                      <ul>
                        <li>
                          <Link to="/bloglist">Blog List</Link>
                        </li>
                        <li>
                          <Link to="/blogsingle">Blog Single</Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/contact">
                    Contact
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="btn puprple_btn " to="/beta">
                    Get Started
                  </Link>
                </li>
              </ul>
                </div>
              </>
            }
          </nav>
        </div >
      </header>
    </>
  )
}

export default Main