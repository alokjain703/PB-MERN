import './App.css'
import ResponsiveAppBar from './components/ResponsiveAppBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
function App() {


  return (
    <Router>
      <ResponsiveAppBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/contact" element={<div>Contact Page</div>} />
            <Route path="/blog" element={<div>Blog Page</div>} />
      </Routes>
    </Router>
  )
}

export default App
