import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home, RefreshCcw, Map, Leaf } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ErrorPage = () => {
  const { lang } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FDFCF8] flex flex-col items-center justify-center p-6 text-center overflow-hidden relative">
      
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 800 800">
          <path d="M0,400 Q200,300 400,400 T800,400" fill="none" stroke="#2D5A27" strokeWidth="2" />
          <path d="M0,500 Q200,400 400,500 T800,500" fill="none" stroke="#2D5A27" strokeWidth="1" />
        </svg>
      </div>

      <div className="relative mb-8">
        <motion.h1 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-[12rem] md:text-[15rem] font-black text-nature-green/10 leading-none select-none"
        >
          404
        </motion.h1>
        
        <motion.div 
          animate={{ 
            y: [0, -20, 0],
            rotate: [-5, 5, -5]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="bg-white p-6 2xl shadow-2xl border-2 border-harvest-gold/20 flex flex-col items-center">
            <Map size={48} className="text-harvest-gold mb-2" />
            <div className="h-1 w-12 bg-nature-green/20 rounded-full" />
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="relative z-10"
      >
        <h2 className="text-3xl md:text-4xl font-black font-bengali text-nature-green mb-4">
          {lang === 'bn' ? 'পথ হারিয়ে ফেলেছেন?' : 'Lost your way?'}
        </h2>
        <p className="text-earth-brown/70 max-w-md mx-auto mb-10 font-medium leading-relaxed">
          {lang === 'bn' 
            ? 'আপনি যে পথটি খুঁজছেন তা এখন আর প্রকৃতিতে নেই। হয়তো এটি অন্য কোনো ঋতুতে ছিল!' 
            : "The path you are looking for doesn't exist in this nature. Perhaps it belonged to another season!"}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="group flex items-center gap-2 bg-nature-green text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-nature-green/20 hover:scale-105 transition-all active:scale-95"
          >
            <Home size={20} />
            {lang === 'bn' ? 'নীড়ে ফিরুন' : 'Go Home'}
          </button>

          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 bg-white text-nature-green border-2 border-nature-green/10 px-8 py-4 rounded-2xl font-bold hover:bg-nature-green/5 transition-all active:scale-95"
          >
            <RefreshCcw size={20} />
            {lang === 'bn' ? 'আবার চেষ্টা করুন' : 'Try Again'}
          </button>
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 w-full opacity-20 flex justify-between px-10 pointer-events-none">
        <Leaf size={100} className="text-nature-green -rotate-45 translate-y-10" />
        <Leaf size={80} className="text-nature-green rotate-12 translate-y-12" />
      </div>

    </div>
  );
};

export default ErrorPage;