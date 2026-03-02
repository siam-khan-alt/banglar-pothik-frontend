import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { 
  ArrowLeft, ArrowRight, MapPin, Utensils, Bird, 
  Wheat, Info, Loader2, ChevronLeft, ChevronRight 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SeasonalLoader from '../components/shared/SeasonalLoader';

const SeasonDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { lang } = useLanguage();

  const { data: allSeasons, isLoading, isError } = useQuery({
    queryKey: ['seasons'],
    queryFn: async () => {
      const response = await fetch('/seasons.json');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data.seasons;
    },
  });

  const season = allSeasons?.find((s) => s.id === id);
  const currentIndex = allSeasons?.findIndex((s) => s.id === id);

  const prevSeason = allSeasons?.[(currentIndex - 1 + 6) % 6];
  const nextSeason = allSeasons?.[(currentIndex + 1) % 6];

  if (isLoading) return <SeasonalLoader />;

  if (isError || !season) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold text-red-600">Data not found!</h2>
        <button onClick={() => navigate('/')} className="mt-4 text-nature-green underline">Go Home</button>
      </div>
    );
  }

  return (
    <div className=" bg-pothik-bg text-earth-brown font-bengali pb-12">
      {/* Banner Section */}
      <div className="relative h-[45vh] md:h-[60vh] w-full overflow-hidden">
        <img 
          src={season.card_img} 
          alt={season.name[lang]} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white px-4">
          <span className="bg-harvest-gold text-earth-brown px-4 py-1 rounded-full text-sm font-bold mb-3">
            {season.period[lang]}
          </span>
          <h1 className="text-5xl md:text-7xl font-bold drop-shadow-md">
            {season.name[lang]}
          </h1>
          <p className="text-lg md:text-xl opacity-90 tracking-widest uppercase mt-2">
            {season.name.en}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 -mt-12 relative z-10">
        {/* Main Description */}
        <div className="bg-white p-6 md:p-10 rounded-2xl shadow-lg border border-stone-100">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-8 bg-nature-green rounded-full"></div>
            <h2 className="text-2xl font-bold text-nature-green">
              {lang === 'bn' ? 'ঋতু বৈচিত্র্য' : 'Seasonal Essence'}
            </h2>
          </div>
          <p className="text-lg leading-relaxed text-justify text-earth-brown/90">
            {season.description[lang]}
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm">
            <div className="flex items-center gap-3 mb-3 text-nature-green">
              <Info size={24} />
              <h3 className="text-xl font-bold">{lang === 'bn' ? 'প্রকৃতির রূপ' : 'Nature'}</h3>
            </div>
            <p className="leading-relaxed">{season.nature_details[lang]}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm">
            <div className="flex items-center gap-3 mb-3 text-harvest-gold">
              <Utensils size={24} />
              <h3 className="text-xl font-bold">{lang === 'bn' ? 'খাবার ও ফল' : 'Foods'}</h3>
            </div>
            <p className="leading-relaxed">{season.foods[lang]}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm">
            <div className="flex items-center gap-3 mb-3 text-earth-brown">
              <Wheat size={24} />
              <h3 className="text-xl font-bold">{lang === 'bn' ? 'কৃষি ও জীবন' : 'Agri & Life'}</h3>
            </div>
            <p className="mb-2">{season.agriculture[lang]}</p>
            <p className="text-sm  border-t pt-2 border-stone-50">
              <span className="font-bold">{lang === 'bn' ? 'জীবনধারা: ' : 'Lifestyle: '}</span>
              {season.lifestyle[lang]}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm">
            <div className="flex items-center gap-3 mb-3 text-nature-green">
              <Bird size={24} />
              <h3 className="text-xl font-bold">{lang === 'bn' ? 'পাখি ও উৎসব' : 'Birds & Fest'}</h3>
            </div>
            <p className="mb-2">{season.birds[lang]}</p>
            <p className="text-sm  border-t pt-2 border-stone-50">
              <span className="font-bold">{lang === 'bn' ? 'উৎসব: ' : 'Festivals: '}</span>
              {season.festivals[lang]}
            </p>
          </div>
        </div>

        {/* Travel Guide Card */}
        <div className="mt-6 bg-nature-green text-white p-8 rounded-2xl shadow-lg flex flex-col md:flex-row items-center gap-6">
          <div className="p-4 bg-white/10 rounded-2xl shrink-0">
            <MapPin size={40} className="text-harvest-gold" />
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-1">{lang === 'bn' ? 'ভ্রমণ গাইড' : 'Travel Guide'}</h3>
            <p className="text-xl font-medium text-harvest-gold mb-2">{season.best_places[lang]}</p>
            <p className="text-white/80 text-sm">💡 {season.travel_tips[lang]}</p>
          </div>
        </div>

        {/* Thematic Image Gallery */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-6 text-center text-nature-green">
            {lang === 'bn' ? 'ঋতুর দৃশ্যপট' : 'Visual Highlights'}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {season.images.map((img, idx) => {
              const labels = lang === 'bn' 
                ? ['প্রধান ফল', 'ফুল ও প্রকৃতি', 'ঐতিহ্যবাহী পিঠা', 'উৎসবের মুহূর্ত']
                : ['Prime Fruit', 'Nature & Flowers', 'Traditional Pitha', 'Festive Moments'];
              return (
                <div key={idx} className="relative group overflow-hidden rounded-2xl shadow-md aspect-square bg-white">
                  <img src={img} alt={labels[idx]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2 text-center">
                    <span className="text-white text-xs font-medium">{labels[idx] || 'View'}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Season Navigation Suggestion */}
        <div className="mt-16 border-t border-earth-brown/10 pt-10">
          <h4 className="text-center text-lg font-bold mb-8 opacity-70 ">
            {lang === 'bn' ? 'অন্যান্য ঋতু দেখুন' : 'Explore Other Seasons'}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Previous Season */}
            <div 
              onClick={() => navigate(`/season/${prevSeason.id}`)}
              className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-stone-100 shadow-sm cursor-pointer hover:border-harvest-gold transition-all group"
            >
              <ChevronLeft className="group-hover:-translate-x-1 transition-transform" />
              <img src={prevSeason.card_img} className="w-16 h-16 rounded-xl object-cover" alt="" />
              <div>
                <p className="text-xs opacity-60 uppercase">{lang === 'bn' ? 'আগের ঋতু' : 'Previous'}</p>
                <p className="font-bold">{prevSeason.name[lang]}</p>
              </div>
            </div>

            {/* Next Season */}
            <div 
              onClick={() => navigate(`/season/${nextSeason.id}`)}
              className="flex items-center justify-end gap-4 p-4 bg-white rounded-2xl border border-stone-100 shadow-sm cursor-pointer hover:border-harvest-gold transition-all group text-right"
            >
              <div>
                <p className="text-xs opacity-60 uppercase">{lang === 'bn' ? 'পরের ঋতু' : 'Next'}</p>
                <p className="font-bold">{nextSeason.name[lang]}</p>
              </div>
              <img src={nextSeason.card_img} className="w-16 h-16 rounded-xl object-cover" alt="" />
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

        {/* Back Button at Bottom */}
        <div className="mt-12 text-center">
          <button 
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-8 py-3 bg-earth-brown text-white rounded-full hover:bg-nature-green transition-colors font-bold shadow-lg"
          >
            <ArrowLeft size={20} />
            {lang === 'bn' ? 'ফিরে যান' : 'Go Back'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeasonDetails;