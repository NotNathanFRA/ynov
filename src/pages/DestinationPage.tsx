import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { destinations } from '../components/Destinations';
import { motion, AnimatePresence } from 'framer-motion';

export default function DestinationPage() {
  const { id } = useParams();
  const destination = destinations.find((d) => d.id === id);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [people, setPeople] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      window.scrollTo({ top: 0, behavior: 'auto' });
    } catch (e) {
      // noop for non-browser environments
    }
  }, []);

  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-charcoal-dark text-white">
        <div className="text-center">
          <h2 className="text-3xl font-serif mb-4">Destination non trouvée</h2>
          <Link to="/" className="text-gold underline">Retour à l'accueil</Link>
        </div>
      </div>
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (destination) {
      const booking = {
        destinationId: destination.id,
        destinationTitle: destination.title,
        name,
        email,
        date,
        people,
      };

      navigate('/confirmation', { state: booking });
    }

    setName('');
    setEmail('');
    setDate('');
    setPeople(1);
  }

  function handleReserveClick() {
    setShowForm(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  }

  return (
    <div className="min-h-screen text-white">
      <AnimatePresence>
        {!showForm && (
          <motion.section
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6 }}
            className="min-h-screen flex items-center justify-center"
            style={{
              backgroundImage: `url(${destination.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-black/55" />
            <div className="relative z-10 max-w-4xl p-8 text-center">
                <Link to="/" className="fixed top-4 left-4 z-50 bg-black/60 text-gray-100 px-3 py-1 rounded-md hover:bg-black/80">← Retour</Link>
              <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="font-serif text-5xl md:text-6xl mb-4">
                {destination.title}
              </motion.h1>
              <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.35 }} className="text-gray-200 mb-8">
                {destination.description}
              </motion.p>
              <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.5 }}>
                <button onClick={handleReserveClick} className="px-8 py-3 bg-gold text-charcoal-dark font-semibold">
                  Réserver
                </button>
              </motion.div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {showForm && (
        <div ref={formRef} className="py-16 bg-charcoal">
          <div className="max-w-4xl mx-auto p-8">
            <AnimatePresence>
              {showForm && (
                <motion.div key="form" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} transition={{ duration: 0.4 }} className="bg-black/40 p-8 rounded-md">
                  <h2 className="font-serif text-3xl mb-2">Réserver — {destination.title}</h2>
                  <p className="text-gray-200 mb-6">{destination.description}</p>

                  <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-100">Nom</label>
                      <input value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 w-full p-2 rounded-sm text-black" />
                    </div>

                    <div>
                      <label className="text-sm text-gray-100">Email</label>
                      <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required className="mt-1 w-full p-2 rounded-sm text-black" />
                    </div>

                    <div>
                      <label className="text-sm text-gray-100">Date</label>
                      <input value={date} onChange={(e) => setDate(e.target.value)} type="date" required className="mt-1 w-full p-2 rounded-sm text-black" />
                    </div>

                    <div>
                      <label className="text-sm text-gray-100">Nombre de voyageurs</label>
                      <input value={people} onChange={(e) => setPeople(Number(e.target.value))} type="number" min={1} className="mt-1 w-full p-2 rounded-sm text-black" />
                    </div>

                    <div className="md:col-span-2 flex items-center gap-4">
                      <button type="submit" className="px-6 py-3 bg-gold text-charcoal-dark font-semibold">Confirmer la réservation</button>
                      <button type="button" onClick={() => setShowForm(false)} className="text-gray-100 underline">Retour</button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}
