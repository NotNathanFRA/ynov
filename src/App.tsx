import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import Destinations from './components/Destinations';
import Quiz from './components/Quiz';
import Chatbot from './components/Chatbot';
import DestinationPage from './pages/DestinationPage';
import ConfirmationPage from './pages/ConfirmationPage';

function Home() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <div className="min-h-screen bg-charcoal-dark font-sans">
      <Hero />
      <Destinations />
      <Quiz />
      <Chatbot />
    </div>
  );
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/destination/:id" element={<DestinationPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
      </Routes>
      <Chatbot />
    </>
  );
}

export default App;
