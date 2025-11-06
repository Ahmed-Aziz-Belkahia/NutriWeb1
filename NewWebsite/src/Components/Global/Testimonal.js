import React, { useState } from "react";
import { Link } from "react-router-dom";
import like from "../../assets/images/like.png";
import thumbup from "../../assets/images/thumbup.png";
import testimonal1 from "../../assets/images/testimonial_01.png";
import playwhite from "../../assets/images/play_white.png";
import testimonal2 from "../../assets/images/testimonial_02.png";
import testimonal3 from "../../assets/images/testimonial_03.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination"; // Import pagination CSS
import { Autoplay, Pagination } from "swiper/modules";
import Iframe from "react-iframe";

const value = {
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    600: {
      slidesPerView: 1,
    },
    1000: {
      slidesPerView: 1,
    },
  },
};

const Testimonal = () => {
  const [ytshow, setytshow] = useState(false);
  const testimonials = [
    {
      image: testimonal1,
      name: "Willium Joy",
      company: "Smartbrain Tech",
      review:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry has been the standard dummy.",
    },
    {
      image: testimonal2,
      name: "Willium Joy",
      company: "Smartbrain Tech",
      review:
        "Dummy text of the printing and typesetting industry has been standard Lorem Ipsum is simply.",
    },
    {
      image: testimonal3,
      name: "Willium Joy",
      company: "Smartbrain Tech",
      review:
        "Printing and typesetting industry lorem Ipsum has been standard dummy lorem Ipsum is simply dummy text of the.",
    },
  ];

  return (
    <div>
      <section
        className="row_am testimonial_section aos-init aos-animate"
        data-aos="fade-in"
        data-aos-duration={1500}
      >
        <div className="title">
          <div className="star">
            <span>
              <i className="icofont-star" />
            </span>
            <span>
              <i className="icofont-star" />
            </span>
            <span>
              <i className="icofont-star" />
            </span>
            <span>
              <i className="icofont-star" />
            </span>
            <span>
              <i className="icofont-star" />
            </span>
          </div>
          <span className="sub_title">4.9 / 5.0 Rated on App store</span>
        </div>
        <div className="testimonial_inner">
          {/* element start */}
          <div className="t_element">
            <span className="t_element1">
              <img src={like} alt="testimonal-img" />
            </span>
            <span className="t_element2">
              <img src={thumbup} alt="testimonal-img" />
            </span>
          </div>
          {/* element end */}
          <div
            className="section_title aos-init aos-animate"
            data-aos="fade-up"
            data-aos-duration={1500}
            data-aos-delay={100}
          >
            <span className="title_badge mb-1"> Reviews </span>
            <h2>Client Testimonials</h2>
          </div>
          <div className="container aos-init aos-animate">
            <div className="testimonial_slides">
              <Swiper
                {...value}
                slidesPerView={1}
                spaceBetween={30}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false, // Ensure autoplay continues after interaction
                }}
                loop={true}
                pagination={{
                  clickable: true, // Make dots clickable
                  // Optional: makes the active dot smaller
                }}
                modules={[Autoplay, Pagination]}
                className="mySwiper"
              >
                {testimonials.map((client, index) => (
                  <SwiperSlide className="item" key={index}>
                    <div className="testimonial_box">
                      <div className="testi_img">
                        <img
                          className="user_img"
                          src={client.image}
                          alt="testimonal-img"
                        />
                        <Link
                          to="#"
                          className="popup-youtube play-button play_icon"
                          data-url="#"
                          data-toggle="modal"
                          data-target="#myModal"
                          title="CLICK to WATCH VIDEO"
                        >
                          <img src={playwhite} alt="testimonal-img"
                          onClick={() => setytshow(true)}/>
                        </Link>
                      </div>
                      <div className="testi_text">
                        <div className="star">
                          <span>
                            <i className="icofont-star" />
                          </span>
                          <span>
                            <i className="icofont-star" />
                          </span>
                          <span>
                            <i className="icofont-star" />
                          </span>
                          <span>
                            <i className="icofont-star" />
                          </span>
                          <span>
                            <i className="icofont-star" />
                          </span>
                        </div>
                        <p>{client.review}</p>
                        <div className="user_info">
                          <h6>{client.name} </h6>
                          <span style={{ paddingBottom: "13%" }}> {client.company}</span>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </section>
      {ytshow && (
        <div
          className="modal fade youtube-video show"
          id="myModal"
          tabIndex={-1}
          style={{ display: "block", paddingRight: 17 , background: "#000c" }}
          aria-modal="true"
          role="dialog"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <button
                id="close-video"
                type="button"
                className="button btn btn-default text-right"
                data-dismiss="modal"
              >
                <i
                  className="icofont-close-line-circled"
                  onClick={() => setytshow(false)}
                />
              </button>
              <div className="modal-body">
                <div id="video-container" className="video-container">
                  <Iframe
                    id="youtubevideo"
                    width={640}
                    height={360}
                    allowFullScreen=""
                    url="https://www.youtube.com/embed/tgbNymZ7vqY"
                  />
                </div>
              </div>
              <div className="modal-footer"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Testimonal;
