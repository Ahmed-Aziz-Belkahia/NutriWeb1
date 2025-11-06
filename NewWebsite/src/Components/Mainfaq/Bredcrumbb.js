import React from 'react'
import { Link } from 'react-router-dom'

const Bredcrumbb = () => {
  return (
    <div>
      <div className="bred_crumb">
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
  <div className="container">
    <div className="bred_text">
      <h1>Questions &amp; Answers</h1>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry dummy text of the printing lorem Ipsum has been.
      </p>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <span>»</span>
        </li>
        <li>
          <Link to="/faq">Faq</Link>
        </li>
      </ul>
    </div>
  </div>
</div>
    </div>
  )
}

export default Bredcrumbb
