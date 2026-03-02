import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Sun, CloudRain, Cloud, Wheat, 
  Snowflake, Flower2, ArrowRight, Loader2 
} from 'lucide-react';

// Icons mapping based on season ID
const seasonIcons = {
  grishma: <Sun className="w-8 h-8" />,
  barsha: <CloudRain className="w-8 h-8" />,
  sharat: <Cloud className="w-8 h-8" />,
  hemanta: <Wheat className="w-8 h-8" />,
  sheet: <Snowflake className="w-8 h-8" />,
  basanta: <Flower2 className="w-8 h-8" />,
};

const Seasons = () => {
  const { lang } = useLanguage();
  const navigate = useNavigate();

  // Fetching data using TanStack Query
  const { data: seasonsData, isLoading, isError } = useQuery({
    queryKey: ['seasons'],
    queryFn: async () => {
      const response = await fetch('/seasons.json');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data.seasons;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-pothik-bg">
        <Loader2 className="w-10 h-10 animate-spin text-nature-green mb-2" />
        <p className="text-earth-brown font-medium ">
          {lang === 'bn' ? 'প্রকৃতি সাজানো হচ্ছে...' : 'Loading Seasons...'}
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pothik-bg">
        <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-red-100">
          <p className="text-red-500 font-bold">
            {lang === 'bn' ? 'তথ্য লোড করতে সমস্যা হয়েছে।' : 'Failed to load season data.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-12 bg-pothik-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Header Section */}
        <div className="text-center mb-12 space-y-3">
          <h2 className="text-4xl md:text-5xl font-extrabold text-nature-green">
            {lang === 'bn' ? 'বাংলার ষড়ঋতু' : 'Six Seasons of Bengal'}
          </h2>
          <div className="w-20 h-1.5 bg-harvest-gold mx-auto rounded-full"></div>
          <p className="text-earth-brown/80 max-w-2xl mx-auto text-lg leading-relaxed">
            {lang === 'bn' 
              ? 'প্রকৃতির বৈচিত্র্যে ঘেরা বাংলাদেশের ঋতুচক্রের চিরচেনা রূপ অন্বেষণ করুন।' 
              : 'Explore the eternal beauty of the seasonal cycle of Bangladesh.'}
          </p>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {seasonsData?.map((season) => (
            <div 
              key={season.id}
              onClick={() => navigate(`/season/${season.id}`)}
              className="group relative h-[380px] rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1"
            >
              {/* Season Background Image */}
              <img 
                src={season.card_img} 
                alt={season.name[lang]} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              
              {/* Thematic Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t ${season.color} via-earth-brown/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500`}></div>
     
              {/* Content Overlay */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                <div className="flex items-center gap-4 mb-2">
                  {/* Icon Container */}
                  <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 group-hover:bg-harvest-gold group-hover:text-earth-brown transition-all duration-500">
                    {seasonIcons[season.id]}
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold tracking-tight">
                      {season.name[lang]}
                    </h3>
                    <p className="text-xs uppercase tracking-[0.2em] opacity-90 font-bold text-harvest-gold">
                       {season.period[lang]}
                    </p>
                  </div>
                </div>
                
                {/* Reveal on Hover: CTA */}
                <div className="h-0 group-hover:h-6 overflow-hidden transition-all duration-500">
                   <span className="flex items-center gap-2 text-sm font-bold text-white">
                    {lang === 'bn' ? 'বিস্তারিত তথ্য পড়ুন' : 'View Details'} 
                    <ArrowRight size={16} className="animate-pulse" />
                  </span>
                </div>
              </div>

              {/* Decorative Inner Border */}
              <div className="absolute inset-3 border border-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Seasons;