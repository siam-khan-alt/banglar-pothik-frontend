import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { Leaf, Sun, CloudRain, Cloud, Wheat, Snowflake } from 'lucide-react';

const seasonalData = [
  { id: "grishma", img: "https://www.goodnet.org/photos/620x0/44706_hd.jpg", icon: <Sun size={12} />, color: "#F59E0B" },
  { id: "barsha", img: "https://sagir42.wordpress.com/wp-content/uploads/2019/10/61e18-rainy-wallpaper7.jpg", icon: <CloudRain size={12} />, color: "#3B82F6" },
  { id: "sharat", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb-nQlCYt5jtwdonY4BgXc6VB3qd21Aqi4Ng&s", icon: <Cloud size={12} />, color: "#0EA5E9" },
  { id: "hemanta", img: "https://www.bssnews.net/assets/news_photos/2025/11/23/image-334827-1763894190.jpg", icon: <Wheat size={12} />, color: "#D97706" },
  { id: "sheet", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAqwdnF7OC08ipZ7PaWiXEXFd9Y54CVIab4A&s", icon: <Snowflake size={12} />, color: "#2563EB" },
  { id: "basanta", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9ovba1w0OXvbICIJw0tgi6oItPRZqSxi9aQ&s", icon: <Leaf size={12} />, color: "#10B981" },
];

const SeasonalLoader = () => {
  const { lang } = useLanguage();

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#FDFCF8] z-50 overflow-hidden">
      
      <div className="absolute w-[500px] h-[500px] bg-nature-green/5 rounded-full blur-[120px]" />
      <div className="absolute w-[300px] h-[300px] bg-harvest-gold/5 rounded-full blur-[80px] -bottom-20" />

      <div className="relative flex items-center justify-center w-80 h-80">
        
        <div className="relative z-30 text-center">
          <motion.div
            animate={{ y: [-2, 2, -2] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <h1 className="relative text-3xl md:text-4xl font-black font-bengali tracking-tighter"
                style={{
                  background: 'linear-gradient(180deg, #2D5A27 30%, #1e3a8a 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0px 10px 15px rgba(0,0,0,0.15))',
                }}>
              {lang === 'bn' ? 'বাংলার পথিক' : 'Banglar Pothik'}
              <span className="absolute left-0 top-[2px] w-full text-black/5 blur-[1px] -z-10 select-none">
                {lang === 'bn' ? 'বাংলার পথিক' : 'Banglar Pothik'}
              </span>
            </h1>
            <motion.div 
               initial={{ width: 0 }}
               animate={{ width: "60%" }}
               className="h-1 mx-auto bg-gradient-to-r from-transparent via-harvest-gold to-transparent mt-2 rounded-full opacity-70" 
            />
          </motion.div>
        </div>

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {seasonalData.map((item, index) => (
            <div
              key={item.id}
              className="absolute"
              style={{
                transform: `rotate(${index * 60}deg) translate(115px) rotate(-${index * 60}deg)`,
              }}
            >
              <motion.div 
                className="relative"
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              >
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className="w-14 h-14 rounded-2xl p-[2px] bg-gradient-to-br from-white to-stone-200 shadow-xl overflow-hidden"
                >
                  <div className="w-full h-full rounded-2xl overflow-hidden border border-black/5">
                    <img src={item.img} alt="Season" className="w-full h-full object-cover" />
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-lg flex items-center justify-center shadow-lg border border-white text-white z-20"
                  style={{ backgroundColor: item.color }}
                >
                  {item.icon}
                </motion.div>
              </motion.div>
            </div>
          ))}
        </motion.div>

        <div className="absolute w-[230px] h-[230px] border border-stone-200 rounded-full" />
        <div className="absolute w-[230px] h-[230px] border-t-2 border-harvest-gold/30 rounded-full animate-spin [animation-duration:8s]" />
      </div>

      <div className="mt-6 text-center z-20">
        <motion.p 
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-stone-400 text-[10px] font-bold uppercase tracking-[0.8em]"
        >
          {lang === 'bn' ? 'আবহমান বাংলা' : 'Eternal Bengal'}
        </motion.p>
        
   
        <div className="mt-4 w-32 h-[2px] bg-stone-100 mx-auto rounded-full overflow-hidden">
          <motion.div 
            animate={{ x: [-128, 128] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1/2 h-full bg-gradient-to-r from-transparent via-nature-green to-transparent"
          />
        </div>
      </div>

    </div>
  );
};

export default SeasonalLoader;