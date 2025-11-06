import React from "react";
import { Link } from "react-router-dom";

const Bredcrumb = () => {
  return (
    <div>
      <div className="bred_crumb blog_page">
        {/* animated dots */}
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
          <div className="bred_text blog">
            <span className="title_badge mb-1"> updates </span>
            <h1>Latest blog post</h1>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry dummy text of the printing lorem Ipsum has been the.
            </p>
            <ul>
              <li>
                <Link to="/Home">Home</Link>
              </li>
              <li>
                <span>»</span>
              </li>
              <li>
                <Link to="/Bloglist">Blog list</Link>
              </li>
            </ul>
            <div className="search_bar">
              <form action="search">
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Search here"
                    className="form-control"
                  />
                  <button className="btn" type="submit">
                    <i className="icofont-search-1" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bredcrumb;
