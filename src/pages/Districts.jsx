import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import axiosInstance from "../api/axiosInstance";
import { Search, Loader2 } from "lucide-react";
import DistrictCard from "../components/card/DistrictCard";
import SeasonalLoader from "../components/shared/SeasonalLoader";


const Districts = () => {
  const { lang } = useLanguage();
  const [districts, setDistricts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const content = {
    bn: {
      title: "৬৪ জেলার ইতিহাস ও ঐতিহ্য",
      placeholder: "আপনার জেলা খুঁজুন...",
      viewMore: "বিস্তারিত দেখুন",
      loading: "তথ্য লোড হচ্ছে...",
      noResult: "কোনো জেলা পাওয়া যায়নি"
    },
    en: {
      title: "History and Heritage of 64 Districts",
      placeholder: "Search your district...",
      viewMore: "View Details",
      loading: "Loading data...",
      noResult: "No district found"
    }
  };

  const t = content[lang];

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const res = await axiosInstance.get("/districts");
        setDistricts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDistricts();
  }, []);

  const filteredDistricts = districts.filter(d => 
    d.bn_name.includes(searchTerm) || d.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 min-h-screen">
      {/* Header & Search */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold text-nature-green mb-6 tracking-tight">
          {t.title}
        </h2>
        <div className="relative max-w-md mx-auto group">
          <input 
            type="text" 
            placeholder={t.placeholder}
            className="w-full px-12 py-4 rounded-2xl bg-white border-2 border-nature-green/10 focus:border-nature-green outline-none shadow-sm transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-nature-green/40 group-focus-within:text-nature-green" size={20} />
        </div>
      </div>
    {loading ? (
        <div className="flex justify-center items-center py-20">
          <SeasonalLoader />
        </div>
      ) : (
      <> 
      {/* District Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredDistricts.map(district => (
          <DistrictCard 
            key={district.id} 
            district={district} 
            lang={lang} 
            tViewMore={t.viewMore} 
          />
        ))}
      </div></>)}

      {/* No Result */}
      {filteredDistricts.length === 0 && (
        <div className="text-center py-20 opacity-40">
            <Search size={60} className="mx-auto mb-4" />
            <p className="text-xl">{t.noResult}</p>
        </div>
      )}
    </div>
  );
};

export default Districts;