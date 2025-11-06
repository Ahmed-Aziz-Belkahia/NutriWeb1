import React, { useRef } from 'react';
import testimonial_01 from "../../assets/images/user_img1.png";
import testimonial_02 from "../../assets/images/testimonial_02.png";
import testimonial_03 from "../../assets/images/testimonial_03.png";
import testimonial_bg from "../../assets/images/testimonial-corner-bg.png";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";

const testimonials = [
  {
    id: 1,
    img: testimonial_01,
    name: "Jorden Smith",
    company: "Finserve Ltd.",
    title: "Incredible Support and Services",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem Ipsum has been the industry's standard dummy text ever since.",
    back: testimonial_bg,
  },
  {
    id: 2,
    img: testimonial_02,
    name: "Cyrus Loy",
    company: "Finance Company",
    title: "Easy and User Friendly Application",
    text: "Simply dummy text of the printing and typesetting industry lorem Ipsum has been the industry's standard dummy text ever since.",
    back: testimonial_bg,
  },
  {
    id: 3,
    img: testimonial_03,
    name: "Willium Joy",
    company: "Smartbrain Tech",
    title: "Incredible Support and Services",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem Ipsum has been the industry's standard dummy text ever since.",
    back: testimonial_bg,
  },
];

const Testimonialone = () => {
  const swiperRef = useRef(null);


  const handlePrevClick = () => {
    if (swiperRef.current) swiperRef.current.slidePrev();
  };

  const handleNextClick = () => {
    if (swiperRef.current) swiperRef.current.slideNext();
  };



  return (
    <div>
      <section className="row_am testimonial_section home_testimonial section_inner_padding">
        <div className="container">
          <div className="section_title">
            <span className="title_badge mb-1"> Reviews </span>
            <h2>Client Testimonials</h2>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem Ipsum has been the industry's standard dummy text ever since.
            </p>
          </div>
          <div className="testimonial_slides">
            <div className="mySwiper" id="testimonial_slider1">

              <Swiper
                navigation={{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }}
                slidesPerView={2}
                spaceBetween={30}
                speed={1000}
                autoplay={{ delay: 3000 }}
                loop={true}
                modules={[Autoplay, Navigation]}

                onSwiper={(swiper) => (swiperRef.current = swiper)}
              >
                {testimonials.map((testimonial) => (
                  <SwiperSlide className="item" key={testimonial.id}>
                    <div className="testimonial_box">
                      <div className="testi_img">
                        <img className="user_img" src={testimonial.img} alt="user" />
                        <div className="user_info">
                          <h6>{testimonial.name}</h6>
                          <p>{testimonial.company}</p>
                          <div className="star">
                            {[...Array(5)].map((_, i) => (
                              <span key={i}><i className="icofont-star" /></span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="testi_text">
                        <h4>{testimonial.title}</h4>
                        <p>{testimonial.text}</p>
                      </div>
                      <div className="testi-corner">
                        <div className="bg-box">
                          <img src={testimonial.back} alt="background" />
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>


              <button type="button" className="swiper-button-prev">
                <span className="fal fa-angle-left"></span>
              </button>
              <button type="button" className="swiper-button-next">
                <span className="fal fa-angle-right"></span>
              </button>
            </div>

            <div className="btn_block">
              <Link to="#" className="btn puprple_btn aos-init aos-animate" data-aos="fade-in">View More Testimonials</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonialone;
