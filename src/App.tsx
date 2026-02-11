import { useEffect } from 'react';
import Hero from './components/Hero';
import Destinations from './components/Destinations';
import Quiz from './components/Quiz';
import Chatbot from './components/Chatbot';

function App() {
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

export default App;
