# My Shop - Application E-commerce Premium

Une application e-commerce moderne et complète construite avec Angular, NgRx, et Material Design, offrant une expérience d'achat fluide et professionnelle.

## 🚀 Fonctionnalités

### 🔐 Authentification

- **Page de connexion sécurisée** : Design premium avec storytelling
- **Protection des routes** : Guard d'authentification pour toutes les pages protégées
- **Gestion de session** : Token-based authentication avec refresh automatique
- **Indicateur de statut** : Badge "En ligne" après connexion

### 🛍️ Catalogue de Produits

- **Affichage en grille** : Vue style Amazon avec cartes produits visuelles
- **Images de produits** : Photos haute qualité pour chaque produit
- **Filtres avancés** :
  - Pagination personnalisable
  - Filtrage par note minimum
  - Tri par date, prix, nom (croissant/décroissant)
- **Recherche** : Recherche rapide dans le catalogue
- **Détails produits** : Page dédiée avec description complète
- **Ajout au panier** : Depuis la grille ou la page détails

### 🛒 Panier d'Achat

- **Gestion complète** :
  - Ajout/Suppression de produits
  - Modification des quantités
  - Calcul automatique du total
  - Badge avec nombre d'articles dans le header
- **Persistance** : Sauvegarde automatique dans localStorage
- **Synchronisation** : Restauration automatique au rechargement
- **Interface intuitive** : Cartes produits avec contrôles de quantité

### 💳 Processus de Commande

- **Checkout en 3 étapes** :
  1. **Résumé du panier** : Vérification des articles et validation
  2. **Informations de livraison** : Formulaire d'adresse complet
  3. **Confirmation** : Numéro de commande et récapitulatif
- **Validation** : Vérification du panier avant passage de commande
- **Confirmation visuelle** : Page de succès avec numéro de commande

### 📦 Suivi de Commandes

- **Page de recherche** : Recherche par numéro de commande
- **Détails de commande** :
  - Statut en temps réel (En attente, Confirmée, Expédiée, Livrée, etc.)
  - Informations de livraison
  - **Produits commandés avec photos** : Affichage visuel de tous les articles
  - Numéro de suivi et transporteur
  - Date de livraison estimée
- **Historique de suivi** : Timeline interactive avec événements de livraison
- **Statuts visuels** : Badges colorés selon l'état de la commande

### 📋 Liste des Commandes

- **Vue d'ensemble** : Toutes les commandes de l'utilisateur
- **Aperçu rapide** : Miniatures des produits commandés
- **Navigation rapide** : Accès direct au suivi de chaque commande
- **Filtres** : Par statut, date, montant

## 🛠️ Technologies

- **Angular 18+** : Framework frontend moderne
- **NgRx** : State management avec Store, Effects, Selectors
- **Angular Material** : Composants UI Material Design
- **TypeScript** : Typage fort pour une meilleure qualité de code
- **MSW (Mock Service Worker)** : Mocking des API pour le développement
- **RxJS** : Programmation réactive
- **LocalStorage** : Persistance des données client

## 📁 Structure du Projet

```
src/
├── app/
│   ├── components/          # Composants réutilisables
│   │   ├── cart-icon/      # Icône panier avec badge
│   │   ├── cart-item/      # Item de panier
│   │   └── product-card/   # Carte produit
│   ├── pages/              # Pages de l'application
│   │   ├── login-page/     # Page de connexion
│   │   ├── products-page/  # Catalogue produits
│   │   ├── product-details-page/  # Détails produit
│   │   ├── cart-page/      # Page panier
│   │   ├── checkout/       # Processus de commande
│   │   ├── order-tracking-page/    # Suivi de commande
│   │   └── orders-list-page/       # Liste des commandes
│   ├── state/              # Gestion d'état NgRx
│   │   ├── auth/          # État authentification
│   │   ├── products/      # État produits
│   │   ├── cart/          # État panier
│   │   └── orders/        # État commandes
│   ├── guards/             # Route guards
│   ├── interceptors/      # HTTP interceptors
│   └── services/          # Services Angular
├── mocks/                  # Données et handlers MSW
│   ├── data.ts            # Produits mock
│   ├── orders.ts          # Commandes mock
│   └── handlers.ts        # Handlers API
└── main.ts                # Point d'entrée
```

## 🚦 Routes de l'Application

### Routes Publiques

- `/app/login` - Page de connexion

### Routes Protégées (nécessitent authentification)

- `/app/products` - Catalogue de produits
- `/app/products/:id` - Détails d'un produit
- `/app/cart` - Panier d'achat
- `/app/checkout` - Processus de commande
- `/app/orders` - Liste de toutes les commandes
- `/app/orders/track` - Recherche de suivi de commande
- `/app/orders/track/:orderNumber` - Suivi détaillé d'une commande
- `/app/rating` - Avis clients

