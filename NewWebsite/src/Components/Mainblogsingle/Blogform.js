import React, { useState } from 'react'

const Blogform = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
    comment: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.comment) {
      alert('Please fill in all required fields (Name, Email, and Comment)');
      return;
    }

    // Create comment object
    const newComment = {
      name: formData.name,
      email: formData.email,
      comment: formData.comment,
      timestamp: new Date().toISOString()
    };

    // Get existing comments from localStorage
    const existingComments = JSON.parse(localStorage.getItem('blogComments') || '[]');
    
    // Add new comment to the beginning of the array
    existingComments.unshift(newComment);
    
    // Save back to localStorage
    localStorage.setItem('blogComments', JSON.stringify(existingComments));

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      website: '',
      comment: ''
    });

    // Show success message
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);

    // Trigger a page reload to show the new comment
    window.location.reload();
  };

  return (
    <div>
      <section
        className="row_am comment_form_section aos-init aos-animate"
        data-aos="fade-up"
        data-aos-duration={1500}
      >
        <div className="container container-sm">
          <div className="section_title">
            <h3>Leave a comment</h3>
            <p>
              Your email address will not be published. Required fields are marked *
            </p>
          </div>
          {submitted && (
            <div style={{
              padding: '15px',
              marginBottom: '20px',
              backgroundColor: '#d4edda',
              color: '#155724',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              Comment submitted successfully!
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Name *" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email *"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Phone" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <textarea
                    className="form-control"
                    placeholder="Comments *"
                    name="comment"
                    value={formData.comment}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-12 text-right">
                <div className="btn_block">
                  <button type="submit" className="btn puprple_btn ml-0">Submit Comment</button>
                  <div className="btn_bottom" />
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}

export default Blogform
