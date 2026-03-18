import React, { useState, useEffect } from 'react';
import { 
  Trees, 
  Waves, 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  Facebook, 
  Menu, 
  X, 
  ChevronRight, 
  Star, 
  Coffee, 
  Wifi, 
  Wind, 
  Music, 
  Flame, 
  Binoculars, 
  Mountain,
  MessageCircle,
  Calendar,
  Utensils
} from 'lucide-react';

// --- Components ---

const Navbar = ({ scrollTo }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Rooms', id: 'rooms' },
    { name: 'Experiences', id: 'experiences' },
    { name: 'Dining', id: 'dining' },
    { name: 'Gallery', id: 'gallery' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo('home')}>
          <div className={`p-2 rounded-full ${isScrolled ? 'bg-emerald-600 text-white' : 'bg-white text-emerald-900'}`}>
            <Trees size={24} />
          </div>
          <span className={`text-xl font-serif font-bold tracking-tight ${isScrolled ? 'text-emerald-900' : 'text-white'}`}>
            White River Retreat<span className="font-light"> Valley</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`text-sm font-medium transition-colors hover:text-emerald-500 ${isScrolled ? 'text-slate-600' : 'text-white/90'}`}
            >
              {link.name}
            </button>
          ))}
          <button 
            onClick={() => scrollTo('booking')}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${isScrolled ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-white text-emerald-900 hover:bg-emerald-50'}`}
          >
            Book Now
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className={isScrolled ? 'text-emerald-900' : 'text-white'} /> : <Menu className={isScrolled ? 'text-emerald-900' : 'text-white'} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl py-6 px-6 flex flex-col gap-4 animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => { scrollTo(link.id); setIsMobileMenuOpen(false); }}
              className="text-left text-lg font-medium text-slate-800 border-b border-slate-100 pb-2"
            >
              {link.name}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

const SectionHeading = ({ title, subtitle, light = false }) => (
  <div className="mb-12 text-center">
    <span className={`uppercase tracking-[0.3em] text-sm font-semibold mb-2 block ${light ? 'text-emerald-200' : 'text-emerald-600'}`}>
      {subtitle}
    </span>
    <h2 className={`text-4xl md:text-5xl font-serif font-bold ${light ? 'text-white' : 'text-slate-900'}`}>
      {title}
    </h2>
    <div className={`w-20 h-1 mx-auto mt-6 rounded-full ${light ? 'bg-emerald-400' : 'bg-emerald-600'}`}></div>
  </div>
);

