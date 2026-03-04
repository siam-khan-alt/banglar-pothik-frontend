import { MapPin, ArrowRight, Image as ImageIcon } from "lucide-react";
import { Link } from "react-router-dom";

const DistrictCard = ({ district, lang, tViewMore }) => {
 
  const initial = lang === "bn" ? district.bn_name.charAt(0) : district.name.charAt(0);

  return (
    <Link to={`/district/${district.id}`} className="block">
      <div className="bg-white rounded-2xl shadow-sm border border-nature-green/5 hover:shadow-2xl hover:shadow-nature-green/10 hover:-translate-y-2 transition-all duration-500 cursor-pointer group relative overflow-hidden h-full ">
        
        {/* Image / Placeholder Section */}
        <div className="relative h-48 w-full overflow-hidden bg-pothik-bg flex items-center justify-center">
          {district.image_url ? (
            <img 
              src={district.image_url} 
              alt={district.name} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-nature-green/20">
              <span className="text-6xl font-bold opacity-10 group-hover:scale-125 transition-transform duration-700">
                {initial}
              </span>
              <ImageIcon className="absolute opacity-5" size={80} />
            </div>
          )}
          
          {/* Badge: Division Name */}
          <div className="absolute top-4 left-4 bg-nature-green/80 backdrop-blur-md text-pothik-bg text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider">
            {lang === "bn" ? "জেলা" : "District"}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 relative">
          <div className="absolute -top-8 right-6 bg-harvest-gold w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg  transition-transform duration-300">
            <MapPin className="text-white" size={24} />
          </div>

          <div className="mb-6">
            <h3 className="text-2xl font-bold text-earth-brown mb-1 group-hover:text-nature-green transition-colors">
              {lang === "bn" ? district.bn_name : district.name}
            </h3>
            <p className="text-nature-green/60 font-medium text-xs uppercase tracking-[0.2em]">
              {lang === "bn" ? district.name : district.bn_name}
            </p>
          </div>

          {/* Action Area */}
          <div className="flex items-center justify-between pt-4 border-t border-nature-green/5">
            <div className="flex items-center gap-2 text-[11px] font-black text-harvest-gold uppercase tracking-tighter group-hover:gap-4 transition-all">
              <span>{tViewMore}</span>
              <ArrowRight size={14} strokeWidth={3} />
            </div>
            
            {/* Simple Stats Placeholder (Optional) */}
            <div className="text-[10px] text-earth-brown/40 font-bold">
              {district.lat.slice(0, 5)}° N
            </div>
          </div>
        </div>

        {/* Hover Border Effect */}
        <div className="absolute bottom-0 left-0 w-0 h-1.5 bg-harvest-gold group-hover:w-full transition-all duration-700"></div>
      </div>
    </Link>
  );
};

export default DistrictCard;