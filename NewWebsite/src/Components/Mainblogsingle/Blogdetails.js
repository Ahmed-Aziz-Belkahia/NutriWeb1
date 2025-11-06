import React from 'react' 
import {Link, useParams} from "react-router-dom"
import { getBlogById } from "../../data/blogs";


const Blogdetails = () => {
  const { id } = useParams();
  const blog = getBlogById(id);
  
  if (!blog) {
    return (
      <div className="container" style={{ padding: "100px 0", textAlign: "center" }}>
        <h2>Blog post not found</h2>
        <Link to="/bloglist" className="btn puprple_btn">Back to Blog List</Link>
      </div>
    );
  }
  
  return (
    <div>
      
      <section className="blog_detail_section">
  <div className="container container-sm">
    <div className="blog_head">
      <div className="back_text">
        {" "}
        <Link to="/bloglist">
          {" "}
          <i className="icofont-arrow-left" /> Blog List{" "}
        </Link>
      </div>
      <div className="tags_info">
        <span className="tag">{blog.category}</span>
        <ul className="blog_info">
          <li>{blog.date} </li>
          <li>{blog.comments} Comments </li>
          <li>{blog.views} Views</li>
        </ul>
      </div>
      <h1>{blog.title}</h1>
      <div className="avtar">
        {/* <img src={blog.author.image} alt="image" /> */}
        <div className="text">
          <h6>{blog.author.name}</h6>
          <span>{blog.author.title}</span>
        </div>
      </div>
    </div>
    <div className="blog_body">
      <div className="img aos-init aos-animate" data-aos="fade-in" data-aos-duration={1500}>
        <img src={blog.image} alt="image" />
      </div>
      <p>
        {blog.content.intro}
      </p>
      
      {blog.content.sections.map((section, index) => (
        <div key={index}>
          <h4>{section.heading}</h4>
          <p>{section.text}</p>
          {section.points.length > 0 && (
            <ul className="listings">
              {section.points.map((point, idx) => (
                <li key={idx}>
                  <span className="icon">
                    <i className="icofont-check-circled" />
                  </span>
                  <p><strong>{point.title}</strong> {point.text}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
      
      <div className="highlight_text">
        <h6>
          {blog.content.highlight}
        </h6>
      </div>
      
      <p>
        {blog.content.conclusion}
      </p>
      <ul className="social_media">
        <li>
          <Link to="https://www.facebook.com/login">
            <i className="icofont-facebook" />
          </Link>
        </li>
        <li>
          <Link to="https://x.com/i/flow/login">
            <i className="icofont-twitter" />
          </Link>
        </li>
        <li>
          <Link to="https://www.instagram.com/accounts/login">
            <i className="icofont-instagram" />
          </Link>
        </li>
        <li>
          <Link to="https://in.pinterest.com/">
            <i className="icofont-pinterest" />
          </Link>
        </li>
      </ul>
    </div>
  </div>
</section>

    </div>
  )
}

export default Blogdetails
