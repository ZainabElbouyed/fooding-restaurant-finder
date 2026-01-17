import React, { useState, useEffect } from 'react';
import { restaurantService } from '../services/api';
import RestaurantCard from '../components/restaurant/RestaurantCard';
import SearchFilters from '../components/restaurant/SearchFilters';

const CityGuide = () => {
  const [villes, setVilles] = useState([]);
  const [villeSelectionnee, setVilleSelectionnee] = useState('Rabat');
  const [restaurants, setRestaurants] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);

  // Filtres
  const [filters, setFilters] = useState({
    type: [],
    priceLevel: [],
    category: [],
    ambiance: [],
    enfant: false,
    halal: false,
    Vegetarien: false
  });

  // Charger les villes
  useEffect(() => {
    const loadVilles = async () => {
      try {
        const response = await restaurantService.getVilles();
        setVilles(response.data.data);
      } catch (error) {
        console.error('Erreur lors du chargement des villes:', error);
      }
    };
    loadVilles();
  }, []);

  // Charger restaurants et recommandations quand la ville change
  useEffect(() => {
    if (villeSelectionnee) {
      loadRestaurants();
      loadRecommendations();
    }
  }, [villeSelectionnee]);

  const loadRestaurants = async () => {
    setLoading(true);
    try {
      const response = await restaurantService.getByVille(villeSelectionnee);
      
      const restaurantsData = Array.isArray(response.data.data) 
        ? response.data.data 
        : [];
      
      setRestaurants(restaurantsData);
      
    } catch (error) {
      console.error('Erreur lors du chargement des restaurants:', error);
      setRestaurants([]); 
    } finally {
      setLoading(false);
    }
  };

  const loadRecommendations = async () => {
    try {
      const response = await restaurantService.getRecommendations(villeSelectionnee);
      
      
      const recommendationsData = Array.isArray(response.data.data) 
        ? response.data.data 
        : [];
      
      setRecommendations(recommendationsData);
      
    } catch (error) {
      console.error('Erreur lors du chargement des recommandations:', error);
      setRecommendations([]); 
    }
  };

  // Recherche avec filtres
  const handleSearch = async () => {
    setSearchLoading(true);
    try {
      console.log('📍 Ville:', villeSelectionnee);
      console.log('🎯 Filtres envoyés:', filters);
      
      const response = await restaurantService.search(villeSelectionnee, filters);
      
      
      const filteredData = Array.isArray(response.data.data) 
        ? response.data.data 
        : [];
      
      console.log('✅ Résultats reçus:', filteredData.length);
      setRestaurants(filteredData);
      
    } catch (error) {
      console.error('❌ Erreur lors du filtrage:', error);
      // Fallback: recharger tous les restaurants
      loadRestaurants();
    } finally {
      setSearchLoading(false);
    }
  };

  // Réinitialiser filtres
  const handleResetFilters = () => {
    setFilters({
      type: [],
      priceLevel: [],
      category: [],
      ambiance: [],
      enfant: false,
      halal: false,
      Vegetarien: false
    });
    loadRestaurants();
  };

  
  const restaurantsCount = Array.isArray(restaurants) ? restaurants.length : 0;

  return (
    <div className="min-h-screen bg-secondary">
      {/* Header avec sélection de ville */}
      <div className="bg-white shadow-md py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center text-primary italic mb-6 font-display">
            Découvrez les meilleurs restaurants
          </h1>
          <div className="flex justify-center items-center space-x-4">
            <label className="text-lg font-semibold text-gray-700">Ville :</label>
            <select
              value={villeSelectionnee}
              onChange={(e) => setVilleSelectionnee(e.target.value)}
              className="px-6 py-3 border-2 border-primary rounded-full text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {villes.map(ville => (
                <option key={ville} value={ville}>{ville}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar filtres */}
          <div className="lg:col-span-1">
            <SearchFilters
              filters={filters}
              setFilters={setFilters}
              onSearch={handleSearch}
              onReset={handleResetFilters}
            />
            
            {/* Indicateur de chargement recherche */}
            {searchLoading && (
              <div className="mt-4 text-center">
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary mx-auto"></div>
                <p className="text-sm text-gray-600 mt-2">Recherche en cours...</p>
              </div>
            )}
          </div>

          {/* Contenu principal */}
          <div className="lg:col-span-3">
            {/* Recommandations */}
            {recommendations.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center mr-4">
                    <span className="text-2xl">⭐</span>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 italic">
                    NOS RECOMMANDATIONS
                  </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {recommendations.map(r => (
                    <RestaurantCard
                      key={r._id}
                      restaurant={r}
                      ville={villeSelectionnee}
                      isRecommendation={true}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Liste des restaurants */}
            <div>
              <div className="flex items-center justify-between mb-6">
                {/* restaurantsCount au lieu de restaurants.length */}
                <h2 className="text-2xl font-bold text-gray-800">
                  Tous les restaurants ({Array.isArray(restaurants) ? restaurants.length : 0})
                </h2>
                {Object.values(filters).some(val => 
                  (Array.isArray(val) && val.length > 0) || 
                  (typeof val === 'boolean' && val)
                ) && (
                  <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
                    Filtres actifs
                  </span>
                )}
              </div>

              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
                </div>
              ) : restaurantsCount > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {restaurants.map(r => (
                    <RestaurantCard
                      key={r._id}
                      restaurant={r}
                      ville={villeSelectionnee}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
                  <div className="text-6xl mb-4">🍽️</div>
                  <p className="text-gray-500 text-xl mb-2">
                    Aucun restaurant trouvé avec ces critères
                  </p>
                  <p className="text-gray-400 mb-6">
                    Essayez de modifier vos filtres ou de sélectionner une autre ville
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="bg-gradient-to-r from-primary to-accent text-white px-8 py-3 rounded-full font-semibold hover:shadow-xl transition-all duration-300"
                  >
                    Réinitialiser les filtres
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityGuide;