### Routes Développement

- `/dev` - Zone de développement
- `/dev/auth` - Tests authentification
- `/dev/products` - Tests produits

## 🎨 Design

### Palette de Couleurs

- **Mauve Principal** : `#7443ff` - Couleur primaire
- **Mauve Clair** : `#a064ff` - Accents
- **Fond Blanc** : `#ffffff` - Arrière-plans
- **Texte Sombre** : `#1a1038` - Titres et textes principaux
- **Texte Secondaire** : `#666` - Textes secondaires

### Composants UI

- **Cartes Material** : Design moderne avec ombres et bordures arrondies
- **Grilles Responsive** : Adaptation automatique mobile/tablette/desktop
- **Animations** : Transitions fluides et effets hover
- **Icônes Material** : Bibliothèque d'icônes complète

## 📡 API Endpoints (Mock)

### Authentification

- `POST /api/auth/token/` - Connexion
- `POST /api/auth/token/refresh/` - Rafraîchissement token

### Produits

- `GET /api/products/` - Liste des produits (avec pagination, filtres)
- `GET /api/products/:id/` - Détails d'un produit
- `GET /api/products/:id/rating/` - Notes d'un produit

### Panier

- `POST /api/cart/validate/` - Validation du panier

### Commandes

- `POST /api/order/` - Création d'une commande
- `GET /api/orders/` - Liste des commandes utilisateur
- `GET /api/orders/:orderNumber/` - Détails d'une commande
- `GET /api/orders/:orderNumber/tracking/` - Suivi d'une commande

## 🗄️ État de l'Application (NgRx)

### Auth State

- `isAuthenticated` : Statut de connexion
- `loading` : État de chargement
- `error` : Messages d'erreur
- `token` : Token d'authentification

### Products State

- `items` : Liste des produits
- `count` : Nombre total de produits
- `loading` : État de chargement
- `error` : Messages d'erreur

### Cart State

- `items` : Articles du panier
- **Persistance** : Synchronisation automatique avec localStorage

### Orders State

- `currentOrder` : Commande actuellement consultée
- `currentTracking` : Suivi de la commande actuelle
- `userOrders` : Liste de toutes les commandes
- `loading` : État de chargement
- `trackingLoading` : État de chargement du suivi
- `error` : Messages d'erreur

## 🚀 Installation et Démarrage

### Prérequis

- Node.js 18+ et npm
- Angular CLI 18+

### Installation

```bash
npm install
```

### Démarrage

```bash
npm start
```

L'application sera accessible sur `http://localhost:4200`

### Build de Production

```bash
npm run build
```

### Tests

```bash
npm test
```

## 🔑 Identifiants de Test

Pour tester l'application, utilisez :

- **Username** : `demo`
- **Password** : `demo`

## 📦 Données Mock

### Produits

- 20 produits de test avec images Unsplash
- Prix variés de 2.5€ à 6.5€
- Notes et avis clients

### Commandes

- 3 commandes d'exemple avec différents statuts :
  - `ORD-1700000000000-123` - Livrée
  - `ORD-1700100000000-456` - En transit
  - `ORD-1700200000000-789` - Expédiée

## 🎯 Fonctionnalités Avancées

### Panier

- ✅ Ajout/Suppression de produits
- ✅ Modification des quantités
- ✅ Calcul automatique du total
- ✅ Persistance localStorage
- ✅ Badge avec compteur dans le header

### Checkout

- ✅ Validation du panier
- ✅ Formulaire d'adresse complet
- ✅ Confirmation avec numéro de commande
- ✅ Sauvegarde automatique de la commande

### Suivi de Commande

- ✅ Recherche par numéro de commande
- ✅ Affichage des produits avec photos
- ✅ Timeline de suivi interactive
- ✅ Statuts visuels colorés
- ✅ Informations de livraison

## 🧪 Storybook

Des stories Storybook sont disponibles pour :

- `CartItem` - Composant item de panier
- `ProductCard` - Composant carte produit
- `ProductDetails` - Composant détails produit

Lancez Storybook avec :

```bash
npm run storybook
```

## 📝 Notes de Développement

- Les données sont mockées avec MSW pour le développement
- Le panier est persisté dans localStorage
- Les commandes sont sauvegardées dans le store NgRx
- Toutes les routes protégées nécessitent une authentification
- Le design est entièrement responsive

## 🎨 Améliorations Futures

- [ ] Système de paiement intégré
- [ ] Gestion des favoris/wishlist
- [ ] Notifications en temps réel
- [ ] Chat support client
- [ ] Système de coupons et réductions
- [ ] Recommandations produits basées sur l'historique
- [ ] Export PDF des factures
- [ ] Multi-langues

## 📄 Licence

Ce projet est un projet éducatif/démonstration.

---

**Développé avec ❤️ en utilisant Angular et Material Design**
