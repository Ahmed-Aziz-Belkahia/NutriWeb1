import React from "react";
import Iframe from "react-iframe";


const Mapsec = () => {
  return (
    <div>
      <section className="row_am map_section">
        <div className="container">
          <div className="map_inner">
            
              <Iframe
                url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2443.1234567890123!2d20.9805!3d52.2396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecc8c2e1a4c91%3A0x1234567890abcdef!2sSzaniawskiego%2010%2C%2001-542%20Warszawa%2C%20Poland!5e0!3m2!1sen!2spl!4v1699999999999!5m2!1sen!2spl"
                width="100%"
                height={510}
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
           
          </div>
        </div>
      </section>
    </div>
  );
};

export default Mapsec;
