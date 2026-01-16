const Restaurant = require('../models/Restaurant');
const mongoose = require('mongoose');

// NOUVELLE FONCTION - Logique OU pour chaque critère, ET entre critères
exports.filterRestaurants = async (req, res) => {
  try {
    const filters = req.body;
    console.log('📥 Filtres reçus (nouvelle logique):', filters);
    
    // Déterminer la collection selon la ville
    let collectionName = 'restaurants'; // Par défaut
    
    if (filters.ville) {
      const villeLower = filters.ville.toLowerCase();
      if (villeLower.includes('rabat')) {
        collectionName = 'Rabat';
      } else if (villeLower.includes('tanger')) {
        collectionName = 'Tanger';
      }
    }
    
    console.log(`🗂️ Recherche dans la collection: ${collectionName}`);
    
    // Créer le modèle dynamiquement
    const RestaurantModel = mongoose.model('TempRestaurant' + Date.now(), 
      new mongoose.Schema({}, { strict: false }), 
      collectionName
    );
    
    // Construire la requête avec la nouvelle logique
    let queryConditions = {};
    
    // 1. Filtre par ville (dans l'adresse)
    if (filters.ville && filters.ville.trim() !== '') {
      queryConditions.address = { $regex: filters.ville, $options: 'i' };
    }
    
    // 2. Filtre par niveau de prix (LOGIQUE OU)
    if (filters.priceLevel && filters.priceLevel.length > 0) {
      queryConditions.priceLevel = { 
        $elemMatch: { $in: filters.priceLevel } 
      };
    }
    
    // 3. Filtre par type (LOGIQUE OU)
    if (filters.type && filters.type.length > 0) {
      queryConditions.type = { 
        $elemMatch: { $in: filters.type } 
      };
    }
    
    // 4. Filtre par catégorie (LOGIQUE OU)
    if (filters.category && filters.category.length > 0) {
      queryConditions.category = { 
        $elemMatch: { $in: filters.category } 
      };
    }
    
    // 5. Filtre par ambiance (LOGIQUE OU avec gestion spéciale)
    if (filters.ambiance && filters.ambiance.length > 0) {
      const includesNonSpecifiee = filters.ambiance.includes("Non spécifiée");
      
      if (includesNonSpecifiee) {
        // Gestion de "Non spécifiée"
        queryConditions.$or = [
          { ambiance: { $elemMatch: { $in: filters.ambiance } } },
          { 'ambiance ': { $elemMatch: { $in: filters.ambiance } } },
          { ambiance: { $exists: false } },
          { ambiance: null },
          { ambiance: [] },
          { 'ambiance ': { $exists: false } },
          { 'ambiance ': null },
          { 'ambiance ': [] }
        ];
      } else {
        // Ambiances spécifiques
        queryConditions.$or = [
          { ambiance: { $elemMatch: { $in: filters.ambiance } } },
          { 'ambiance ': { $elemMatch: { $in: filters.ambiance } } }
        ];
      }
    }
    
    // 6. Filtre enfant (booléen)
    if (filters.enfant === true) {
      queryConditions.enfant = true;
    }
    
    // 7. Filtre halal
    if (filters.halal === true) {
      queryConditions.halal = "Oui";
    }
    
    // 8. Filtre végétarien (attention à la casse)
    if (filters.Vegetarien === true || filters.vegetarien === true) {
      queryConditions.Vegetarien = true;
    }
    
    console.log('🔍 Requête MongoDB (nouvelle logique):', JSON.stringify(queryConditions, null, 2));
    
    // Exécution de la requête
    const restaurants = await RestaurantModel.find(queryConditions)
      .sort({ rating: -1 })
      .limit(100)
      .lean();
    
    console.log(`✅ ${restaurants.length} restaurant(s) trouvé(s)`);
    
    res.status(200).json({
      success: true,
      count: restaurants.length,
      data: restaurants
    });
    
  } catch (error) {
    console.error('❌ Erreur lors du filtrage:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors du filtrage des restaurants',
      error: error.message
    });
  }
};

