import React from 'react' 
import Headerr from '../Global/Headerr';
import Bannerrone from '../Mainhome/Bannerrone';
import Textlistone from '../Mainhome/Textlistone';
import Whychoose from '../Mainhome/Whychoose';
import Servicesectionone from '../Mainhome/Servicesectionone';
import Howtostartone from '../Mainhome/Howtostartone';
import Growthsectionone from '../Mainhome/Growthsectionone';
import Customerpayone from '../Mainhome/Customerpayone';
import Smartfeaturesone from '../Mainhome/Smartfeaturesone';
import Testimonialone from '../Mainhome/Testimonialone';
import Trustedone from '../Mainhome/Trustedone';
import Pricingone from '../Mainhome/Pricingone';
import Downloadapp from '../Global/Downloadapp';
import Lateststoryone from '../Mainhome/Lateststoryone';
import Cta from '../Global/Cta';
import Footer from "../Global/Footer"





const main = () => {
  return (
    <div>
    <Headerr/>
    <Bannerrone/>
    <Textlistone/>
    <Whychoose/>
    <Servicesectionone/>
    <Howtostartone/>
    <Growthsectionone/>
    <Customerpayone/>
    <Smartfeaturesone/>
    {/* <Testimonialone/> */}
    {/* <Trustedone/> */}
    <Pricingone/>
    <Downloadapp/>
    <Lateststoryone/>
    <Cta/>
    <Footer/>
    </div>
  )
}

export default main
