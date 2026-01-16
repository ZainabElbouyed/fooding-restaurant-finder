import React from 'react';
import { Link } from 'react-router-dom';

const RestaurantCard = ({ restaurant, ville, isRecommendation }) => {
  // Gestion de l'ambiance "Non spécifiée"
  let ambianceDisplay = 'Non spécifiée';
  if (restaurant.ambiance && restaurant.ambiance.length > 0) {
    ambianceDisplay = restaurant.ambiance.join(', ');
  } else if (restaurant['ambiance '] && restaurant['ambiance '].length > 0) {
    ambianceDisplay = restaurant['ambiance '].join(', ');
  }

  return (
    <Link
      to={`/restaurant/${ville}/${restaurant._id}`}
      className={`block bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden ${
        isRecommendation ? 'border-2 border-primary' : ''
      }`}
    >
      {/* Image / Icon */}
      <div className="relative h-48 bg-gradient-to-br from-primary to-accent">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white text-6xl">🍽️</span>
        </div>

        {/* Badge recommandation */}
        {isRecommendation && (
          <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
            <span className="mr-1">⭐</span> Recommandé
          </div>
        )}

        {/* Rating */}
        {restaurant.rating && (
          <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full font-bold text-gray-800 flex items-center shadow-md">
            <span className="text-yellow-500 mr-1">★</span>
            {restaurant.rating.toFixed(1)}
          </div>
        )}
      </div>

      {/* Contenu */}
      <div className="p-6">
        {/* Titre */}
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
          {restaurant.title}
        </h3>

        {/* Adresse */}
        <p className="text-gray-600 text-sm mb-3 flex items-start">
          <svg className="w-4 h-4 mr-1 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="line-clamp-2">{restaurant.address}</span>
        </p>

        {/* Prix */}
        {restaurant.priceLevel && restaurant.priceLevel.length > 0 && (
          <div className="mb-3">
            <span className="text-primary font-semibold">
              {restaurant.priceLevel.join(', ')}
            </span>
          </div>
        )}

        {/* Catégories */}
        {restaurant.category && restaurant.category.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {restaurant.category.slice(0, 2).map((cat, index) => (
              <span
                key={index}
                className="bg-secondary text-gray-700 px-3 py-1 rounded-full text-xs font-medium"
              >
                {cat.trim()}
              </span>
            ))}
            {restaurant.category.length > 2 && (
              <span className="bg-secondary text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                +{restaurant.category.length - 2}
              </span>
            )}
          </div>
        )}

        {/* Tags spéciaux */}
        <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-200">
          {restaurant.halal === 'Oui' && (
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold flex items-center">
              🍷 Halal
            </span>
          )}
          {restaurant.Vegetarien && (
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold flex items-center">
              🥗 Végétarien
            </span>
          )}
          {restaurant.enfant && (
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold flex items-center">
              👶 Enfants
            </span>
          )}
        </div>

        {/* Ambiance */}
        {ambianceDisplay && (
          <p className="text-gray-500 text-sm mt-2">
            🎭 {ambianceDisplay}
          </p>
        )}

        {/* Avis */}
        {restaurant.ratingCount && (
          <p className="text-gray-500 text-sm mt-3">
            {restaurant.ratingCount} avis
          </p>
        )}
      </div>
    </Link>
  );
};

export default RestaurantCard;
