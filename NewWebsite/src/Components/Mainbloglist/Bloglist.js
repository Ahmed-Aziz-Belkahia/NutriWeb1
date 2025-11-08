import React from "react";
import { Link } from "react-router-dom";
import { getFeaturedBlog } from "../../data/blogs";


const Bloglist = () => {
  const featuredBlog = getFeaturedBlog();
  
  if (!featuredBlog) {
    return null; // Don't show the editor's choice section if no featured blog
  }
  
  return (
    <div>
      <section className="row_am blog_list_main">
        {/* container start */}
        <div className="container">
          <div className="editor_choice">
            <span className="choice_badge">
              EDITOR
              <br />
              CHOICE
            </span>
            <div
              className="col-lg-6 aos-init aos-animate"
              data-aos="fade-in"
              data-aos-duration={1500}
            >
              
                <div className="blog_img">
                  <img src={featuredBlog.image} alt="bloglist-img" />
                </div>
             
            </div>
            <div className="col-lg-6">
              <div className="blog_text">
                <span className="blog_tag"> {featuredBlog.category} </span>
                <div className="section_title">
                  <h5>
                    {" "}
                    <Link to={`/blog/${featuredBlog.id}`}>
                      {" "}
                      {featuredBlog.title}
                    </Link>{" "}
                  </h5>
                  <p>
                    {featuredBlog.excerpt}
                  </p>
                  <div className="story_info">
                    <div className="time">{featuredBlog.author.name} | {featuredBlog.date} </div>
                    <Link to={`/blog/${featuredBlog.id}`}>
                      Read More <i className="icofont-arrow-right" />{" "}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
};

export default Bloglist;
