import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Custom Icons as SVG components
  const Icons = {
    Sparkles: ({ className }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    ChevronRight: ({ className }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    ),
    Users: ({ className }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    Award: ({ className }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    Star: ({ className, filled }) => (
      <svg className={className} fill={filled ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
    Search: ({ className }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    MapPin: ({ className }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    Shield: ({ className }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    TrendingUp: ({ className }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5EFE7] via-[#E8DCC8] to-[#D4C4B0] text-[#3E2723] overflow-hidden relative">
      {/* Texture overlay */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0 bg-grain mix-blend-overlay"></div>
     
      {/* Curseur custom glow effect */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition duration-300"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 115, 85, 0.08), transparent 80%)`,
        }}
      />

      {/* Hero Section Ultra-Moderne */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Blobs */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#8B7355] opacity-10 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#D4A574] opacity-10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-[#A0826D] opacity-10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        {/* Background Image - Decorative */}
        <div className="absolute inset-0 flex items-center justify-between px-8 lg:px-16 pointer-events-none">
          {/* Image gauche */}
          <div className="hidden lg:block w-64 h-64 xl:w-80 xl:h-80 opacity-20">
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=400&fit=crop"
              alt="Restaurant décor"
              className="w-full h-full object-cover rounded-full shadow-2xl border-4 border-white/20"
            />
          </div>
         
          {/* Image droite */}
          <div className="hidden lg:block w-64 h-64 xl:w-80 xl:h-80 opacity-20">
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=400&fit=crop"
              alt="Plat gastronomique"
              className="w-full h-full object-cover rounded-full shadow-2xl border-4 border-white/20"
            />
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center space-y-8">
            {/* Main Title avec gradient animé */}
            <div className="inline-block mb-6">
              <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm px-6 py-3 rounded-full border border-[#8B7355]/20 shadow-lg">
                <Icons.Sparkles className="w-5 h-5 text-[#D4A574]" />
                <span className="text-sm font-semibold text-[#8B7355]">Propulsé par l'IA</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-display">
              <span className="block text-[#3E2723] mb-2">
                Découvrez l'Excellence
              </span>
              <span className="block bg-gradient-to-r from-[#8B7355] via-[#D4A574] to-[#A0826D] bg-clip-text text-transparent text-5xl md:text-6xl lg:text-7xl font-black mt-1">
                Culinaire
              </span>
              <div className="flex items-center justify-center gap-3 mt-4">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#D4A574]"></div>
                <span className="text-[#8B7355] text-sm md:text-base font-semibold tracking-widest uppercase">Depuis 2026</span>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#D4A574]"></div>
              </div>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-[#8B7355]/80 max-w-3xl mx-auto leading-relaxed font-light">
              Explorez une expérience gastronomique immersive propulsée par l'IA.
              <span className="block mt-2 text-[#8B7355] font-semibold">Des milliers de restaurants, une seule plateforme.</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-6 justify-center pt-8">
              <Link
                to="/city-guide"
                className="group relative px-10 py-5 bg-gradient-to-r from-[#8B7355] to-[#A0826D] rounded-2xl font-bold text-lg overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-[#8B7355]/30 text-white"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Commencer l'exploration
                  <Icons.ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#A0826D] to-[#8B7355] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>

              <Link
                to="/signup"
                className="group px-10 py-5 bg-white/80 backdrop-blur-xl border-2 border-[#8B7355]/30 rounded-2xl font-bold text-lg hover:bg-white hover:border-[#8B7355] transition-all duration-300 flex items-center gap-3 text-[#8B7355] shadow-lg"
              >
                <span>Créer un compte</span>
                <Icons.Users className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto pt-16">
              {[
                { number: '500+', label: 'Restaurants', icon: 'Award' },
                { number: '50K+', label: 'Utilisateurs', icon: 'Users' },
                { number: '4.9★', label: 'Note moyenne', icon: 'Star' },
              ].map((stat, index) => {
                const Icon = Icons[stat.icon];
                return (
                  <div
                    key={index}
                    className="group relative p-6 bg-white/80 backdrop-blur-xl border-2 border-[#8B7355]/10 rounded-3xl hover:bg-white hover:border-[#D4A574]/50 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl"
                  >
                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[#8B7355] to-[#D4A574] rounded-2xl mb-4 mx-auto shadow-lg">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#8B7355] to-[#D4A574] bg-clip-text text-transparent">
                      {stat.number}
                    </div>
                    <div className="text-[#8B7355]/70 text-sm font-medium mt-2">{stat.label}</div>
                   
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#8B7355]/0 via-[#D4A574]/10 to-[#8B7355]/0 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 border-2 border-[#8B7355]/30 rounded-full flex justify-center p-2 bg-white/50 backdrop-blur-sm">
            <div className="w-1 h-3 bg-[#8B7355] rounded-full animate-scroll"></div>
          </div>
        </div>
      </section>

      {/* Features Section avec Bento Grid */}
      <section className="relative py-32 px-4 bg-gradient-to-b from-transparent to-white/40">
        <div className="container mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 font-display">
              <span className="bg-gradient-to-r from-[#3E2723] to-[#8B7355] bg-clip-text text-transparent">
                Une expérience
              </span>
              <br />
              <span className="bg-gradient-to-r from-[#8B7355] to-[#D4A574] bg-clip-text text-transparent">
                révolutionnaire
              </span>
            </h2>
            <p className="text-lg md:text-xl text-[#8B7355]/70 max-w-2xl mx-auto">
              Propulsé par l'intelligence artificielle et conçu pour l'excellence
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {/* Large Feature Card 1 */}
            <div className="md:col-span-2 md:row-span-2 group relative bg-white/90 backdrop-blur-xl border-2 border-[#8B7355]/20 rounded-3xl p-8 overflow-hidden hover:border-[#D4A574] hover:shadow-2xl transition-all duration-500">
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#8B7355] to-[#D4A574] rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Icons.Search className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[#3E2723] font-display">Recherche Intelligente</h3>
                <p className="text-[#8B7355]/80 text-base md:text-lg leading-relaxed mb-6">
                  Notre algorithme d'IA analyse vos préférences, votre historique et les tendances en temps réel pour vous recommander les restaurants parfaits. Filtres avancés, recherche vocale et suggestions personnalisées.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['IA Avancée', 'Filtres Smart', 'Temps Réel'].map((tag, i) => (
                    <span key={i} className="px-4 py-2 bg-gradient-to-r from-[#8B7355]/10 to-[#D4A574]/10 border border-[#8B7355]/20 rounded-full text-sm font-semibold text-[#8B7355]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
             
              <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#D4A574]/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
            </div>

            {/* Small Feature Card 1 */}
            <div className="group relative bg-white/90 backdrop-blur-xl border-2 border-[#8B7355]/20 rounded-3xl p-8 hover:border-[#D4A574] hover:shadow-2xl transition-all duration-500 overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-[#D4A574] to-[#8B7355] rounded-2xl mb-4 shadow-lg">
                  <Icons.Star className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 text-[#3E2723] font-display">Avis Vérifiés</h3>
                <p className="text-sm md:text-base text-[#8B7355]/80">
                  Des milliers d'avis authentiques et vérifiés par notre système de blockchain.
                </p>
              </div>
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#D4A574]/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
            </div>

            {/* Small Feature Card 2 */}
            <div className="group relative bg-white/90 backdrop-blur-xl border-2 border-[#8B7355]/20 rounded-3xl p-8 hover:border-[#8B7355] hover:shadow-2xl transition-all duration-500 overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-[#8B7355] to-[#A0826D] rounded-2xl mb-4 shadow-lg">
                  <Icons.MapPin className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 text-[#3E2723] font-display">Géolocalisation</h3>
                <p className="text-sm md:text-base text-[#8B7355]/80">
                  Trouvez les meilleurs restaurants autour de vous en temps réel avec AR.
                </p>
              </div>
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#8B7355]/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
            </div>

            {/* Large Feature Card 2 */}
            <div className="md:col-span-2 group relative bg-white/90 backdrop-blur-xl border-2 border-[#8B7355]/20 rounded-3xl p-8 overflow-hidden hover:border-[#D4A574] hover:shadow-2xl transition-all duration-500">
              <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
                <div className="flex-1">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#D4A574] to-[#8B7355] rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Icons.Shield className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[#3E2723] font-display">Sécurité & Confidentialité</h3>
                  <p className="text-[#8B7355]/80 text-base md:text-lg leading-relaxed">
                    Vos données sont cryptées de bout en bout. Paiements sécurisés, authentification biométrique et respect total de votre vie privée.
                  </p>
                </div>
                <div className="hidden lg:block">
                  <div className="w-48 h-48 bg-gradient-to-br from-[#D4A574]/30 to-[#8B7355]/30 rounded-3xl transform rotate-12 group-hover:rotate-0 transition-transform duration-500 shadow-xl"></div>
                </div>
              </div>
              <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-[#D4A574]/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
            </div>

            {/* Small Feature Card 3 */}
            <div className="group relative bg-white/90 backdrop-blur-xl border-2 border-[#8B7355]/20 rounded-3xl p-8 hover:border-[#8B7355] hover:shadow-2xl transition-all duration-500 overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-[#8B7355] to-[#D4A574] rounded-2xl mb-4 shadow-lg">
                  <Icons.TrendingUp className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 text-[#3E2723] font-display">Matching IA</h3>
                <p className="text-sm md:text-base text-[#8B7355]/80">
                  L'IA trouve le restaurant parfait selon vos goûts et votre mood.
                </p>
              </div>
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#D4A574]/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="relative py-32 px-4 overflow-hidden bg-white/60">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-20 font-display">
            <span className="bg-gradient-to-r from-[#3E2723] to-[#8B7355] bg-clip-text text-transparent">
              Ce qu'ils disent de nous
            </span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                name: 'Sarah M.',
                role: 'Food Blogger',
                avatar: 'SM',
                text: 'FOODING a complètement changé ma façon de découvrir les restaurants. L\'IA est bluffante !',
                rating: 5
              },
              {
                name: 'Ahmed K.',
                role: 'Chef Cuisinier',
                avatar: 'AK',
                text: 'Une plateforme révolutionnaire. Mes restaurants n\'ont jamais eu autant de visibilité.',
                rating: 5
              },
              {
                name: 'Leila B.',
                role: 'Entrepreneuse',
                avatar: 'LB',
                text: 'Interface intuitive, recommandations pertinentes. C\'est mon app préférée pour sortir !',
                rating: 5
              }
            ].map((testimonial, index) => (
              <div
                key={index}
                className="group relative bg-white/90 backdrop-blur-xl border-2 border-[#8B7355]/20 rounded-3xl p-8 hover:bg-white hover:border-[#D4A574] hover:shadow-2xl transition-all duration-500"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#8B7355] to-[#D4A574] flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-lg text-[#3E2723]">{testimonial.name}</div>
                    <div className="text-sm text-[#8B7355]/70">{testimonial.role}</div>
                  </div>
                </div>
               
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Icons.Star key={i} className="w-5 h-5 text-[#D4A574]" filled />
                  ))}
                </div>
               
                <p className="text-base text-[#8B7355]/90 leading-relaxed">{testimonial.text}</p>
               
                <div className="absolute inset-0 bg-gradient-to-r from-[#8B7355]/0 via-[#D4A574]/5 to-[#8B7355]/0 rounded-3xl opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-32 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="relative bg-gradient-to-br from-[#8B7355] via-[#A0826D] to-[#8B7355] p-1 rounded-[3rem] overflow-hidden shadow-2xl">
            <div className="relative bg-gradient-to-br from-[#F5EFE7] to-[#E8DCC8] rounded-[2.8rem] p-16 text-center">
              <div className="inline-block mb-6">
                <div className="flex items-center gap-2 bg-[#8B7355]/10 px-6 py-3 rounded-full border border-[#8B7355]/20">
                  <Icons.Sparkles className="w-5 h-5 text-[#D4A574]" />
                  <span className="text-sm font-semibold text-[#8B7355]">Offre de lancement</span>
                </div>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-display">
                <span className="bg-gradient-to-r from-[#3E2723] to-[#8B7355] bg-clip-text text-transparent">
                  Prêt à révolutionner
                </span>
                <br />
                <span className="bg-gradient-to-r from-[#8B7355] to-[#D4A574] bg-clip-text text-transparent">
                  votre expérience culinaire ?
                </span>
              </h2>
             
              <p className="text-xl text-[#8B7355]/80 mb-12 max-w-2xl mx-auto">
                Rejoignez plus de 50 000 utilisateurs qui ont déjà adopté l'avenir de la gastronomie
              </p>

              <div className="flex flex-wrap gap-6 justify-center">
                <Link
                  to="/city-guide"
                  className="group relative px-12 py-6 bg-gradient-to-r from-[#8B7355] to-[#A0826D] text-white rounded-2xl font-bold text-lg overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-2xl"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Démarrer maintenant
                    <Icons.ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                  </span>
                </Link>

                <Link
                  to="/signup"
                  className="px-12 py-6 bg-white/80 backdrop-blur-xl border-2 border-[#8B7355]/30 rounded-2xl font-bold text-lg hover:bg-white hover:border-[#8B7355] transition-all duration-300 text-[#8B7355] shadow-lg"
                >
                  Voir la démo
                </Link>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-8 justify-center mt-16 pt-16 border-t border-[#8B7355]/20">
                {[
                  { icon: 'Shield', text: 'Sécurisé' },
                  { icon: 'Sparkles', text: 'Rapide' },
                  { icon: 'TrendingUp', text: 'Précis' },
                  { icon: 'Award', text: 'Premium' }
                ].map((badge, i) => {
                  const Icon = Icons[badge.icon];
                  return (
                    <div key={i} className="flex items-center gap-2 text-[#8B7355]/80 font-semibold">
                      <Icon className="w-5 h-5" />
                      <span>{badge.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer minimal */}
     
    </div>
  );
};

export default Home ;
