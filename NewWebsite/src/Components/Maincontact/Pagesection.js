import React, { useState } from "react";
import { Link } from "react-router-dom";
import mailicon from "../../assets/images/mail_icon.png";
import locationicon from "../../assets/images/location_icon.png";
// import rotate1 from "../../assets/images/pattern-rotate1.png"
import rotate1 from "../../assets/images/pattern1.png";
import ticket from "../../assets/images/ticket.png";

const contactInfo = [
  {
    icon: mailicon,
    label: "Email Us",
    content: <Link to="mailto:support@nutriai.pl">support@nutriai.pl</Link>,
  },
  {
    icon: locationicon,
    label: "Visit Us",
    content: (
      <p>
        AMO SP z o.o.<br />
        Szaniawskiego 10<br />
        01-542 Warsaw<br />
        Poland<br />
        PL5242702719
      </p>
    ),
  },
];

const Pagesection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    phone: '',
    message: '',
    agreedToTerms: false
  });
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.agreedToTerms) {
      setSubmitStatus({ type: 'error', message: 'Please agree to terms and conditions' });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    try {
      const response = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({ type: 'success', message: 'Message sent successfully! We will get back to you soon.' });
        setFormData({
          name: '',
          email: '',
          country: '',
          phone: '',
          message: '',
          agreedToTerms: false
        });
      } else {
        setSubmitStatus({ type: 'error', message: data.message || 'Failed to send message' });
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Network error. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <section className="row_am contact_page_section">
        <div className="container">
          <div className="contact_inner">
            <div className="row">
              {/* left colom */}
              <div className="col-lg-6">
                <div className="contact_info">
                  <div className="section_title">
                    <h3>Contact informations</h3>
                    <p>Get in touch with us.</p>
                  </div>
                  {contactInfo.map((info, index) => (
                    <ul className="contact_info_list" key={index}>
                      <li>
                        <div className="img">
                          <img src={info.icon} alt="page-img" />
                        </div>
                        <div className="text">
                          <span>{info.label}</span>
                          {info.content}
                        </div>
                      </li>
                    </ul>
                  ))}
                  <div className="ticket_box">
                    <div className="pattern-rotate">
                      <img src={rotate1} alt="page-img" />
                    </div>
                    <div className="icon">
                      <img src={ticket} alt="page-img" />
                    </div>
                    <div className="section_title">
                      <h4>Generate Ticket</h4>
                      <p>
                        Need support or have query for our application, service
                        ?, Please submit ticket.
                      </p>
                    </div>
                    <Link to="#" className="btn puprple_btn">
                      Generate Ticket Now
                    </Link>
                  </div>
                </div>
              </div>
              {/* left colom */}
              {/* right colom */}
              <div className="col-lg-6">
                <div className="contact_form">
                  <div className="section_title">
                    <h3>Message us</h3>
                    <p> Fill up form below, our team will get back soon </p>
                  </div>
                  {submitStatus.message && (
                    <div className={`alert ${submitStatus.type === 'success' ? 'alert-success' : 'alert-danger'}`} style={{ marginBottom: '20px' }}>
                      {submitStatus.message}
                    </div>
                  )}
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        className="form-control"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        name="country"
                        placeholder="Country"
                        className="form-control"
                        value={formData.country}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        className="form-control"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <textarea
                        className="form-control"
                        name="message"
                        placeholder="Your message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group term_check">
                      <input 
                        type="checkbox" 
                        id="term" 
                        name="agreedToTerms"
                        checked={formData.agreedToTerms}
                        onChange={handleChange}
                      />
                      <label htmlFor="term">
                        I agree to terms and conditions.
                      </label>
                    </div>
                    <div className="form-group mb-0">
                      <button type="submit" className="btn puprple_btn" disabled={isSubmitting}>
                        {isSubmitting ? 'Sending...' : 'Submit your Message'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              {/* right colom */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pagesection;
