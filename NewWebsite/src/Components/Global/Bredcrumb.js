import React from 'react'
import { Link } from 'react-router-dom'

const Bredcrumb = ({Title,Subtitle,Heading,Description}) => {
  return (
    <div>
        <div className="bred_crumb">

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
      <span className="title_badge mb-1">{Heading}</span>
      <h1>{Title}</h1>
      <p>
        {Description}
      </p>
      <ul>
        <li>
          <Link to="/Home">Home</Link>
        </li>
        <li>
          <span>»</span>
        </li>
        <li>
          <Link to="/Features"> {Subtitle}</Link>
        </li>
      </ul>
    </div>
  </div>
</div>

    </div>
  )
}

export default Bredcrumb
