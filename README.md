# Portfolio Aymane El Badry — Full Stack

Application web full stack pour le portfolio d'Aymane El Badry, avec panel d'administration sécurisé.

## Stack Technique

| Couche | Technologies |
|--------|-------------|
| **Front-end** | React + Vite + Tailwind CSS v4 |
| **Back-end** | Node.js + Express |
| **Base de données** | MongoDB (Atlas) |
| **Auth** | JWT (JSON Web Tokens) |

## Installation

### Prérequis
- Node.js 18+
- MongoDB Atlas (gratuit) ou MongoDB local

### 1. Cloner le repo
```bash
git clone <repo-url>
cd portfolio
```

### 2. Configurer les variables d'environnement

**Serveur :**
```bash
cp server/.env.example server/.env
# Éditer server/.env avec votre URI MongoDB et JWT secret
```

**Client :**
```bash
cp client/.env.example client/.env
# Éditer client/.env si nécessaire
```

### 3. Installer les dépendances
```bash
cd server && npm install
cd ../client && npm install
```

### 4. Peupler la base de données
```bash
cd server && npm run seed
```
> Admin par défaut : `admin@portfolio.com` / `Admin123!`

### 5. Lancer en développement
```bash
# Terminal 1 — Serveur (port 5000)
cd server && npm run dev

# Terminal 2 — Client (port 5173)
cd client && npm run dev
```

## Déploiement Gratuit

### Back-end → Render.com
1. Créer un « Web Service » pointant vers le dossier `server/`
2. Build: `npm install`
3. Start: `npm start`
4. Ajouter les variables d'environnement (MONGODB_URI, JWT_SECRET, CLIENT_URL)

### Front-end → Vercel
1. Importer le repo, configurer le root directory: `client/`
2. Build: `npm run build`, Output: `dist`
3. Ajouter `VITE_API_URL` pointant vers l'URL Render

### Base de données → MongoDB Atlas
1. Créer un cluster gratuit M0
2. Copier l'URI de connexion dans `MONGODB_URI`
