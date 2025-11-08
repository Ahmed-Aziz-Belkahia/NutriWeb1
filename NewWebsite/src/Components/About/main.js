import React from 'react'
// import Preloader from "../Global/Preloader"
import Headerr from "../Global/Headerr"
import Bredcrumb from "../Mainabout/Bredcrumb"
import Ceomess from '../Mainabout/Ceomess'
import Appsol from '../Mainabout/Appsol'
import Vision from '../Mainabout/Vision'
import Appsection from '../Mainabout/Appsection'
// import Testimonal from '../Global/Testimonal'
import Ourjourney from '../Mainabout/Ourjourney'
// import Introvideo from '../Mainabout/Introvideo'
// import Teamsection from '../Mainabout/Teamsection'
import Downloadapp from '../Global/Downloadapp'
import Cta from '../Global/Cta'
import Footer from '../Global/Footer'



const main = () => {
  return (
    <div>
      {/* <Preloader/> */}
      <Headerr/>
      <Bredcrumb/>
      <Ceomess/>
      <Appsol/>
      <Vision/>
      <Appsection/>
      {/* <Testimonal/> */}
      <Ourjourney/>
      {/* <Introvideo/> */}
      {/* <Teamsection/> */}
      <Downloadapp/>
      <Cta/>
      <Footer/>
    </div>
  )
}

export default main
