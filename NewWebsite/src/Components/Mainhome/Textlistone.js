import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";


const value = {
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        600: {
            slidesPerView: 2,
        },
        1000: {
            slidesPerView: 3,
        },
        1400: {
            margin: 60,
        },
    },

}

const Textlistone = () => {

    return (
        <div>
            <div className="text_list_section row_am">

                <div className="slider_block">
                    <div className="mySwiper" id="text_list_flow">
                        <Swiper
                            {...value}
                            slidesPerView={3}
                            spaceBetween={5}
                            autoplay={{ delay: 750 }}
                            modules={[Autoplay]}
                            loop={true}
                        >
                            <SwiperSlide className="item">
                                <div className="text_block">
                                    <span>AI Meal Scanning</span>
                                    <span className="mark_star">•</span>
                                </div>
                            </SwiperSlide>

                            <SwiperSlide className="item">
                                <div className="text_block">
                                    <span>Meal Planning</span>
                                    <span className="mark_star">•</span>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="item">
                                <div className="text_block">
                                    <span>Nutrition Tracking</span>
                                    <span className="mark_star">•</span>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="item">
                                <div className="text_block">
                                    <span>Smart Insights</span>
                                    <span className="mark_star">•</span>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="item">
                                <div className="text_block">
                                    <span>Recipe Generation</span>
                                    <span className="mark_star">•</span>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="item">
                                <div className="text_block">
                                    <span>Body Analysis</span>
                                    <span className="mark_star">•</span>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Textlistone
