import React from 'react'
import Headerr from "../Global/Headerr"
import Bredcrumb from '../Global/Bredcrumb'
import Pricingone from '../Mainhome/Pricingone'
import Pricingplan from '../Mainpricing/Pricingplan'
import Downloadapp from '../Global/Downloadapp'
import Faq from '../Mainpricing/Faq'
import Cta from '../Global/Cta'
import Footer from '../Global/Footer'


const main = () => {
  return (
    <div>
      <Headerr/>
      <Bredcrumb Title={"Best pricing"} Subtitle={"Our Pricing & Plans"} Heading={"Packages"} />
      <Pricingone/>
      <Pricingplan/>
      <Downloadapp/>
      <Faq/>
      <Cta/>
      <Footer/>
    </div>
  )
}

export default main
