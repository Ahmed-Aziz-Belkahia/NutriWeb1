import React from 'react'
import paypal from "../../assets/images/paypal.png"
import spoty from "../../assets/images/spoty.png"
import shopboat from "../../assets/images/shopboat.png"
import slack from "../../assets/images/slack.png"
import envato from "../../assets/images/envato.png"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Autoplay, Pagination } from "swiper/modules";



const value = {
  breakpoints: {
    0: {
      slidesPerView: 2,
    },
    600: {
      slidesPerView: 3,
    },
    1000: {
      slidesPerView: 5,
    },
    1400: {
      margin: 60,
    },
  },

}

const companyLogos = [
  {
    id: 1,
    img: paypal,
  },
  {
    id: 2,
    img: spoty,
  },
  {
    id: 3,
    img: shopboat,
  },
  {
    id: 4,
    img: slack,
  },
  {
    id: 5,
    img: envato,
  },
  {
    id: 6,
    img: paypal,
  },
  {
    id: 7,
    img: spoty,
  },
  {
    id: 8,
    img: shopboat,
  },
];



const Trustedone = () => {
  return (
    <div>
      <section className="row_am trusted_section section_inner_top_padding">

        <div className="container">
          <div
            className="section_title aos-init aos-animate"
            data-aos="fade-up"
            data-aos-duration={1500}
            data-aos-delay={100}
          >

            <h2>Trusted by 150+ companies</h2>

            <p>
              Lorem Ipsum is simply dummy text of the printing and typese tting indus
              orem Ipsum has beenthe standard dummy.
            </p>
          </div>

          <div className="company_logos">
            <div id="company_slider" className="mySwiper"  >
              <Swiper
                {...value}
                slidesPerView={5}
                spaceBetween={10}
                speed={1000}
                autoplay={{ delay: 7000 }}
                pagination={{ clickable: true }}
                modules={[Autoplay, Pagination]}
                loop={true}
                style={{ paddingBottom: "37px" }}
              >
                {companyLogos.map((company, index) => (
                  <SwiperSlide className="item" key={index}>
                    <div className="logo">
                      <img src={company.img} alt="image" />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="swiper-pagination">
                <span className="swiper-pagination-bullet"></span>
              </div>
            </div>
          </div>

        </div>

      </section>

    </div>
  )
}

export default Trustedone
