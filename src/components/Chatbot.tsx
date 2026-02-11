import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Bonjour, je suis Chronos, votre guide temporel. Comment puis-je vous aider à planifier votre voyage dans le temps?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('paris') || lowerMessage.includes('1889')) {
      return 'La Belle Époque de Paris en 1889 est une période fascinante! Vous assisterez à l\'inauguration de la Tour Eiffel et découvrirez l\'Exposition Universelle. Souhaitez-vous en savoir plus sur cette destination?';
    } else if (lowerMessage.includes('crétacé') || lowerMessage.includes('dinosaure') || lowerMessage.includes('préhistoire')) {
      return 'Le Crétacé offre une expérience incomparable avec des créatures majestueuses dans leur habitat naturel. C\'est l\'une de nos destinations les plus populaires! Êtes-vous prêt pour cette aventure?';
    } else if (lowerMessage.includes('florence') || lowerMessage.includes('renaissance') || lowerMessage.includes('1504')) {
      return 'Florence en 1504 est le cœur de la Renaissance italienne. Vous pourriez croiser Michel-Ange ou Léonard de Vinci en personne! Une période artistique exceptionnelle. Voulez-vous réserver?';
    } else if (lowerMessage.includes('prix') || lowerMessage.includes('tarif') || lowerMessage.includes('coût')) {
      return 'Nos tarifs varient selon la destination et la durée du voyage. Un conseiller peut vous fournir un devis personnalisé. Quelle époque vous intéresse le plus?';
    } else if (lowerMessage.includes('sécurité') || lowerMessage.includes('danger')) {
      return 'Votre sécurité est notre priorité absolue. Tous nos voyages temporels sont accompagnés par des guides experts et équipés des dernières technologies de protection. Vous êtes entre de bonnes mains!';
    } else if (lowerMessage.includes('bonjour') || lowerMessage.includes('salut') || lowerMessage.includes('hello')) {
      return 'Bonjour! Ravi de vous parler. Quelle période historique vous fascine le plus?';
    } else if (lowerMessage.includes('merci')) {
      return 'Je vous en prie! N\'hésitez pas si vous avez d\'autres questions sur nos voyages temporels.';
    } else {
      return 'Excellente question! Je peux vous aider à choisir parmi nos trois destinations principales: Paris 1889, le Crétacé, ou Florence 1504. Laquelle vous attire le plus?';
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: generateBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gold rounded-full flex items-center justify-center shadow-2xl hover:shadow-gold/50 transition-shadow"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6 text-charcoal-dark" strokeWidth={2.5} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6 text-charcoal-dark" strokeWidth={2.5} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 z-50 w-96 h-[500px] bg-charcoal-light rounded-lg shadow-2xl flex flex-col overflow-hidden border border-gold/20"
          >
            <div className="bg-gradient-to-r from-gold to-amber-600 p-4 flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl text-charcoal-dark font-bold">Chronos</h3>
                <p className="font-sans text-sm text-charcoal-dark/80">Guide Temporel</p>
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-charcoal">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[75%] p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-gold text-charcoal-dark'
                        : 'bg-charcoal-light text-gray-200 border border-gold/20'
                    }`}
                  >
                    <p className="font-sans text-sm leading-relaxed">{message.text}</p>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-charcoal-light text-gray-200 border border-gold/20 p-3 rounded-lg">
                    <div className="flex gap-1">
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                        className="w-2 h-2 bg-gold rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        className="w-2 h-2 bg-gold rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                        className="w-2 h-2 bg-gold rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-charcoal-light border-t border-gold/20">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Posez votre question..."
                  className="flex-1 bg-charcoal text-white px-4 py-2 rounded-lg border border-gold/30 focus:outline-none focus:border-gold font-sans text-sm"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendMessage}
                  className="bg-gold text-charcoal-dark p-2 rounded-lg hover:bg-amber-500 transition-colors"
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
