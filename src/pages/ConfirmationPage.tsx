import React from 'react';
import { useLocation, Link } from 'react-router-dom';

export default function ConfirmationPage() {
  const location = useLocation();
  // booking may come from navigate state
  const booking = (location.state as any) || null;

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-charcoal-dark text-white">
        <div className="text-center p-8">
          <h2 className="text-3xl font-serif mb-4">Aucune réservation trouvée</h2>
          <p className="text-gray-300 mb-6">Il semble que vous n'ayez pas fait de réservation depuis l'application.</p>
          <Link to="/" className="px-6 py-2 bg-gold text-charcoal-dark font-semibold">Retour à l'accueil</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-charcoal-dark text-white">
      <div className="max-w-3xl p-8 bg-black/40 rounded-md">
        <h1 className="font-serif text-4xl mb-4">Réservation confirmée</h1>
        <p className="text-gray-200 mb-6">Merci {booking.name}, votre réservation pour <strong>{booking.destinationTitle}</strong> a bien été enregistrée.</p>

        <ul className="text-gray-200 mb-6 space-y-2">
          <li><strong>Date :</strong> {booking.date || 'Non précisée'}</li>
          <li><strong>Nombre de voyageurs :</strong> {booking.people}</li>
          <li><strong>Email :</strong> {booking.email}</li>
        </ul>

        <div className="flex gap-4">
          <Link to="/" className="px-6 py-2 bg-gold text-charcoal-dark font-semibold">Retour à l'accueil</Link>
          <Link to={`/destination/${booking.destinationId}`} className="px-6 py-2 border border-gold text-gold">Voir la destination</Link>
        </div>
      </div>
    </div>
  );
}
