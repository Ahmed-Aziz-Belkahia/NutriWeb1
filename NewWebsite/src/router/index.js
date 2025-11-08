import React, { useEffect } from 'react';
import AOS from 'aos';
import { Route, Routes } from 'react-router-dom';
import Home from "../Components/Home/main";
import Features from "../Components/Features/main";
import About from "../Components/About/main";
import Contact from "../Components/Contact/main";
import Faq from "../Components/Faq/main";
import Signin from "../Components/Signin/main";
import Signup from "../Components/Signup/main";
import Bloglist from "../Components/Bloglist/main";
import Blogsingle from "../Components/Blogsingle/main";
import Pricing from "../Components/Pricing/main";
import Beta from "../Components/Beta/main";
import BetaAdmin from "../Components/BetaAdmin/main";
import BetaIOS from "../Components/BetaIOS/main";
import BetaVerify from "../Components/BetaVerify/main";
import BetaIOSInstructions from "../Components/BetaIOSInstructions/main";
import BetaAndroid from "../Components/BetaAndroid/main";
import BetaAndroidInstructions from "../Components/BetaAndroidInstructions/main";


const Index = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []); 

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/feature" element={<Features />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/bloglist" element={<Bloglist />} />
      <Route path="/blogsingle" element={<Blogsingle />} />
      <Route path="/blog/:id" element={<Blogsingle />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/beta" element={<Beta />} />
      <Route path="/beta-ios" element={<BetaIOS />} />
      <Route path="/beta-android" element={<BetaAndroid />} />
      <Route path="/beta-verify" element={<BetaVerify />} />
      <Route path="/beta-ios-instructions" element={<BetaIOSInstructions />} />
      <Route path="/beta-android-instructions" element={<BetaAndroidInstructions />} />
      <Route path="/betaadmin" element={<BetaAdmin />} />
    </Routes>
  );
};

export default Index;
