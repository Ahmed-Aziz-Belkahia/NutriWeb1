import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Features from './pages/Features';
import Contact from './pages/Contact';
import Beta from './pages/Beta';
import BetaAdmin from './pages/BetaAdmin';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Features />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/beta" element={<Beta />} />
          <Route path="/beta-admin" element={<BetaAdmin />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
