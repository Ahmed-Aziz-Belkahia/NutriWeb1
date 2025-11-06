import React from "react";
import { Link } from "react-router-dom";
import ceoimg from "../../assets/images/ceo_img.png";
import review from "../../assets/images/review_icon_img.png";
import purple from "../../assets/images/element-purple.png";
import small from "../../assets/images/element-small.png";

const Ceomess = () => {
  return (
    <div>
      <section className="row ceo_message white_text">
        
        <div className="container">
          
          <div className="ceo_message_box">
            <div className="container">
              
              <div className="row">
              
                <div className="col-md-9">
                  <div className="message_box">
                  
                    <div className="message_img">
                      <img src={ceoimg} alt="ceo-img" />
                    </div>
                    
                    <div className="message_text">
                      <div className="service_badge">
                        <span>Message from Founder</span>
                      </div>
                      <h4>
                        Welcome to NutriAI! We created this app to make healthy eating accessible to everyone. 
                        By combining AI technology with nutrition science, we're transforming how people track 
                        their meals and achieve their wellness goals. Join us on this journey to a healthier you.
                      </h4>
                      
                      <div className="ceo_info">
                        <h6>NutriAI Team</h6>
                        <span>Founders of NutriAI</span>
                      </div>
                    </div>
                  </div>
                </div>
              
              
                <div className="col-md-3">
                  <div className="client_review">
                    <img src={review} alt="ceo-img" />
                    <p> 5000+ Happy Users</p>
                    <p>
                      <Link to="#">Read all Reviews</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          
            <div className="t_element">
              <span className="element1">
                <img src={purple} alt="ceo-img" />
              </span>
              <span className="element2">
                <img src={small} alt="ceo-img" />
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Ceomess;
