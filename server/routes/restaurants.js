// routes/restaurants.js - VERSION CORRIGÉE
const express = require('express');
// Crée un routeur Express, PAS require('router')
const router = express.Router();

// Importez votre contrôleur
const restaurantController = require('../controllers/restaurantController');

// Routes avec les bons handlers
router.get('/villes', restaurantController.getVilles);

// Routes DYNAMIQUES en DERNIER
router.get('/:ville/search', restaurantController.searchRestaurants);
router.get('/:ville/recommendations', restaurantController.getRecommendations);
router.get('/:ville/:id', restaurantController.getRestaurantById);
router.get('/:ville', restaurantController.getRestaurantsByVille);

// Autres routes
router.post('/filter', restaurantController.filterRestaurants);
router.get('/', restaurantController.getAllRestaurants);


module.exports = router;