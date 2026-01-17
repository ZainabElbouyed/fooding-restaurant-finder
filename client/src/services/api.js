import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Services restaurants 
export const restaurantService = {
  // Ville et base
  getVilles: () => api.get('/restaurants/villes'),
  getAll: () => api.get('/restaurants'),
  
  // Récupérer par ville 
  getByVille: async (ville) => {
    try {
      console.log(`🍽️ API getByVille appelée pour: ${ville}`);
      const response = await api.get(`/restaurants/${ville}`);
      
      // S'assurer que data est toujours un tableau
      if (response.data && !Array.isArray(response.data.data)) {
        console.warn('⚠️ response.data.data n\'est pas un tableau, conversion...');
        response.data.data = [];
        response.data.count = 0;
      }
      
      console.log(`✅ API getByVille réussie: ${response.data.data?.length || 0} restaurants`);
      return response;
      
    } catch (error) {
      console.error('❌ Erreur getByVille:', error.message);
      
      // Retourner une réponse valide même en cas d'erreur
      return {
        data: {
          success: true,
          count: 0,
          data: [], 
          message: 'Aucun restaurant trouvé'
        }
      };
    }
  },
  
  // Recherche avec filtres 
  search: async (ville, filters) => {
    try {
      console.log(`🔍 API search appelée pour: ${ville}`, filters);
      
      // Convertir les filtres en query params
      const params = new URLSearchParams();
      
      // Gérer les tableaux pour les filtres multiples
      if (filters.type && filters.type.length > 0) {
        filters.type.forEach(type => params.append('type', type));
      }
      
      if (filters.priceLevel && filters.priceLevel.length > 0) {
        filters.priceLevel.forEach(price => params.append('priceLevel', price));
      }
      
      if (filters.category && filters.category.length > 0) {
        filters.category.forEach(cat => params.append('category', cat));
      }
      
      if (filters.ambiance && filters.ambiance.length > 0) {
        filters.ambiance.forEach(amb => params.append('ambiance', amb));
      }
      
      // Booléens
      if (filters.enfant) params.append('enfant', 'true');
      if (filters.halal) params.append('halal', 'true');
      if (filters.Vegetarien || filters.vegetarien) {
        params.append('Vegetarien', 'true');
      }
      
      console.log('Params envoyés:', params.toString());
      
      const response = await api.get(`/restaurants/${ville}/search?${params.toString()}`);
      
      // S'assurer que data est toujours un tableau
      if (response.data && !Array.isArray(response.data.data)) {
        console.warn('⚠️ response.data.data n\'est pas un tableau, conversion...');
        response.data.data = [];
        response.data.count = 0;
      }
      
      console.log(`✅ API search réussie: ${response.data.data?.length || 0} résultats`);
      return response;
      
    } catch (error) {
      console.error('❌ Erreur search:', error.message);
      
      // Retourner une réponse valide même en cas d'erreur
      return {
        data: {
          success: true,
          count: 0,
          data: [],
          message: 'Recherche échouée'
        }
      };
    }
  },
  
  // Récupérer un restaurant spécifique
  getById: (ville, id) => api.get(`/restaurants/${ville}/${id}`),
  
  // Route POST pour filtrer 
  filter: (filters) => api.post('/restaurants/filter', filters),
  
  // Recommandations
  getRecommendations: async (ville) => {
    try {
      const response = await api.get(`/restaurants/${ville}/recommendations`);
      
      // S'assurer que data est toujours un tableau
      if (response.data && !Array.isArray(response.data.data)) {
        response.data.data = [];
        response.data.count = 0;
      }
      
      return response;
    } catch (error) {
      console.error('Erreur getRecommendations:', error);
      return {
        data: {
          success: true,
          count: 0,
          data: [],
          message: 'Aucune recommandation trouvée'
        }
      };
    }
  },
};

// Services authentification
export const authService = {
  signup: (userData) => api.post('/auth/signup', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getProfile: () => api.get('/auth/me'),
};

export default api;
