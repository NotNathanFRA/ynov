import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Leaf, Palette, ArrowRight, RotateCcw } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: {
    text: string;
    value: 'paris' | 'cretace' | 'florence';
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    question: 'Quel type d\'expérience recherchez-vous?',
    options: [
      { text: 'Culture et raffinement urbain', value: 'paris' },
      { text: 'Aventure et nature sauvage', value: 'cretace' },
      { text: 'Art et créativité', value: 'florence' },
    ],
  },
  {
    id: 2,
    question: 'Quelle ambiance vous attire le plus?',
    options: [
      { text: 'Élégance et sophistication', value: 'paris' },
      { text: 'Mystère et découverte', value: 'cretace' },
      { text: 'Inspiration et beauté', value: 'florence' },
    ],
  },
  {
    id: 3,
    question: 'Quel souvenir aimeriez-vous rapporter?',
    options: [
      { text: 'Une soirée à l\'Opéra', value: 'paris' },
      { text: 'Une rencontre avec la faune préhistorique', value: 'cretace' },
      { text: 'Un atelier avec un maître artiste', value: 'florence' },
    ],
  },
  {
    id: 4,
    question: 'Comment décririez-vous votre personnalité?',
    options: [
      { text: 'Raffiné et sociable', value: 'paris' },
      { text: 'Audacieux et curieux', value: 'cretace' },
      { text: 'Créatif et contemplatif', value: 'florence' },
    ],
  },
];

const destinations = {
  paris: {
    name: 'Paris 1889',
    era: 'Belle Époque',
    description: 'Votre âme raffinée trouvera son bonheur dans le Paris de la Belle Époque. Les lumières, la culture et l\'élégance vous attendent.',
    icon: Sparkles,
    color: 'text-amber-400',
    gradient: 'from-amber-900/50 to-charcoal',
  },
  cretace: {
    name: 'Crétacé',
    era: 'Préhistoire',
    description: 'Votre esprit d\'aventure vous appelle vers le Crétacé. Préparez-vous à explorer un monde perdu et fascinant.',
    icon: Leaf,
    color: 'text-emerald-400',
    gradient: 'from-emerald-900/50 to-charcoal',
  },
  florence: {
    name: 'Florence 1504',
    era: 'Renaissance',
    description: 'Votre sensibilité artistique s\'épanouira à Florence. La Renaissance et ses génies vous tendent les bras.',
    icon: Palette,
    color: 'text-rose-400',
    gradient: 'from-rose-900/50 to-charcoal',
  },
};

export default function Quiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResult(true);
    }
  };

  const getRecommendation = () => {
    const counts = answers.reduce(
      (acc, answer) => {
        acc[answer] = (acc[answer] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    const recommendation = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as keyof typeof destinations;
    return destinations[recommendation];
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers([]);
    setShowResult(false);
  };

  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <section id="quiz" className="py-24 px-4 bg-charcoal-dark">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">
            Trouvez votre destination idéale
          </h2>
          <p className="font-sans text-lg text-gray-400">
            Répondez à quelques questions pour découvrir l'époque qui vous correspond
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="bg-charcoal-light rounded-lg p-8 border border-gold/20"
            >
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-sans text-sm text-gray-400">
                    Question {currentStep + 1} sur {questions.length}
                  </span>
                  <span className="font-sans text-sm text-gold">{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-charcoal h-2 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                    className="h-full bg-gradient-to-r from-gold to-amber-600"
                  />
                </div>
              </div>

              <h3 className="font-serif text-2xl md:text-3xl text-white mb-8">
                {questions[currentStep].question}
              </h3>

              <div className="space-y-4">
                {questions[currentStep].options.map((option, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(option.value)}
                    className="w-full p-5 bg-charcoal text-left rounded-lg border border-gold/30 hover:border-gold hover:bg-charcoal-dark transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-sans text-lg text-gray-200 group-hover:text-white">
                        {option.text}
                      </span>
                      <ArrowRight className="w-5 h-5 text-gold opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-2 transition-all" />
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className={`bg-gradient-to-br ${getRecommendation().gradient} rounded-lg p-8 md:p-12 border border-gold/30 relative overflow-hidden`}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold opacity-5 rounded-full blur-3xl" />

              <div className="relative z-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="mb-6 flex justify-center"
                >
                  {(() => {
                    const Icon = getRecommendation().icon;
                    return <Icon className={`w-16 h-16 ${getRecommendation().color}`} strokeWidth={1.5} />;
                  })()}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-center mb-8"
                >
                  <span className={`font-sans text-sm tracking-widest ${getRecommendation().color} uppercase mb-2 block`}>
                    {getRecommendation().era}
                  </span>
                  <h3 className="font-serif text-4xl md:text-5xl text-white mb-4">
                    {getRecommendation().name}
                  </h3>
                  <p className="font-sans text-lg text-gray-300 leading-relaxed max-w-xl mx-auto">
                    {getRecommendation().description}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-8 py-3 bg-gold text-charcoal-dark font-semibold rounded-lg hover:bg-amber-500 transition-colors font-sans"
                  >
                    Explorer cette destination
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={resetQuiz}
                    className="px-8 py-3 bg-transparent text-white font-semibold rounded-lg border-2 border-white/30 hover:border-white transition-colors font-sans flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Recommencer
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
