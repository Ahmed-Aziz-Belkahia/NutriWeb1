import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Features from './pages/Features';
import Contact from './pages/Contact';
import Beta from './pages/Beta';
import beta-admin from './pages/beta-admin';

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
          <Route path="/beta-admin" element={<beta-admin />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
