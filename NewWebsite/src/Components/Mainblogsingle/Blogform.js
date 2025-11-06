import React from 'react'

const Blogform = () => {
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
    <form>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Name *" />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              placeholder="Email *"
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Phone" />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Website  "
            />
          </div>
        </div>
        <div className="col-md-12">
          <div className="form-group">
            <textarea
              className="form-control"
              placeholder="Comments"
              defaultValue={""}
            />
          </div>
        </div>
        <div className="col-md-12 text-right">
          <div className="btn_block">
            <button className="btn puprple_btn ml-0">Submit Comments</button>
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