// Helper component for images with fallbacks
const ImageWithFallback = ({ src, alt, className }) => {
  return (
    <div className={`relative overflow-hidden bg-slate-200 flex items-center justify-center ${className}`}>
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        onError={(e) => {
          e.target.style.display = 'none';
          e.target.parentElement.classList.add('bg-gradient-to-br', 'from-emerald-100', 'to-emerald-50');
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center -z-10 text-emerald-200">
        <Trees size={48} />
      </div>
    </div>
  );
};

const App = () => {
  const [bookingForm, setBookingForm] = useState({
    name: '', phone: '', email: '', checkIn: '', checkOut: '', guests: '2', roomType: 'Deluxe Room'
  });

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    console.log("Booking Details:", bookingForm);
    alert("Thank you! Your booking request for White River Retreat has been sent. We will contact you shortly.");
  };

  const rooms = [
    {
      title: "River View Cottage",
      price: "₹8,500",
      image: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=800&q=80",
      amenities: ["River View", "Private Balcony", "King Bed", "WiFi"]
    },
    {
      title: "Luxury Forest Villa",
      price: "₹12,000",
      image: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&w=800&q=80",
      amenities: ["Plunge Pool", "Forest View", "Bathtub", "Mini Bar"]
    },
    {
      title: "Deluxe Nature Room",
      price: "₹6,000",
      image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80",
      amenities: ["Queen Bed", "Garden View", "Eco-Friendly", "AC"]
    }
  ];

  const experiences = [
    { title: "River Bathing", icon: <Waves />, desc: "Cool off in the pristine Hemavati river tributaries." },
    { title: "Hill Trekking", icon: <Mountain />, desc: "Explore the misty peaks of Sakleshpur." },
    { title: "Plantation Walk", icon: <Trees />, desc: "Discover the secrets of coffee and spice growing." },
    { title: "Bonfire Nights", icon: <Flame />, desc: "Evenings filled with warmth, music, and stories." },
    { title: "Bird Watching", icon: <Binoculars />, desc: "Spot exotic Malabar hornbills and more." },
    { title: "Organic Dining", icon: <Utensils />, desc: "Farm-to-table local Malnad cuisine." },
  ];

  return (
    <div className="font-sans text-slate-900 bg-[#fdfbf7] selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar scrollTo={scrollTo} />

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1920&q=80" 
            alt="Sakleshpur Resort" 
            className="w-full h-full scale-105 animate-pulse-slow"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <span className="inline-block px-4 py-1 -mb-[25px] border border-white/30 rounded-full text-white text-sm backdrop-blur-sm animate-fade-in-down">
            
          </span>
          <h1 className="text-5xl md:text-8xl font-serif font-bold text-white mb-6 leading-tight drop-shadow-lg">
            Escape to Nature. <br />
            <span className="italic font-light">Experience Serenity.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Discover a sanctuary where the river whispers and the hills embrace you. Premium eco-living at White River Retreat Valley.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => scrollTo('booking')}
              className="px-10 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-bold transition-all transform hover:scale-105 shadow-xl"
            >
              Book Your Escape
            </button>
            <button 
              onClick={() => scrollTo('rooms')}
              className="px-10 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/40 backdrop-blur-md rounded-full font-bold transition-all"
            >
              Explore Rooms
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-10 hidden lg:flex items-center gap-4 text-white/70 text-sm">
          <MapPin size={18} /> Sakleshpur, Karnataka
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80" 
              alt="Resort Path" 
              className="aspect-[4/5] rounded-2xl shadow-2xl" 
            />
            <div className="absolute -bottom-10 -right-10 hidden lg:block w-64 aspect-square rounded-2xl overflow-hidden border-8 border-[#fdfbf7] shadow-xl bg-slate-100">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1542224566-7e85f2e6772f?auto=format&fit=crop&w=400&q=80" 
                alt="Resort Garden" 
                className="w-full h-full" 
              />
            </div>
          </div>
          <div>
            <span className="text-emerald-600 font-bold tracking-widest uppercase text-sm mb-4 block">Our Story</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 leading-tight">A Sanctuary Crafted by Nature Itself</h2>
            <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
              <p>
                Nestled in the lush western ghats of Sakleshpur, White River Retreat Valley was born from a vision to create a space where luxury meets raw wilderness. 
              </p>
              <p>
                Surrounded by emerald coffee plantations and the soothing melody of the river, our retreat offers a rare chance to disconnect from the digital noise and reconnect with your inner self.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="flex flex-col gap-2">
                  <span className="text-3xl font-bold text-emerald-800">100%</span>
                  <span className="text-sm text-slate-500 uppercase tracking-tighter font-semibold">Eco-Friendly</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-3xl font-bold text-emerald-800">15+</span>
                  <span className="text-sm text-slate-500 uppercase tracking-tighter font-semibold">Local Experiences</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rooms Section */}
      <section id="rooms" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading subtitle="Luxurious Stay" title="The Art of Comfort" />
          
          <div className="grid md:grid-cols-3 gap-8">
            {rooms.map((room, idx) => (
              <div key={idx} className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col">
                <div className="relative h-64">
                  <ImageWithFallback src={room.image} alt={room.title} className="w-full h-full" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-4 py-1 rounded-full text-emerald-900 font-bold shadow-sm">
                    {room.price} <span className="text-xs font-normal text-slate-500">/ night</span>
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-serif font-bold mb-4">{room.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {room.amenities.map((a, i) => (
                      <span key={i} className="text-xs px-3 py-1 bg-slate-100 rounded-full text-slate-600 font-medium">{a}</span>
                    ))}
                  </div>
                  <button 
                    onClick={() => scrollTo('booking')}
                    className="mt-auto w-full py-3 border-2 border-emerald-600 text-emerald-600 rounded-xl font-bold hover:bg-emerald-600 hover:text-white transition-colors"
                  >
                    Reserve Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experiences Section */}
      <section id="experiences" className="py-24 bg-emerald-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
          <Trees size={400} />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SectionHeading subtitle="Active Serenity" title="Unforgettable Moments" light />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {experiences.map((exp, idx) => (
              <div key={idx} className="p-8 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group">
                <div className="w-14 h-14 bg-emerald-500/20 text-emerald-300 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {exp.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{exp.title}</h3>
                <p className="text-emerald-100/70 leading-relaxed">{exp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dining Section */}
      <section id="dining" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <span className="text-emerald-600 font-bold tracking-widest uppercase text-sm mb-4 block">Malnad Flavors</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 leading-tight">Organic Farm-to-Table Gastronomy</h2>
            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
              Experience the authentic taste of Karnataka's heartland. Our chefs use seasonal ingredients sourced directly from our garden and local farmers to create multi-cuisine masterpieces.
            </p>
            <ul className="space-y-4 mb-8">
              {['Traditional Malnad Breakfast', 'Candlelight Riverbank Dinner', 'Hand-picked Organic Spices', 'Open-air Barbecue'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700">
                  <ChevronRight size={18} className="text-emerald-600" /> {item}
                </li>
              ))}
            </ul>
            <button className="px-8 py-3 bg-emerald-800 text-white rounded-full font-bold hover:shadow-lg transition-all">
              View Our Menu
            </button>
          </div>
          <div className="order-1 md:order-2 grid grid-cols-2 gap-4">
            <ImageWithFallback src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80" alt="Food 1" className="rounded-2xl h-64 w-full mt-8" />
            <ImageWithFallback src="https://images.unsplash.com/photo-1550966841-3ee5ad60d0d9?auto=format&fit=crop&w=400&q=80" alt="Food 2" className="rounded-2xl h-64 w-full" />
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 bg-slate-50 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeading subtitle="Visual Journey" title="Glimpse of Paradise" />
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            <ImageWithFallback className="w-full rounded-2xl" src="https://images.unsplash.com/photo-1533467686532-672c91ba0bd5?auto=format&fit=crop&w=600&q=80" alt="Nature" />
            <ImageWithFallback className="w-full rounded-2xl" src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=600&q=80" alt="River" />
            <ImageWithFallback className="w-full rounded-2xl" src="https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=600&q=80" alt="Trees" />
            <ImageWithFallback className="w-full rounded-2xl" src="https://images.unsplash.com/photo-1542224566-7e85f2e6772f?auto=format&fit=crop&w=600&q=80" alt="Resort" />
            <ImageWithFallback className="w-full rounded-2xl" src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80" alt="Pool" />
            <ImageWithFallback className="w-full rounded-2xl" src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80" alt="Misty Hills" />
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="py-24 bg-emerald-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden grid lg:grid-cols-5">
            <div className="lg:col-span-2 bg-emerald-800 p-12 text-white">
              <h2 className="text-4xl font-serif font-bold mb-6">Start Your Journey</h2>
              <p className="text-emerald-100/80 mb-10 text-lg">Book your stay at the White River Retreat. Experience the best of Sakleshpur.</p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"><Phone size={20}/></div>
                  <span>+91 97403 22538</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"><Mail size={20}/></div>
                  <span>reservations@whiteriverretreat.com</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"><MessageCircle size={20}/></div>
                  <span>WhatsApp Booking Available</span>
                </div>
              </div>

              <div className="mt-16 p-6 bg-white/5 rounded-2xl border border-white/10">
                <h4 className="font-bold mb-2">Need Help?</h4>
                <p className="text-sm text-emerald-100/60 mb-4">Our concierge is available 24/7 for custom travel plans.</p>
                <button onClick={() => scrollTo('contact')} className="text-emerald-300 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                  Contact Us <ChevronRight size={16}/>
                </button>
              </div>
            </div>

            <div className="lg:col-span-3 p-12">
              <form onSubmit={handleBookingSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-600">Full Name</label>
                    <input 
                      required 
                      type="text" 
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all" 
                      placeholder="John Doe"
                      onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-600">Phone Number</label>
                    <input 
                      required 
                      type="tel" 
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all" 
                      placeholder="+91 XXXXX XXXXX"
                      onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600">Email Address</label>
                  <input 
                    required 
                    type="email" 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all" 
                    placeholder="john@example.com"
                    onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-600">Check-in</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-3.5 text-slate-400" size={18} />
                      <input 
                        required 
                        type="date" 
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                        onChange={(e) => setBookingForm({...bookingForm, checkIn: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-600">Check-out</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-3.5 text-slate-400" size={18} />
                      <input 
                        required 
                        type="date" 
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                        onChange={(e) => setBookingForm({...bookingForm, checkOut: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-600">Room Type</label>
                    <select 
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                      onChange={(e) => setBookingForm({...bookingForm, roomType: e.target.value})}
                    >
                      <option>Deluxe nature Room</option>
                      <option>River View Cottage</option>
                      <option>Luxury Forest Villa</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-600">Number of Guests</label>
                    <input 
                      type="number" 
                      min="1" 
                      defaultValue="2" 
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                      onChange={(e) => setBookingForm({...bookingForm, guests: e.target.value})}
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all transform active:scale-95 shadow-lg flex items-center justify-center gap-2"
                >
                  Confirm Booking Request
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="contact" className="py-24 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16">
        <div>
          <SectionHeading subtitle="Visit Us" title="Find Your Way" />
          <div className="space-y-8">
            <div className="flex gap-4">
              <MapPin className="text-emerald-600 shrink-0" size={24} />
              <div>
                <h4 className="font-bold text-lg">Address</h4>
                <p className="text-slate-600">Near Hemavati River Bank, Sakleshpur-Mangalore Road, Sakleshpur, Karnataka 573134, India</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Phone className="text-emerald-600 shrink-0" size={24} />
              <div>
                <h4 className="font-bold text-lg">Contact</h4>
                <p className="text-slate-600">+91 9740322538</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Mail className="text-emerald-600 shrink-0" size={24} />
              <div>
                <h4 className="font-bold text-lg">Email</h4>
                <p className="text-slate-600">contact@whiteriverretreat.com</p>
              </div>
            </div>
            <div className="pt-6 flex gap-4">
              <a href="#" className="p-3 bg-slate-100 rounded-full hover:bg-emerald-100 hover:text-emerald-700 transition-all"><Instagram size={20}/></a>
              <a href="#" className="p-3 bg-slate-100 rounded-full hover:bg-emerald-100 hover:text-emerald-700 transition-all"><Facebook size={20}/></a>
            </div>
          </div>
        </div>
        <div className="rounded-3xl overflow-hidden shadow-xl h-[450px] bg-emerald-50 relative border border-emerald-100">
          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 text-center p-8 z-0">
             <MapPin size={48} className="mb-4 text-emerald-600 animate-bounce" />
             <h3 className="text-xl font-bold mb-2">White River Retreat Valley</h3>
             <p>Nestled on the Hemavati river bank, Sakleshpur.</p>
          </div>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15574.008453531102!2d75.78!3d12.94!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU2JzI0LjAiTiA3NfKwNDYnNDguMCJF!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin" 
            width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy"
            className="relative z-10 opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700"
          ></iframe>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-emerald-600 rounded-full"><Trees size={20}/></div>
              <span className="text-2xl font-serif font-bold">White River Retreat</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Your gateway to the soul of Sakleshpur. Experience luxury redefined by nature.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-lg">Quick Links</h4>
            <ul className="space-y-4 text-slate-400">
              <li><button onClick={() => scrollTo('home')} className="hover:text-emerald-400 transition-colors">Home</button></li>
              <li><button onClick={() => scrollTo('about')} className="hover:text-emerald-400 transition-colors">About Us</button></li>
              <li><button onClick={() => scrollTo('rooms')} className="hover:text-emerald-400 transition-colors">Rooms</button></li>
              <li><button onClick={() => scrollTo('experiences')} className="hover:text-emerald-400 transition-colors">Experiences</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-lg">Experiences</h4>
            <ul className="space-y-4 text-slate-400">
              <li>River Bathing</li>
              <li>Coffee Plantation</li>
              <li>Trekking</li>
              <li>Bird Watching</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-lg">Newsletter</h4>
            <p className="text-slate-400 text-sm mb-4">Subscribe for seasonal offers and travel tips.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Your email" className="bg-white/10 border border-white/10 rounded-lg px-4 py-2 w-full outline-none focus:border-emerald-500" />
              <button className="bg-emerald-600 p-2 rounded-lg hover:bg-emerald-700 transition-colors"><ChevronRight/></button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-12 border-t border-white/5 text-center text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} White River Retreat Valley. All Rights Reserved. Crafted for nature lovers.
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-40">
        <a href="https://wa.me/919740322538" className="w-14 h-14 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-emerald-600 transition-all group relative">
          <MessageCircle size={24} />
          <span className="absolute right-16 bg-white text-emerald-900 px-4 py-1 rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap shadow-lg">WhatsApp Us</span>
        </a>
        <button 
          onClick={() => scrollTo('booking')}
          className="w-14 h-14 bg-emerald-900 text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-black transition-all group relative"
        >
          <Calendar size={24} />
          <span className="absolute right-16 bg-white text-emerald-900 px-4 py-1 rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap shadow-lg">Book Now</span>
        </button>
      </div>

      <style>{`
        @keyframes fade-in-down {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down {
          animation: fade-in-down 1s ease-out;
        }
        .animate-pulse-slow {
          animation: pulse-slow 20s infinite alternate;
        }
        @keyframes pulse-slow {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        .font-serif {
          font-family: 'Playfair Display', serif;
        }
        body {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
      `}</style>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
    </div>
  );
};

export default App;