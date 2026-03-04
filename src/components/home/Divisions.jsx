import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '../../context/LanguageContext';
import { Map, ArrowRight, Loader2 } from 'lucide-react';
import axiosInstance from '../../api/axiosInstance';
import SeasonalLoader from '../shared/SeasonalLoader';

const Divisions = () => {
  const { lang } = useLanguage();
  const navigate = useNavigate();

  const { data: divisions, isLoading, isError } = useQuery({
    queryKey: ['divisions'],
    queryFn: async () => {
      const res = await axiosInstance.get('/divisions');
      return res.data;
    },
  });


  return (
    <section className="pb-12 pt-6 bg-pothik-bg">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Header Section */}
        <div className="text-center mb-12 space-y-3">
          <h2 className="text-4xl md:text-5xl font-extrabold text-nature-green">
            {lang === 'bn' ? 'প্রশাসনিক বিভাগসমূহ' : 'Administrative Divisions'}
          </h2>
          <div className="w-20 h-1.5 bg-harvest-gold mx-auto rounded-full"></div>
          <p className="text-earth-brown/80 max-w-2xl mx-auto text-lg leading-relaxed">
            {lang === 'bn' 
              ? 'বাংলার প্রতিটি প্রান্তের প্রশাসনিক বৈচিত্র্য ও সৌন্দর্য খুঁজে নিন।' 
              : 'Explore the administrative diversity and beauty of every corner of Bengal.'}
          </p>
        </div>
   {isLoading ? (
        <div className="flex flex-col items-center justify-center py-10">
            <SeasonalLoader />
            <p className="text-earth-brown font-medium mt-4 animate-pulse">
              {lang === 'bn' ? 'বিভাগগুলো সাজানো হচ্ছে...' : 'Organizing Divisions...'}
            </p>
          </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {divisions?.map((division) => (
            <div 
              key={division.id}
              onClick={() => navigate(`/division/${division.id}`)} 
              className="group relative h-[300px] rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1"
            >
              <img 
                src={division.image_url || "https://images.unsplash.com/photo-1583933931602-99539308e08d?q=80&w=2070&auto=format&fit=crop"} 
                alt={division.name} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-nature-green/90 via-earth-brown/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500"></div>
     
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 group-hover:bg-harvest-gold group-hover:text-earth-brown transition-all duration-500">
                    <Map size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight">
                      {lang === 'bn' ? division.bn_name : division.name}
                    </h3>
                    <p className="text-[10px] uppercase tracking-[0.2em] opacity-80 font-bold text-harvest-gold">
                       {lang === 'bn' ? division.name : 'Division'}
                    </p>
                  </div>
                </div>
                
                <div className="h-0 group-hover:h-6 overflow-hidden transition-all duration-500">
                   <span className="flex items-center gap-2 text-xs font-bold text-white">
                    {lang === 'bn' ? 'বিস্তারিত দেখুন' : 'View Details'} 
                    <ArrowRight size={14} className="animate-pulse" />
                  </span>
                </div>
              </div>

              <div className="absolute inset-3 border border-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            </div>
          ))}
        </div>) }
      </div>
    </section>
  );
};

export default Divisions;