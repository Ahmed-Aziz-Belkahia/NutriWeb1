import React from "react";
import { Link } from "react-router-dom";


const stories = [];

const Liststory = () => {
  return (
    <div>
      <section className="row_am latest_story blog_list_story " id="blog">
        {/* container start */}
        <div className="container">
          {/* row start */}
          <div className="row">
            {/* story */}
            {stories.length > 0 ? (
              stories.map((stories, index) => (
                <div className="col-md-6" key={index}>
                  
                    <div
                      className="story_box aos-init aos-animate"
                      data-aos="fade-up"
                      data-aos-duration={1500}
                    >
                      <div className="story_img">
                        <img src={stories.image} alt="story-img" />
                      </div>
                      <div className="story_text">
                        <span className="blog_tag"> {stories.tag} </span>
                        <h5>
                          <Link to="/Blogsingle">{stories.title}</Link>
                        </h5>
                        <div className="story_info">
                          <div className="time">{stories.date} </div>
                          <Link to={stories.link}>
                            Read More <i className="icofont-arrow-right" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  
                </div>
              ))
            ) : (
              <div className="col-12 text-center" style={{ padding: '60px 20px' }}>
                <h3 style={{ color: 'var(--secondary)', marginBottom: '20px' }}>No blog posts available yet</h3>
                <p style={{ color: 'var(--body-text)', fontSize: '18px' }}>Check back soon for exciting content!</p>
              </div>
            )}
          </div>
          
          {stories.length > 0 && (
            <div className="pagination_block">
              <ul>
                <li>
                  <Link to="#" className="prev">
                    <i className="icofont-arrow-left" /> Prev
                  </Link>
                </li>
                <li>
                  <Link to="#">1</Link>
                </li>
                <li>
                  <Link to="#" className="active">
                    2
                  </Link>
                </li>
                <li>
                  <Link to="#">3</Link>
                </li>
                <li>
                  <Link to="#">4</Link>
                </li>
                <li>
                  <Link to="#">5</Link>
                </li>
                <li>
                  <Link to="#">6</Link>
                </li>
                <li>
                  <Link to="#" className="next">
                    Next <i className="icofont-arrow-right" />
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
        {/* container end */}
      </section>
    </div>
  );
};

export default Liststory;
