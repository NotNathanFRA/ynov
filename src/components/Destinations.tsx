import { motion } from 'framer-motion';
import { Sparkles, Leaf, Palette } from 'lucide-react';

const destinations = [
  {
    id: 'paris-1889',
    title: 'Paris 1889',
    era: 'Belle Époque',
    description: 'Découvrez la splendeur de l\'Exposition Universelle et l\'inauguration de la Tour Eiffel. Promenez-vous dans les boulevards illuminés de la capitale française.',
    icon: Sparkles,
    gradient: 'from-amber-900 to-charcoal-dark',
    accentColor: 'text-amber-400',
  },
  {
    id: 'cretace',
    title: 'Crétacé',
    era: 'Préhistoire',
    description: 'Explorez une terre primitive, peuplée de créatures majestueuses. Observez les dinosaures dans leur habitat naturel et découvrez la jungle luxuriante.',
    icon: Leaf,
    gradient: 'from-emerald-900 to-charcoal-dark',
    accentColor: 'text-emerald-400',
  },
  {
    id: 'florence-1504',
    title: 'Florence 1504',
    era: 'Renaissance',
    description: 'Rencontrez les plus grands artistes de la Renaissance. Assistez à la création des chefs-d\'œuvre de Michel-Ange et de Léonard de Vinci.',
    icon: Palette,
    gradient: 'from-rose-900 to-charcoal-dark',
    accentColor: 'text-rose-400',
  },
];

export default function Destinations() {
  return (
    <section id="destinations" className="py-24 px-4 bg-charcoal">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-6xl text-white mb-4">
            Nos Destinations
          </h2>
          <p className="font-sans text-lg text-gray-400">
            Choisissez votre époque et commencez l'aventure
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden bg-charcoal-light rounded-sm cursor-pointer"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${destination.gradient} opacity-60 group-hover:opacity-80 transition-opacity duration-500`}
              />

              <div className="relative p-8 h-full flex flex-col min-h-[400px]">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="mb-6"
                >
                  <destination.icon
                    className={`w-12 h-12 ${destination.accentColor}`}
                    strokeWidth={1.5}
                  />
                </motion.div>

                <div className="mb-2">
                  <span className={`font-sans text-sm tracking-widest ${destination.accentColor} uppercase`}>
                    {destination.era}
                  </span>
                </div>

                <h3 className="font-serif text-3xl text-white mb-4 group-hover:text-gold transition-colors duration-300">
                  {destination.title}
                </h3>

                <p className="font-sans text-gray-300 leading-relaxed mb-6 flex-grow">
                  {destination.description}
                </p>

                <motion.button
                  whileHover={{ x: 5 }}
                  className="font-sans text-gold flex items-center gap-2 text-sm font-semibold tracking-wide group/btn"
                >
                  Découvrir
                  <motion.span
                    initial={{ x: 0 }}
                    className="group-hover/btn:translate-x-2 transition-transform"
                  >
                    →
                  </motion.span>
                </motion.button>

                <div className="absolute top-0 right-0 w-32 h-32 bg-gold opacity-0 group-hover:opacity-10 rounded-full blur-3xl transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
