import { Link, Navigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { Trees, Globe, UserCircle, Menu, X, LogOut } from "lucide-react";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";

const Navbar = () => {
  const { lang, toggleLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {user, Logout} = useContext(AuthContext); 

  const content = {
    bn: {
      logo: "বাংলার পথিক",
      tagline: "শিকড়ের সন্ধানে অন্বেষণ",
      districts: "জেলাসমূহ",
      diary: "ভ্রমণ ডায়েরি",
      contribute: "তথ্য দিন",
      login: "লগইন",
      join: "আমাদের কমিউনিটিতে যোগ দিন",
    },
    en: {
      logo: "Banglar Pothik",
      tagline: "Exploring the Roots",
      districts: "Districts",
      diary: "Travel Diary",
      contribute: "Contribute",
      login: "Login",
      join: "Join our Community",
    }
  };
  const handleLogout = () => {
    Logout()
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: t.logoutSuccess,
          showConfirmButton: false,
          timer: 1500,
          background: '#f0fdf4', 
        });
        Navigate("/");
      })
      .catch((error) => console.log(error));
  };

  const t = content[lang];

  return (
    <nav className="bg-nature-green text-pothik-bg shadow-xl sticky top-0 z-50 font-bengali">
      <div className="max-w-7xl mx-auto px-4 md:px-6 ">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <Trees className="text-harvest-gold group-hover:scale-110 transition-transform duration-300" size={38} />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold leading-none tracking-tight text-pothik-bg">
                {t.logo}
              </h1>
              <p className="text-[10px] md:text-[11px] text-harvest-gold uppercase tracking-[0.15em] mt-1 font-semibold">
                {t.tagline}
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/districts" className="hover:text-harvest-gold transition-colors font-medium">
              {t.districts}
            </Link>

            {user ? (
              <div className="flex items-center gap-6">
                <Link to="/diary" className="hover:text-harvest-gold transition">{t.diary}</Link>
               
                <Link to="/contribute" className="bg-harvest-gold text-earth-brown px-5 py-2 rounded-full font-bold hover:bg-pothik-bg transition shadow-md">
                  {t.contribute}
                </Link>
                <div className="flex items-center gap-3">
                    {user?.photoURL ? (
                        <img 
                          title={user?.displayName} 
                          className="w-10 h-10 rounded-full border-2 border-harvest-gold object-cover" 
                          src={user?.photoURL} 
                          alt="user" 
                        />
                    ) : (
                        <UserCircle size={32} className="cursor-pointer hover:text-harvest-gold transition" />
                    )}
                    
                    <button 
                      onClick={handleLogout}
                      className="flex items-center gap-1 text-sm font-bold hover:text-harvest-gold transition bg-earth-brown/20 px-3 py-2 rounded-lg"
                    >
                      <LogOut size={16} />
                      {t.logout}
                    </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-6">
                <Link to="/login" className="hover:text-harvest-gold transition font-medium">
                  {t.login}
                </Link>
                <Link 
                  to="/register" 
                  className="bg-harvest-gold text-earth-brown px-6 py-2.5 rounded-lg font-bold hover:bg-pothik-bg transition-all duration-300 shadow-lg"
                >
                  {t.join}
                </Link>
              </div>
            )}

            {/* Language Switcher */}
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 bg-earth-brown/30 px-3 py-1.5 rounded-full border border-harvest-gold/20 hover:bg-earth-brown/50 transition group"
            >
              <Globe size={16} className="text-harvest-gold group-hover:rotate-12 transition-transform" />
              <span className="text-xs font-bold uppercase tracking-wider text-pothik-bg">
                {lang === "bn" ? "EN" : "বাং"}
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button onClick={toggleLanguage} className="bg-earth-brown/30 p-2 rounded-full border border-harvest-gold/20">
               <Globe size={20} className="text-harvest-gold" />
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-harvest-gold">
              {isMenuOpen ? <X size={30} /> : <Menu size={30} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div className={`md:hidden absolute w-full bg-nature-green border-t border-harvest-gold/10 transition-all duration-300 ${isMenuOpen ? "opacity-100 block shadow-2xl" : "opacity-0 hidden"}`}>
        <div className="px-6 py-8 space-y-6">
          <Link to="/districts" onClick={() => setIsMenuOpen(false)} className="block text-xl font-medium text-pothik-bg">{t.districts}</Link>
          
          {!user ? (
            <div className="space-y-4 pt-4 border-t border-harvest-gold/10">
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block text-xl text-pothik-bg">{t.login}</Link>
              <Link to="/register" onClick={() => setIsMenuOpen(false)} className="block bg-harvest-gold text-earth-brown text-center py-3 rounded-lg font-bold">
                {t.join}
              </Link>
            </div>
          ) : (
            <div className="space-y-4 pt-4">
              <Link to="/diary" onClick={() => setIsMenuOpen(false)} className="block text-xl text-pothik-bg">{t.diary}</Link>
              <Link to="/contribute" onClick={() => setIsMenuOpen(false)} className="block text-xl text-harvest-gold font-bold">{t.contribute}</Link>
            </div>
          )}
          <div className="flex items-center gap-3">
                    {user?.photoURL ? (
                        <img 
                          title={user?.displayName} 
                          className="w-10 h-10 rounded-full border-2 border-harvest-gold object-cover" 
                          src={user?.photoURL} 
                          alt="user" 
                        />
                    ) : (
                        <UserCircle size={32} className="cursor-pointer hover:text-harvest-gold transition" />
                    )}
                    
                    {/* Logout Button */}
                    <button 
                      onClick={handleLogout}
                      className="flex items-center gap-1 text-sm font-bold hover:text-harvest-gold transition bg-earth-brown/20 px-3 py-2 rounded-lg"
                    >
                      <LogOut size={16} />
                      {t.logout}
                    </button>
                </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;