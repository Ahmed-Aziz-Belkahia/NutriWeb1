import React from "react";
import { Link } from "react-router-dom";
import story1 from "../../assets/images/story01.png";
import story2 from "../../assets/images/story02.png";
import story3 from "../../assets/images/story03.png";
import story4 from "../../assets/images/story04.png";
import story5 from "../../assets/images/story05.png";
import story6 from "../../assets/images/story06.png";
import story7 from "../../assets/images/story07.png";
import story8 from "../../assets/images/story08.png";


const stories = [
  {
    id: 1,
    image: story1,
    tag: "Finance",
    title: "Few best finance articles to refresh your financial literacy",
    date: "Admim | Jan 14, 2024",
    link: "/Blogsingle",
  },
  {
    id: 2,
    image: story2,
    tag: "Finance Tips",
    title: "15 Tips how to manage finance with smart app to grow 3x rapidly.",
    date: "Admim | Jan 14, 2024",
    link: "/Blogsingle",
  },
  {
    id: 3,
    image: story3,
    tag: "Finance",
    title: "Get all your financial under one control with our finance app.",
    date: "Admim | Jan 14, 2024",
    link: "/Blogsingle",
  },
  {
    id: 4,
    image: story4,
    tag: "Finance Tips",
    title: "Financial analysis and the prediction of top bank lorem.",
    date: "Admim | Jan 14, 2024",
    link: "/Blogsingle",
  },
  {
    id: 5,
    image: story5,
    tag: "Finance",
    title: "Few best finance articles to refresh your financial literacy",
    date: "Admim | Jan 14, 2024",
    link: "/Blogsingle",
  },
  {
    id: 6,
    image: story6,
    tag: "Finance Tips",
    title: "15 Tips how to manage finance with smart app to grow 3x rapidly.",
    date: "Admim | Jan 14, 2024",
    link: "/Blogsingle",
  },
  {
    id: 7,
    image: story7,
    tag: "Finance",
    title: "Few best finance articles to refresh your financial literacy",
    date: "Admim | Jan 14, 2024",
    link: "/Blogsingle",
  },
  {
    id: 8,
    image: story8,
    tag: "Finance Tips",
    title: "15 Tips how to manage finance with smart app to grow 3x rapidly.",
    date: "Admim | Jan 14, 2024",
    link: "/Blogsingle",
  },
];

const Liststory = () => {
  return (
    <div>
      <section className="row_am latest_story blog_list_story " id="blog">
        {/* container start */}
        <div className="container">
          {/* row start */}
          <div className="row">
            {/* story */}
            {stories.map((stories, index) => (
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
            ))}
          </div>
          
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
        </div>
        {/* container end */}
      </section>
    </div>
  );
};

export default Liststory;
