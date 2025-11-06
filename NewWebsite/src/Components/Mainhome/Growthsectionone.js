import React, { useState, useEffect } from 'react'
import element_1 from "../../assets/images/element1.png"
import element_2 from "../../assets/images/element2.png"
import app_img from "../../assets/images/banner.jpg"
import arrow_1 from "../../assets/images/arrow1.png"
import happy_icon from "../../assets/images/happy-icon.png"
import star_icon from "../../assets/images/star-icon.png"
import time_icon from "../../assets/images/time-icon.png"
import { Link } from "react-router-dom"
import Iframe from "react-iframe";

const uspData = [
  { id: 1, count: 17, suffix: "m+", label: "Happy Users", icon: happy_icon },
  { id: 2, count: 50, suffix: "k+", label: "Positive Reviews", icon: star_icon },
  { id: 3, count: 4, suffix: "x", label: "Faster Process", icon: time_icon },
];

const Growthsectionone = () => {
  const [ytshow, setytshow] = useState(false);

  const [counterValues, setCounterValues] = useState(
    uspData.map((item) => ({ id: item.id, value: 0 }))
  );


  useEffect(() => {
    // Animate the counter when the component is mounted
    uspData.forEach((item, index) => {
      let currentCount = 0;
      const interval = setInterval(() => {
        if (currentCount < item.count) {
          currentCount += 1;
          setCounterValues((prev) => {
            const newValues = [...prev];
            newValues[index].value = currentCount;
            return newValues;
          });
        } else {
          clearInterval(interval);
        }
      }, 50); // Adjust the speed by changing this value
    });
  }, []);


  return (
    <div>
      <section className="row_am elevate_growth_section section_inner_padding">
        {/* element start */}
        <div className="element">
          <span className="element1">
            {" "}
            <img src={element_1} alt="image" />{" "}
          </span>
          <span className="element2">
            {" "}
            <img src={element_2} alt="image" />{" "}
          </span>
        </div>
        {/* element end */}
        <div className="inner_sec">
          {/* container start */}
          <div className="container">
            {/*row-start*/}
            <div className="row growth_title ">
              <div className="col-md-12">
                
                <div
                  className="section_title white_text aos-init aos-animate"
                  data-aos="fade-up"
                  data-aos-duration={1000}
                  data-aos-delay={100}
                  style={{ textAlign: 'left' }}
                >
                  <span className="title_badge mb-1">BETA ACCESS</span>
                  
                  <h2 style={{ textAlign: 'left', marginBottom: '30px' }}>Join Nutri early — and shape what comes next</h2>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '30px', marginTop: '20px' }}>
                    <p style={{ flex: '1', fontSize: '16px', textAlign: 'left', margin: '0', padding: '0' }}>
                      Nutri is currently in beta testing, and we're inviting early users to explore every feature for free.
                      Your feedback helps us refine the app, fix small issues, and build the best version of Nutri together.
                      By joining now, you'll be part of the first group shaping the future of personal nutrition.
                    </p>
                    
                    <div style={{ flexShrink: '0' }}>
                      <Link to="/beta" className="btn btn-primary" style={{ padding: '15px 40px', fontSize: '16px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>
                        JOIN THE BETA NOW
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          
            <div className="row growth_img">
              <div className="col-md-12">
                <div style={{
                  position: 'relative',
                  width: '100%',
                  height: '0',
                  paddingBottom: '35%',
                  borderRadius: '30px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                  marginTop: '40px'
                }}>
                  <img 
                    src={app_img} 
                    alt="image" 
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center'
                    }}
                  />
                </div>
              </div>
            </div>

            
            {/* <div className="row growth_usp white_text">
              <ul className="growth_static" id="counter">
                {uspData.map((uspData, index) => (
                  <div className="col-sm-4" key={index}>
                    <li>
                      <div className="counter_box" >
                        <div className="icon">
                          <img src={uspData.icon} alt="image" />
                        </div>
                        <div className="text">
                          <p>
                            <span className="counter-value"> {counterValues[index] ? counterValues[index].value : 0} </span>
                            <span>{uspData.suffix}</span>
                          </p>
                          <p>{uspData.label}</p>
                        </div>
                      </div>
                    </li>
                  </div>
                ))}
               
              </ul>
            </div> */}
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

export default Growthsectionone
