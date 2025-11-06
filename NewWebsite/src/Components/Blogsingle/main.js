import React from 'react'
import Headerr from '../Global/Headerr'
import Bredcrumb_blog from '../Mainblogsingle/Bredcrumb_blog'
import Blogdetails from '../Mainblogsingle/Blogdetails'
import Blogcomment from '../Mainblogsingle/Blogcomment'
import Blogform from '../Mainblogsingle/Blogform'
import Cta from "../Global/Cta"
import Footer from "../Global/Footer"



const main = () => {
  return (
    <div>
      <Headerr/>
      <Bredcrumb_blog/>
      <Blogdetails/>
      <Blogcomment/>
      <Blogform/>
      <Cta/>
      <Footer/>
      
    </div>
  )
}

export default main
