import React from 'react'
import Headerr from "../Global/Headerr"
import Bredcrumb from "../Global/Bredcrumb"
import Pagesection from '../Maincontact/Pagesection'
import Mapsec from '../Maincontact/Mapsec'
import Cta from '../Global/Cta'
import Footer from '../Global/Footer'

const main = () => {
  return (
    <div>
        <Headerr/>
        <Bredcrumb Heading={"contact us"} Description={"Need support ? or if you have an query, please get in touch with us, our team will revert back quickly for support."}Title={"We are here to help"} Subtitle={"Contact us"}/>
        <Pagesection/>
        <Mapsec/>
        <Cta/>
        <Footer/>
    </div>
  )
}

export default main