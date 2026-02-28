import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Search, MapPin } from 'lucide-react';

const heritageItems = [
  { id: 1, name: 'নদীমাতৃক বাংলা', img: 'https://i.ibb.co.com/WWZvrHd7/image.png', angle: '0deg' },
  { id: 2, name: 'সোনালী ধানক্ষেত', img: 'https://i.ibb.co.com/fVTyMCZr/image.png', angle: '60deg' },
  { id: 3, name: 'ধান ওড়ানো', img: 'https://i.ibb.co.com/k7S93pp/image.png', angle: '120deg' },
  { id: 4, name: 'সুন্দরবন', img: 'https://i.ibb.co.com/0R0MsHvF/image.png', angle: '180deg' },
  { id: 5, name: 'পার্বত্য উৎসব', img: 'https://i.ibb.co.com/mV3hfrLG/image.png', angle: '240deg' },
  { id: 6, name: 'মেঠো পথ', img: 'https://i.ibb.co.com/jPXdgD40/image.png', angle: '300deg' },
];

const Hero = () => {
  const { lang } = useLanguage();

  return (
    <section className="relative min-h-[70vh] bg-pothik-bg flex items-center overflow-hidden py-10 md:py-16">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-nature-green/5 rounded-l-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
        
        {/* Left Side: Text Content */}
        <div className="space-y-8 md:space-y-16 z-20 text-center lg:text-left">
          <div className="space-y-4 lg:space-x-8">
            <h2 className="flex items-center justify-center lg:justify-start gap-2 text-harvest-gold font-bold tracking-widest uppercase text-sm">
              <MapPin size={18} />
              {lang === 'bn' ? 'শিকড়ের সন্ধানে অন্বেষণ' : 'Exploring the Roots'}
            </h2>
            <h1 className="text-4xl md:text-6xl font-extrabold text-nature-green leading-tight">
              {lang === 'bn' ? 'বাংলার প্রতিটি পথেই লুকিয়ে আছে এক একটি গল্প' : 'Every path in Bengal hides a story'}
            </h1>
            <p className="text-earth-brown text-lg max-w-xl opacity-90 leading-relaxed font-medium">
              {lang === 'bn' 
                ? 'বাংলাদেশের ৬৪টি জেলার ঐতিহ্য, সংস্কৃতি আর মানুষের জীবনগাথা নিয়ে আমাদের এই যাত্রা।' 
                : 'A journey through the heritage, culture, and life stories of 64 districts of Bangladesh.'}
            </p>
          </div>

          {/* Search Bar */}
          <div className="flex items-center bg-white p-2 rounded-2xl shadow-2xl max-w-lg border-2 border-nature-green/10 focus-within:border-nature-green transition-all mx-auto lg:mx-0">
            <input 
              type="text" 
              placeholder={lang === 'bn' ? "আপনার জেলা খুঁজুন..." : "Search your district..."}
              className="flex-grow p-4 outline-none text-earth-brown font-medium bg-transparent"
            />
            <button className="bg-nature-green text-pothik-bg px-4 py-4 rounded-xl font-bold hover:bg-harvest-gold hover:text-earth-brown transition-all duration-300">
              {lang === 'bn' ? 'খুঁজুন' : 'Search'}
            </button>
          </div>
        </div>

        {/* Right Side: Rotating Orbit & Map Beneath */}
        <div className="relative flex items-center justify-center h-[450px] md:h-[550px] pause-on-hover">
          
          {/* 1. Map Center */}
          <div className="absolute z-0 w-[300px] md:w-[480px] transform opacity-80 pointer-events-none">
            <img 
              src="https://i.ibb.co.com/hJpysg5n/image.png" 
              alt="Bangladesh Map" 
              className="w-full h-auto "
            />
          </div>

          {/* 2. Orbit Container  */}
          <div className="absolute z-10 w-[220px] h-[220px] md:w-[300px] md:h-[300px] lg:w-[480px] lg:h-[480px] animate-orbit border-[1.5px] border-nature-green/10 rounded-full">
            {heritageItems.map((item) => (
              <div
                key={item.id}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                  transform: `rotate(${item.angle}) translate(${window.innerWidth < 768 ? '160px' : '240px'})`,
                }}
              >
                {/* 3. Image Circles */}
                <div className="animate-counter-orbit group relative">
                  <div className="w-14 h-14 md:w-24 md:h-24 rounded-full border-[3px] border-harvest-gold bg-white overflow-hidden shadow-xl transition-all duration-500 group-hover:scale-125 group-hover:border-nature-green ring-4 ring-pothik-bg/50">
                    <img 
                      src={item.img} 
                      alt={item.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  
                  {/* Tooltip */}
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-nature-green text-pothik-bg text-[10px] md:text-xs px-3 py-1 rounded-full font-bold opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap shadow-md">
                    {item.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;