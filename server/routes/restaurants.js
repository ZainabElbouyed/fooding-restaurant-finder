
const express = require('express');
// Crée un routeur Express
const router = express.Router();

// Importez contrôleur
const restaurantController = require('../controllers/restaurantController');

// Routes avec les bons handlers
router.get('/villes', restaurantController.getVilles);

// Routes DYNAMIQUES 
router.get('/:ville/search', restaurantController.searchRestaurants);
router.get('/:ville/recommendations', restaurantController.getRecommendations);
router.get('/:ville/:id', restaurantController.getRestaurantById);
router.get('/:ville', restaurantController.getRestaurantsByVille);

// Autres routes
router.post('/filter', restaurantController.filterRestaurants);
router.get('/', restaurantController.getAllRestaurants);


module.exports = router;
