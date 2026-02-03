import React, { useEffect } from 'react';
import AOS from 'aos';
import { Route, Routes, Navigate } from 'react-router-dom';
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
import Privacy from "../Components/Privacy/main";
import Terms from "../Components/Terms/main";


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
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/web-onboarding" element={<Navigate to="/" replace />} />
      {/* Redirect old beta routes to home */}
      <Route path="/beta" element={<Navigate to="/" replace />} />
      <Route path="/beta-ios" element={<Navigate to="/" replace />} />
      <Route path="/beta-android" element={<Navigate to="/" replace />} />
      <Route path="/beta-verify" element={<Navigate to="/" replace />} />
      <Route path="/beta-ios-instructions" element={<Navigate to="/" replace />} />
      <Route path="/beta-android-instructions" element={<Navigate to="/" replace />} />
      <Route path="/beta-admin" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default Index;