// Ajoutez cette nouvelle route pour la recherche avec GET
exports.searchRestaurants = async (req, res) => {
  try {
    const { ville } = req.params;
    const filters = req.query;
    
    console.log('🔍 Recherche avec GET:', { ville, filters });
    
    // Déterminer la collection
    let collectionName = 'restaurants';
    if (ville) {
      const villeLower = ville.toLowerCase();
      if (villeLower.includes('rabat')) {
        collectionName = 'Rabat';
      } else if (villeLower.includes('tanger')) {
        collectionName = 'Tanger';
      }
    }
    
    // Créer le modèle
    const RestaurantModel = mongoose.model('TempSearch' + Date.now(), 
      new mongoose.Schema({}, { strict: false }), 
      collectionName
    );
    
    // Construire la requête
    let queryConditions = {};
    
    // Convertir les paramètres query strings
    if (filters.type) {
      const typeArray = Array.isArray(filters.type) ? filters.type : [filters.type];
      queryConditions.type = { $elemMatch: { $in: typeArray } };
    }
    
    if (filters.priceLevel) {
      const priceArray = Array.isArray(filters.priceLevel) ? filters.priceLevel : [filters.priceLevel];
      queryConditions.priceLevel = { $elemMatch: { $in: priceArray } };
    }
    
    if (filters.category) {
      const categoryArray = Array.isArray(filters.category) ? filters.category : [filters.category];
      queryConditions.category = { $elemMatch: { $in: categoryArray } };
    }
    
    if (filters.ambiance) {
      const ambianceArray = Array.isArray(filters.ambiance) ? filters.ambiance : [filters.ambiance];
      queryConditions.$or = [
        { ambiance: { $elemMatch: { $in: ambianceArray } } },
        { 'ambiance ': { $elemMatch: { $in: ambianceArray } } }
      ];
    }
    
    if (filters.enfant === 'true') {
      queryConditions.enfant = true;
    }
    
    if (filters.halal === 'true') {
      queryConditions.halal = "Oui";
    }
    
    if (filters.Vegetarien === 'true' || filters.vegetarien === 'true') {
      queryConditions.Vegetarien = true;
    }
    
    console.log('Query conditions:', queryConditions);
    
    const restaurants = await RestaurantModel.find(queryConditions)
      .sort({ rating: -1 })
      .limit(100)
      .lean();

    console.log(`✅ ${restaurants.length} restaurant(s) trouvé(s)`);
    
    // GARANTIR que c'est un tableau
    const resultData = Array.isArray(restaurants) ? restaurants : [];
    
    res.status(200).json({
      success: true,
      count: resultData.length,
      message: `Recherche réussie - ${resultData.length} résultat(s)`,
      data: resultData
    });
    
  } catch (error) {
    console.error('Erreur:', error);
    res.status(200).json({
      success: true,
      count: 0,
      message: 'Aucun résultat trouvé',
      data: [] // ← TOUJOURS un tableau
    });
  }
};

// Récupérer tous les restaurants d'une ville
exports.getRestaurantsByVille = async (req, res) => {
  try {
    const { ville } = req.params;
    
    let collectionName = 'restaurants';
    if (ville) {
      const villeLower = ville.toLowerCase();
      if (villeLower.includes('rabat')) {
        collectionName = 'Rabat';
      } else if (villeLower.includes('tanger')) {
        collectionName = 'Tanger';
      }
    }
    
    const RestaurantModel = mongoose.model('TempVille' + Date.now(), 
      new mongoose.Schema({}, { strict: false }), 
      collectionName
    );
    
    const restaurants = await RestaurantModel.find()
      .sort({ rating: -1 })
      .limit(100)
      .lean();
    
    const resultData = Array.isArray(restaurants) ? restaurants : [];

    res.status(200).json({
      success: true,
      count: resultData.length,
      message: `Restaurants de ${ville} - ${resultData.length} résultat(s)`,
      data: resultData 
    });
    
  } catch (error) {
    res.status(500).json({
      success: true,
      count: 0,
      message: 'Aucun restaurant trouvé',
      data: [] 
    });
  }
};

