import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { Trees, Facebook, Youtube, Instagram, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  const { lang } = useLanguage();

  const content = {
    bn: {
      about: "বাংলার পথিক একটি ডিজিটাল প্ল্যাটফর্ম যা বাংলাদেশের ৬৪টি জেলার লুকানো সৌন্দর্য এবং ঐতিহ্যকে তুলে ধরে। আমাদের লক্ষ্য শিকড়ের সন্ধান করা।",
      quickLinks: "দ্রুত লিঙ্ক",
      contact: "যোগাযোগ",
      districts: "জেলাসমূহ",
      diary: "ভ্রমণ ডায়েরি",
      contribute: "তথ্য দিন",
      rights: "© ২০২৬ বাংলার পথিক। সর্বস্বত্ব সংরক্ষিত।",
      developedBy: "নির্মাণে: বাংলার পথিক"
    },
    en: {
      about: "Banglar Pothik is a digital platform showcasing the hidden beauty and heritage of all 64 districts of Bangladesh. Our mission is to explore the roots.",
      quickLinks: "Quick Links",
      contact: "Contact Us",
      districts: "Districts",
      diary: "Travel Diary",
      contribute: "Contribute",
      rights: "© 2026 Banglar Pothik. All rights reserved.",
      developedBy: "Developed by: Banglar Pothik"
    }
  };

  const t = content[lang];

  return (
    <footer className="bg-earth-brown text-pothik-bg pt-16 pb-8 font-bengali">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Brand Section */}
        <div className="space-y-4">
          <Link to="/" className="flex items-center gap-2">
            <Trees className="text-harvest-gold" size={32} />
            <span className="text-2xl font-bold text-pothik-bg">
              {lang === "bn" ? "বাংলার পথিক" : "Banglar Pothik"}
            </span>
          </Link>
          <p className="text-sm leading-relaxed opacity-80">
            {t.about}
          </p>
          <div className="flex gap-4 pt-2">
            <Facebook className="hover:text-harvest-gold cursor-pointer transition" size={20} />
            <Youtube className="hover:text-harvest-gold cursor-pointer transition" size={20} />
            <Instagram className="hover:text-harvest-gold cursor-pointer transition" size={20} />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-harvest-gold text-lg font-bold mb-6 underline underline-offset-8 decoration-nature-green">
            {t.quickLinks}
          </h3>
          <ul className="space-y-4 text-sm font-medium">
            <li><Link to="/districts" className="hover:text-harvest-gold transition">{t.districts}</Link></li>
            <li><Link to="/diary" className="hover:text-harvest-gold transition">{t.diary}</Link></li>
            <li><Link to="/contribute" className="hover:text-harvest-gold transition">{t.contribute}</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-harvest-gold text-lg font-bold mb-6 underline underline-offset-8 decoration-nature-green">
            {t.contact}
          </h3>
          <ul className="space-y-4 text-sm opacity-90">
            <li className="flex items-center gap-3">
              <MapPin size={18} className="text-harvest-gold" />
              <span>{lang === "bn" ? "ঢাকা, বাংলাদেশ" : "Dhaka, Bangladesh"}</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-harvest-gold" />
              <span>info@banglarpothik.com</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-harvest-gold" />
              <span>+৮৮০ ১২৩৪ ৫৬৭৮৯০</span>
            </li>
          </ul>
        </div>

        {/* Contribution Highlight */}
        <div className="bg-nature-green/20 p-6 rounded-2xl border border-nature-green/30">
          <h3 className="text-harvest-gold font-bold mb-3">
            {lang === "bn" ? "আপনার গ্রামকে চেনান" : "Showcase Your Village"}
          </h3>
          <p className="text-xs mb-4 opacity-80 leading-relaxed">
            {lang === "bn" 
              ? "আপনার এলাকার ইতিহাস ও ঐতিহ্য সবার কাছে পৌঁছে দিতে আমাদের সাথে যোগ দিন।" 
              : "Join us to share the history and heritage of your area with everyone."}
          </p>
          <Link to="/register" className="inline-block bg-nature-green text-pothik-bg text-xs px-4 py-2 rounded-full font-bold hover:bg-harvest-gold hover:text-earth-brown transition duration-300">
            {lang === "bn" ? "কমিউনিটিতে যোগ দিন" : "Join Community"}
          </Link>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-pothik-bg/10 flex flex-col md:row justify-between items-center gap-4 text-xs opacity-60">
        <p>{t.rights}</p>
        <p className="hover:text-harvest-gold transition cursor-default tracking-widest uppercase">
          {t.developedBy}
        </p>
      </div>
    </footer>
  );
};

export default Footer;