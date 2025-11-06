import { BrowserRouter as Router } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Preloader from './Components/Global/Preloader';
import Routing from './router';
import '../src/assets/css/icofont.min.css';
import '../src/assets/css/bootstrap.min.css';
import '../src/assets/css/aos.css';
import '../src/assets/css/style.css';
import '../src/assets/css/responsive.css';
import ScrollToTopButton from './Components/Global/ScrollToTopButton';


export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <Router>
          <Routing />
        </Router>
      )}


      <ScrollToTopButton />
    </>
  );
}