// Récupérer les recommandations
exports.getRecommendations = async (req, res) => {
  try {
    const { ville } = req.params;
    
    let collectionName = 'restaurants';
    if (ville) {
      const villeLower = ville.toLowerCase();
      if (villeLower.includes('rabat')) {
        collectionName = 'Rabat';
      } else if (villeLower.includes('tanger')) {
        collectionName = 'Tanger';
      }
    }
    
    const RestaurantModel = mongoose.model('TempReco' + Date.now(), 
      new mongoose.Schema({}, { strict: false }), 
      collectionName
    );
    
    // Recommandations : restaurants avec rating > 4.0
    const recommendations = await RestaurantModel.find({
      rating: { $gte: 4.0 }
    })
    .sort({ rating: -1, ratingCount: -1 })
    .limit(6)
    .lean();
    
    const resultData = Array.isArray(recommendations) ? recommendations : [];
    
    console.log(`✅ ${resultData.length} recommandation(s) trouvée(s)`);
    
    res.status(200).json({
      success: true,
      count: resultData.length,
      message: `Recommandations - ${resultData.length} résultat(s)`,
      data: resultData // ← TOUJOURS un tableau
    });
    
  } catch (error) {
    res.status(500).json({
      success: true,
      count: 0,
      message: 'Aucune recommandation trouvée',
      data: []
    });
  }
};

// Récupérer la liste des villes disponibles - VERSION FIXE
exports.getVilles = async (req, res) => {
  try {
    console.log('🔍 getVilles appelé');
    
    // Définir manuellement les villes disponibles
    const villes = ['Rabat', 'Tanger'];
    
    console.log(`✅ Envoi de ${villes.length} villes:`, villes);
    
    res.status(200).json({
      success: true,
      count: villes.length,
      data: villes
    });
    
  } catch (error) {
    console.error('❌ Erreur getVilles:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des villes',
      error: error.message
    });
  }
};
// Récupérer tous les restaurants (de toutes les villes)
exports.getAllRestaurants = async (req, res) => {
  try {
    console.log('🔍 Chargement de tous les restaurants...');
    
    // Collections disponibles
    const collections = ['Rabat', 'Tanger', 'restaurants'];
    let allRestaurants = [];
    
    for (const collectionName of collections) {
      try {
        const RestaurantModel = mongoose.model('TempAll' + Date.now() + collectionName, 
          new mongoose.Schema({}, { strict: false }), 
          collectionName
        );
        const restaurants = await RestaurantModel.find()
          .limit(50)
          .lean();
        
        
        allRestaurants = allRestaurants.concat(restaurants);
        console.log(`   ${collectionName}: ${restaurants.length} restaurants`);
      } catch (err) {
        console.log(`   ${collectionName}: collection vide ou inexistante`);
      }
    }
    
    const resultData = Array.isArray(allRestaurants) ? allRestaurants : [];
    
    res.status(200).json({
      success: true,
      count: resultData.length,
      message: `Tous les restaurants - ${resultData.length} résultat(s)`,
      data: resultData // ← TOUJOURS un tableau
    });
    
  } catch (error) {
    console.error('❌ Erreur getAllRestaurants:', error);
    res.status(500).json({
      success: true,
      count: 0,
      message: 'Aucun restaurant trouvé',
      data: []
    });
  }
};
// Récupérer un restaurant spécifique
exports.getRestaurantById = async (req, res) => {
  try {
    const { ville, id } = req.params;
    
    let collectionName = 'restaurants';
    if (ville) {
      const villeLower = ville.toLowerCase();
      if (villeLower.includes('rabat')) {
        collectionName = 'Rabat';
      } else if (villeLower.includes('tanger')) {
        collectionName = 'Tanger';
      }
    }
    
    const RestaurantModel = mongoose.model('TempDetail' + Date.now(), 
      new mongoose.Schema({}, { strict: false }), 
      collectionName
    );
    
    const restaurant = await RestaurantModel.findById(id).lean();
    
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant non trouvé'
      });
    }
    
    res.status(200).json({
      success: true,
      data: restaurant
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération du restaurant',
      error: error.message
    });
  }
};
// À la TRÈS TRÈS FIN de restaurantController.js, APRÈS toutes les fonctions

