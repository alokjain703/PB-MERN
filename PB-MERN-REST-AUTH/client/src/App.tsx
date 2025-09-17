import './App.css'
import ResponsiveAppBar from './components/ResponsiveAppBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import AdminPage from './pages/AdminPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
function App() {


  return (
    <Router>
      <ResponsiveAppBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/blog" element={<BlogPage />} />
      
            <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  )
}

export default App
