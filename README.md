# FOODING - Plateforme Intelligente de Découverte Culinaire

## 🍽️ Description du Projet
FOODING est une plateforme web intelligente de recommandation culinaire conçue pour la Coupe du Monde 2030 au Maroc. L'application combine intelligence artificielle, analyse comportementale et données contextuelles pour transformer l'expérience de choix alimentaire en recommandations personnalisées instantanées.

## 🎯 Objectifs Principaux
- **Réduire le temps de décision** : Diminuer de 80% le temps consacré au choix d'un restaurant
- **Personnalisation avancée** : Atteindre 90% de satisfaction utilisateur avec des recommandations contextuelles
- **Adapter au contexte marocain** : Filtres spécifiques (halal, familial, etc.) et interface multilingue
- **Soutenir les commerces locaux** : Augmenter la visibilité des restaurants traditionnels

## 👥 Public Cible
| Catégorie | Besoins Spécifiques |
|-----------|-------------------|
| Étudiants | Budget serré, proximité, Wi-Fi |
| Jeunes actifs | Rapidité, équilibre nutritionnel |
| Familles | Espace adapté, menus enfants |
| Touristes | Authenticité, traduction, découverte |
| Restaurateurs | Visibilité, analytics, feedback |

## 🛠️ Stack Technique
### Backend
- **Runtime** : Node.js v18+
- **Framework** : Express.js v4.18+
- **Base de données** : MongoDB v6+ avec Mongoose ODM
- **Authentification** : JWT (jsonwebtoken) + bcryptjs
- **Sécurité** : CORS, dotenv pour les variables d'environnement
- **Développement** : Nodemon pour le rechargement automatique

### Frontend
- **Bibliothèque UI** : React v18+
- **Routing** : React Router DOM v6+
- **HTTP Client** : Axios v1+
- **Styling** : Tailwind CSS v3.3+ avec PostCSS et Autoprefixer

## 🔍 Système de Filtrage Intelligent
### Filtres Disponibles
- **Ville** : Recherche dans l'adresse
- **Budget** : Niveau de prix ($, $$, $$$, $$$$)
- **Adapté enfants** : Oui/Non
- **Halal** : Oui/Non
- **Végétarien** : Oui/Non
- **Catégorie** : Type de restaurant
- **Ambiance** : Type d'atmosphère
- **Type de repas** : Petit-déjeuner/Déjeuner/Dîner

### Logique de Filtrage
1. **Logique OU à l'intérieur de chaque critère** :
   - Si l'utilisateur sélectionne plusieurs valeurs pour un critère, le restaurant doit avoir au moins une valeur en commun
   - Exemple : Sélection "Déjeuner" ET "Dîner" → restaurant proposant l'un ou l'autre

2. **Logique ET entre les différents critères** :
   - Le restaurant doit satisfaire tous les critères remplis par l'utilisateur
   - Exemple : Budget $$ ET Halal Oui → restaurant doit correspondre aux deux

## 📱 Fonctionnalités Clés
### 1. Authentification Simple
- Connexion par email ou téléphone
- Récupération de compte
- Mots de passe sécurisés

### 2. Page Restaurant Détail
- Carrousel de photos
- Informations essentielles (adresse, horaires, site web)
- Menu multilingue téléchargeable (PDF)
- Section avis clients
- Carte interactive avec géolocalisation
- Actions rapides (appeler, itinéraire, partager)

### 3. City Guide
- Guide par ville avec spécialités locales
- Restaurants populaires par quartier
- Circuits culinaires recommandés
- Conseils pratiques pour les visiteurs

### 4. Assistant Virtuel
- Aide contextuelle et FAQ
- Suggestions basées sur la météo
- Contact rapide avec les restaurants

## 🚀 Évolutions Futures
### Intelligence Artificielle
- Système de recommandation hybride (collaboratif + analyse de contenu)
- Chatbot culinaire "FOODIE-Assistant"
- Création de parcours de dégustation automatiques

### Infrastructure
- Migration vers architecture microservices
- Conteneurisation avec Docker
- Orchestration avec Kubernetes
- Pipeline CI/CD automatisé

### Expérience Utilisateur
- Mode "Découverte" sur carte interactive
- Données d'affluence en temps réel
- Intégration Street View
- Système de gestion de menus dynamique (CMS pour restaurateurs)

## 🏗️ Architecture du Projet
```
fooding/
├── server/                 # Backend Node.js
│   ├── config/            # Configuration (DB, etc.)
│   ├── controllers/       # Contrôleurs API
│   ├── models/           # Modèles MongoDB
│   ├── routes/           # Routes API
│   └── server.js         # Point d'entrée
│
└── client/                # Frontend React
    ├── public/           # Fichiers statiques
    └── src/
        ├── components/   # Composants React
        ├── pages/       # Pages de l'application
        ├── services/    # Services API
        ├── contexts/    # Contextes React
        └── utils/       # Utilitaires


---

*FOODING : Transformer la décision culinaire en expérience personnalisée et enrichissante.*
