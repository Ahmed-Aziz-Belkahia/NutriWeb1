import React, { useState } from 'react'
import element_1 from "../../assets/images/element1.png"
import element_2 from "../../assets/images/element2.png"
import functional_icon from "../../assets/images/functional-icon.png"
import protected_icon from "../../assets/images/protected-icon.png"
import support_icon from "../../assets/images/support-icon.png"
import arrow_icon from "../../assets/images/arrow-icon.png"
import feature_img from "../../assets/images/image1.png"
import play_icon from "../../assets/images/play-icon.png"
import { Link } from "react-router-dom"
import Iframe from "react-iframe";



const Whychoose = () => {
  const features = [
    {
      id: 1,
      icon: functional_icon,
      title: "Personalized & Practical",
      description:
        "Nutri adapts to your goals and lifestyle to make healthy eating effortless.",
    },
    {
      id: 2,
      icon: protected_icon,
      title: "Safe & Reliable",
      description:
        "Every recommendation is grounded in trusted nutrition principles and mindful balance.",
    },
    {
      id: 3,
      icon: support_icon,
      title: "Support That Never Sleeps",
      description:
        "Plan meals, track progress, and get help anytime — Nutri's resources are always available.",
    },
  ];

  const [ytshow, setytshow] = useState(false);
  return (
    <div>
      <section className="row_am whychoose_section">

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

        <div className="inner_sec">

          <div className="container">

            <div
              className="section_title top_content aos-init aos-animate"
              data-aos="fade-up"
              data-aos-duration={1500}
              data-aos-delay={300}
            >

              <span className="title_badge mb-1">Best features</span>
              <h2>Why choose us</h2>
              <p>
                We believe healthy living should be simple, sustainable, and made for real life.
                Here's what makes Nutri the right choice for your nutrition journey.
              </p>

            </div>

            <div className="row whychoose_dh">

              <div className="col-lg-6">

                {features.map((features, index) => (
                  <div className="whychoose_box" key={index}>
                    <div className="choose_icon">
                      <img src={features.icon} alt="image" />
                    </div>
                    <div className="choose_text">
                      <h6>{features.title}</h6>
                      <p>
                        {features.description}
                      </p>
                    </div>
                  </div>
                ))}

              </div>

              <div className="col-lg-6">
                <div className="whychoose_support">
                  <div className="support_box">
                    <div className="support_text">
                      We provide 24/7 emergency support
                    </div>{" "}
                    <div className="spport_icon">
                      <Link to="/contact">
                        <img src={arrow_icon} alt="image" />
                      </Link>
                    </div>
                  </div>
                  <div className="choose_img">
                    <img src={feature_img} alt="image" />
                  </div>
                  {/* <div className="choose_play">
                    <Link
                      className="popup-youtube play-button"
                      data-url="#"
                      data-toggle="modal"
                      data-target="#myModal"
                      title="CLICK to WATCH VIDEO"

                    >
                      <img src={play_icon} alt="image"
                        onClick={() => setytshow(true)} />
                    </Link>
                  </div> */}
                </div>
              </div>
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

export default Whychoose
