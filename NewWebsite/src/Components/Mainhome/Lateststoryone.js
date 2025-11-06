import React from 'react'
import { Link } from "react-router-dom"
import { blogs } from "../../data/blogs";

const Lateststoryone = () => {
  // Get the latest 2 blogs
  const latestBlogs = blogs.slice(0, 2);
  
  return (
    <div>


      <section className="row_am latest_story" id="blog">
        {/* container start */}
        <div className="container">
          <div
            className="section_title aos-init aos-animate"
            data-aos="fade-in"
            data-aos-duration={1500}
            data-aos-delay={100}
          >
            <span className="title_badge mb-1">Blog Post</span>
            <h2> Read Latest Health & Wellness Tips </h2>
            <p>
              Stay informed with practical nutrition advice, healthy lifestyle tips, and insights 
              from the NutriAI team to help you reach your wellness goals.
            </p>
          </div>
          {/* row start */}
          <div className="row">
            {/* story */}
            {latestBlogs.map((blog, index) => (
              <div className="col-md-6" key={index}>
                <div className="story_box aos-init aos-animate" data-aos="fade-up" data-aos-duration={1500}>
                  <div className="story_img">
                    <img src={blog.image} alt="image" />
                  </div>
                  <div className="story_text">
                    <span className="blog_tag"> {blog.category}</span>
                    <h5>
                      {" "}
                      <Link to={`/blog/${blog.id}`}>
                        {" "}
                        {blog.title}
                      </Link>{" "}
                    </h5>
                    <div className="story_info">
                      <div className="time">{blog.author.name} | {blog.date} </div>
                      <Link to={`/blog/${blog.id}`}>
                        Read More <i className="icofont-arrow-right" />{" "}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          </div>

        </div>

      </section>

    </div>
  )
}

export default Lateststoryone
