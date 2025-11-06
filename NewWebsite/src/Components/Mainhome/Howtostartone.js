import React from 'react'
import app_register_icon from "../../assets/images/app-register-icon.png"
import verify_icon from "../../assets/images/verify-icon.png"
import transaction_icon from "../../assets/images/transaction-icon.png"
import mobile_img from "../../assets/images/tilted.png"


const steps = [
  {
    id: 1,
    title: "Download the app",
    description: "If you're on iOS, get instant access on the App Store. If you're on Android, join the waitlist here — approval usually takes about 20 minutes.",
    icon: app_register_icon,
    Num: "01",
   },
  {
    id: 2,
    title: "Verify your access",
    description: "Once your email is approved, you'll receive beta access to the Nutri app. You can log in, explore all features, and start using it completely free.",
    icon: verify_icon,
    Num: "02",
  },
  {
    id: 3,
    title: "Share your feedback for extra access",
    description: "After testing, fill out this quick form to share your thoughts. As a thank-you, you'll get 3 more months of free access when Nutri officially launches.",
    icon: transaction_icon,
    Num: "03",
  },
];


const Howtostartone = () => {
  return (
    <div>
      

      <section className="row_am howwork_section">
  {/* animated dots */}
  <div className="dotes_anim_bloack">
    <div className="dots dotes_1" />
    <div className="dots dotes_2" />
    <div className="dots dotes_3" />
    <div className="dots dotes_4" />
    <div className="dots dotes_5" />
    <div className="dots dotes_6" />
    <div className="dots dotes_7" />
    <div className="dots dotes_8" />
    <div className="dots dotes_9" />
    <div className="dots dotes_10" />
  </div>
  <div className="inner_sec">
    {/* container start */}
    <div className="container">
      {/* heading */}
      <div
        className="section_title aos-init aos-animate"
        data-aos="fade-up"
        data-aos-duration={1000}
        data-aos-delay={100}
      >
        <span className="title_badge mb-1">Easy Steps</span>
        {/* h2 */}
        <h2>Join the Nutri beta in 3 simple steps</h2>
        <p>
          Nutri is currently in beta testing, and everyone who joins now gets full access for free. You can also earn an extra 3 months of free access by filling out our short feedback form.
        </p>
      </div>
      {/*row-start*/}
      
      <div className="row work_blocks">
        {/* colom   */}
        {steps.map((steps, index) => (
        <div className="col-lg-4 col-md-12" key={index}>
          <div className="work_box">
            <div className="work_title">
              <h6>
                {steps.title}
              </h6>
              <img
                src={steps.icon}
                alt="image"
                className="work_icon"
              />
            </div>
            <div className="work_text">
              <p>
                {steps.description}
              </p>
            </div>
            <div className="work_step">
              <div className="step-box">{steps.Num}</div>
            </div>
          </div>
        </div>
        ))}
        
      </div>
      
      <div className="row device_img justify-content-md-center">
        <img
          src={mobile_img}
          className="moving_position_animatin"
          alt="image"
        />
      </div>
      
    </div>
  </div>
</section>

    </div>
  )
}

export default Howtostartone
