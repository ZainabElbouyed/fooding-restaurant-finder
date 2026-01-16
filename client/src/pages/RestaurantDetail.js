import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { restaurantService } from '../services/api';

const RestaurantDetail = () => {
  const { ville, id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRestaurant();
  }, [ville, id]);

  const loadRestaurant = async () => {
    try {
      const response = await restaurantService.getById(ville, id);
      setRestaurant(response.data.data);
    } catch (error) {
      console.error('Erreur lors du chargement du restaurant:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Restaurant non trouvé</h2>
          <Link to="/city-guide" className="text-primary hover:underline">
            Retour à la recherche
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary py-8">
      <div className="container mx-auto px-4">
        {/* Bouton retour */}
        <Link
          to="/city-guide"
          className="inline-flex items-center text-primary hover:text-opacity-80 mb-6 font-semibold"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Retour à la recherche
        </Link>

        {/* Contenu principal */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header avec image */}
          <div className="relative h-96 bg-gradient-to-br from-primary to-accent">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-9xl">🍽️</span>
            </div>

            {/* Rating badge */}
            {restaurant.rating && (
              <div className="absolute top-6 left-6 bg-white px-6 py-3 rounded-full font-bold text-2xl text-gray-800 flex items-center shadow-lg">
                <span className="text-yellow-500 mr-2">★</span>
                {restaurant.rating.toFixed(1)}
              </div>
            )}
          </div>

          {/* Informations */}
          <div className="p-8 md:p-12">
            {/* Titre et badges */}
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                {restaurant.title}
              </h1>

              <div className="flex flex-wrap gap-3 mb-6">
                {restaurant.halal === 'Oui' && (
                  <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold">
                    🥩 Halal
                  </span>
                )}
                {restaurant.Vegetarien && (
                  <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold">
                    🥗 Végétarien
                  </span>
                )}
                {restaurant.enfant && (
                  <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold">
                    👶 Adapté aux enfants
                  </span>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Colonne gauche */}
              <div className="space-y-8">
                {/* Adresse */}
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                    <svg className="w-6 h-6 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Adresse
                  </h3>
                  <p className="text-gray-700 text-lg">{restaurant.address}</p>
                </div>

                {/* Téléphone */}
                {restaurant.phoneNumber && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                      <svg className="w-6 h-6 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Téléphone
                    </h3>
                    <a
                      href={`tel:${restaurant.phoneNumber}`}
                      className="text-primary text-lg font-semibold hover:underline"
                    >
                      {restaurant.phoneNumber}
                    </a>
                  </div>
                )}

                {/* Prix */}
                {restaurant.priceLevel && restaurant.priceLevel.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                      <svg className="w-6 h-6 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Gamme de prix
                    </h3>
                    <p className="text-primary text-2xl font-bold">
                      {restaurant.priceLevel.join(', ')}
                    </p>
                  </div>
                )}

                {/* Avis */}
                {restaurant.ratingCount && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">Avis</h3>
                    <p className="text-gray-700 text-lg">
                      {restaurant.ratingCount} personnes ont donné leur avis
                    </p>
                  </div>
                )}
              </div>

              {/* Colonne droite */}
              <div className="space-y-8">
                {/* Type de repas */}
                {restaurant.type && restaurant.type.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                      <svg className="w-6 h-6 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Type de repas
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {restaurant.type.map((type, index) => (
                        <span
                          key={index}
                          className="bg-secondary text-gray-700 px-4 py-2 rounded-full font-medium"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Catégories */}
                {restaurant.category && restaurant.category.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                      <svg className="w-6 h-6 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      Catégories
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {restaurant.category.map((cat, index) => (
                        <span
                          key={index}
                          className="bg-primary bg-opacity-10 text-primary px-4 py-2 rounded-full font-medium"
                        >
                          {cat.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Ambiance */}
                {restaurant.ambiance && restaurant.ambiance.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                      <svg className="w-6 h-6 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Ambiance
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {restaurant.ambiance.map((amb, index) => (
                        <span
                          key={index}
                          className="bg-accent bg-opacity-20 text-gray-700 px-4 py-2 rounded-full font-medium"
                        >
                          {amb}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="mt-12 flex flex-wrap gap-4">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${restaurant.latitude},${restaurant.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-white px-8 py-4 rounded-full font-semibold hover:bg-opacity-90 transition shadow-lg flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                Voir sur la carte
              </a>

              {restaurant.phoneNumber && (
                <a
                  href={`tel:${restaurant.phoneNumber}`}
                  className="bg-accent text-white px-8 py-4 rounded-full font-semibold hover:bg-opacity-90 transition shadow-lg flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Appeler
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;
