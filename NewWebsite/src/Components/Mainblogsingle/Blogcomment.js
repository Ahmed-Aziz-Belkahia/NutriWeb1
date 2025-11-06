import React from 'react'
import blog_01 from "../../assets/images/blog_d01.png"
import blog_02 from "../../assets/images/blog_d02.png"
import blog_03 from "../../assets/images/blog_d03.png"




const Blogcomment = () => {
  return (
    <div>
      <section
  className="row_am comment_section pb-0 aos-init aos-animate"
  data-aos="fade-up"
  data-aos-duration={1500}
>
  <div className="container container-sm">
    <div className="section_title">
      <h3>17 Comments</h3>
    </div>
    <ul>
      <li>
        <div className="authore_info">
          <div className="avtar">
            <img src={blog_01} alt="image" />
          </div>
          <div className="text">
            <span>5 hours ago</span>
            <h6>Willimum </h6>
          </div>
        </div>
        <div className="comment">
          <p>
          Txt ever since the when an unknown printer took a galley of type and scrambled. Survived not only five centuries, but also the leap lLorem Ipsum has been.
          </p>
        </div>
      </li>
  
      <li className="replay_comment">
        <div className="authore_info">
          <div className="avtar">
            <img src={blog_02} alt="image" />
          </div>
          <div className="text">
            <span>8 hours ago</span>
            <h6>Ken</h6>
          </div>
        </div>
        <div className="comment">
          <p>
            Standard dummy text ever since the when an unknown printer took a
            galley of type and scrambled. Survived not.
          </p>
        </div>
      </li> 
      <li>
        <div className="authore_info">
          <div className="avtar">
            <img src={blog_03} alt="image" />
          </div>
          <div className="text">
            <span>2 Days ago</span>
            <h6>Lilyie</h6>
          </div>
        </div>
        <div className="comment">
          <p>
            Sandard dummy text ever since the when an unknown printer took a
            galley of type and scrambled. Survived not only five centuries but
            also the leap.
          </p>
        </div>
      </li>
    </ul>
  </div>
</section>

    </div>
  )
}

export default Blogcomment
