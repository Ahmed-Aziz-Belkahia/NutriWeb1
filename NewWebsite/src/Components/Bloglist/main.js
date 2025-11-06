import React from 'react'
import Headerr from "../Global/Headerr"
import Bredcrumb from '../Mainbloglist/Bredcrumb'
import Bloglist from '../Mainbloglist/Bloglist'
import Liststory from '../Mainbloglist/Liststory'
import Cta from '../Global/Cta'
import Footer from '../Global/Footer'

const main = () => {
  return (
    <div>
        <Headerr/>
        <Bredcrumb/>
        <Bloglist/>
        <Liststory/>
        <Cta/>
        <Footer/>
    </div>
  )
}

export default main