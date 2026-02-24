# Portfolio - Sitraka Harinjaka

Site CV/portfolio personnel avec dashboard admin, tracking visiteurs et API documentée.

## Architecture

```
personnalSite/
├── frontend/        → Next.js 15 (Site public)         → Port 3000
├── dashboard/       → React 19 + Vite (Admin)          → Port 5173 (dev) / 4173 (prod)
├── backend/         → Express + Prisma + TypeScript     → Port 3001
├── nginx/           → Reverse proxy                     → Port 80
└── docker-compose.yml
```

## Stack technique

| Couche | Technologies |
|--------|-------------|
| Frontend | Next.js 15, Tailwind CSS, TypeScript, Framer Motion |
| Dashboard | React 19, Vite, Tailwind CSS, Recharts, React Router v7 |
| Backend | Express 4, TypeScript, Prisma ORM, Zod, JWT |
| Base de données | PostgreSQL 16 |
| Email | Nodemailer (Gmail SMTP) |
| Conteneurisation | Docker, Docker Compose, Nginx |

## Prérequis

- [Docker](https://docs.docker.com/get-docker/) et [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js 22+](https://nodejs.org/) (uniquement pour le développement local)
- Un compte Gmail avec [App Password](https://myaccount.google.com/apppasswords) pour l'envoi d'emails

---

## Lancement rapide avec Docker (Production)

### 1. Configurer les variables d'environnement

```bash
cp .env.example .env
```

Éditer le fichier `.env` et remplir les valeurs :

```env
# Base de données
DB_USER=portfolio_user
DB_PASSWORD=un_mot_de_passe_securise

# JWT - Générer des clés aléatoires
JWT_SECRET=votre_cle_secrete_jwt_min_32_caracteres
JWT_REFRESH_SECRET=votre_cle_refresh_secrete_min_32_caracteres

# Gmail SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=sitrakaharinjaka@gmail.com
SMTP_PASS=votre_app_password_gmail

# Admin
ADMIN_EMAIL=sitrakaharinjaka@gmail.com
ADMIN_INITIAL_PASSWORD=votre_mot_de_passe_admin
```

> **Gmail App Password** : Allez dans [Google Account > Sécurité > Mots de passe des applications](https://myaccount.google.com/apppasswords), créez un mot de passe pour "Mail" et copiez-le dans `SMTP_PASS`.

### 2. Lancer tous les services

```bash
docker compose up --build -d
```

Cette commande :
- Télécharge l'image PostgreSQL 16
- Build le backend (Node.js), le frontend (Next.js) et le dashboard (React)
- Lance les migrations Prisma et le seed de la base de données
- Démarre Nginx comme reverse proxy

### 3. Accéder aux services

| Service | URL |
|---------|-----|
| Site public | [http://localhost](http://localhost) |
| Dashboard admin | [http://localhost/admin/](http://localhost/admin/) |
| API | [http://localhost/api/health](http://localhost/api/health) |
| Documentation API (Swagger) | [http://localhost/api-docs](http://localhost/api-docs) |

### 4. Identifiants admin par défaut

- **Email** : `sitrakaharinjaka@gmail.com`
- **Mot de passe** : celui défini dans `ADMIN_INITIAL_PASSWORD` dans `.env`

### 5. Commandes Docker utiles

```bash
# Voir les logs de tous les services
docker compose logs -f

# Voir les logs d'un service spécifique
docker compose logs -f backend
docker compose logs -f frontend

# Arrêter tous les services
docker compose down

# Arrêter et supprimer les volumes (reset la base de données)
docker compose down -v

# Reconstruire un service spécifique
docker compose up --build backend -d

# Accéder au shell d'un container
docker compose exec backend sh
docker compose exec postgres psql -U portfolio_user -d portfolio
```

---

## Développement local (sans Docker complet)

### 1. Lancer PostgreSQL uniquement via Docker

```bash
docker compose -f docker-compose.dev.yml up postgres -d
```

### 2. Installer les dépendances

```bash
cd backend && npm install
cd ../frontend && npm install
cd ../dashboard && npm install
```

### 3. Configurer la base de données

```bash
cd backend

# Créer les tables
npx prisma migrate dev --name init

# Insérer les données initiales (admin + CV)
npx prisma db seed

# (Optionnel) Ouvrir Prisma Studio pour visualiser les données
npx prisma studio
```

### 4. Lancer les 3 services

Ouvrir 3 terminaux :

```bash
# Terminal 1 - Backend (port 3001)
cd backend && npm run dev

# Terminal 2 - Frontend (port 3000)
cd frontend && npm run dev

# Terminal 3 - Dashboard (port 5173)
cd dashboard && npm run dev
```

### 5. URLs en développement

| Service | URL |
|---------|-----|
| Site public | [http://localhost:3000](http://localhost:3000) |
| Dashboard admin | [http://localhost:5173](http://localhost:5173) |
| API | [http://localhost:3001/api/health](http://localhost:3001/api/health) |
| Swagger | [http://localhost:3001/api-docs](http://localhost:3001/api-docs) |
| Prisma Studio | [http://localhost:5555](http://localhost:5555) |

---

## API Endpoints

### Publics (sans authentification)

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `GET` | `/api/health` | Health check |
| `GET` | `/api/biography` | Biographie |
| `GET` | `/api/skills` | Compétences |
| `GET` | `/api/education` | Formation |
| `GET` | `/api/experiences` | Expériences |
| `GET` | `/api/services` | Services |
| `GET` | `/api/social-links` | Liens sociaux |
| `POST` | `/api/contacts` | Envoyer un message (formulaire de contact) |
| `POST` | `/api/track` | Tracker une visite |

### Authentification

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `POST` | `/api/auth/login` | Connexion (retourne JWT) |
| `POST` | `/api/auth/refresh` | Rafraîchir le token |
| `GET` | `/api/auth/me` | Profil utilisateur connecté |
| `PUT` | `/api/auth/password` | Changer le mot de passe |

### Admin (JWT requis)

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `PUT` | `/api/admin/biography` | Modifier la biographie |
| `POST/PUT/DELETE` | `/api/admin/skills/:id` | CRUD compétences |
| `POST/PUT/DELETE` | `/api/admin/education/:id` | CRUD formation |
| `POST/PUT/DELETE` | `/api/admin/experiences/:id` | CRUD expériences |
| `POST/PUT/DELETE` | `/api/admin/services/:id` | CRUD services |
| `POST/PUT/DELETE` | `/api/admin/social-links/:id` | CRUD liens sociaux |
| `GET` | `/api/admin/contacts` | Liste des messages |
| `PUT` | `/api/admin/contacts/:id/read` | Marquer comme lu |
| `DELETE` | `/api/admin/contacts/:id` | Supprimer un message |
| `GET` | `/api/admin/visitors` | Liste des visiteurs |
| `GET` | `/api/admin/analytics/visits` | Courbe de visites |
| `GET` | `/api/admin/analytics/referrers` | Top referrers |
| `GET` | `/api/admin/analytics/summary` | Statistiques résumées |

> Documentation interactive complète disponible sur `/api-docs` (Swagger UI).

---

## Base de données

### Tables

| Table | Description |
|-------|-------------|
| `users` | Comptes admin (email, mot de passe bcrypt) |
| `biography` | Informations personnelles (singleton) |
| `skills` | Compétences avec pourcentage et catégorie |
| `education` | Parcours scolaire |
| `experiences` | Expériences professionnelles |
| `services` | Services proposés (3 cartes) |
| `contacts` | Messages du formulaire de contact |
| `visitors` | Tracking des visiteurs (IP, géoloc, referrer) |
| `social_links` | Liens réseaux sociaux |

### Commandes Prisma utiles

```bash
cd backend

# Créer une migration après modification du schéma
npx prisma migrate dev --name description_du_changement

# Réinitialiser la base (supprime toutes les données)
npx prisma migrate reset

# Visualiser les données
npx prisma studio

# Régénérer le client Prisma
npx prisma generate
```

---

## Fonctionnalités

### Site public (Frontend)
- Design responsive (mobile, tablet, desktop)
- Thème dark navy avec accents cyan/teal
- SEO optimisé (meta tags, JSON-LD, sitemap, robots.txt)
- Contenu dynamique depuis l'API
- Formulaire de contact avec validation
- Animations au scroll (Intersection Observer)
- Section "Mes parcours" avec slider tabbed (Biographie / Skills / Éducation)

### Dashboard Admin
- Authentification JWT (access + refresh tokens)
- Tableau de bord avec graphiques analytics (Recharts)
- Courbe de visites sur 30 jours
- Graphique des top referrers
- Table des visiteurs avec IP, localisation, date
- Inbox messages avec statut lu/non-lu
- CRUD complet pour tout le contenu du CV
- Sidebar responsive avec badge notifications

### Backend API
- Documentation Swagger auto-générée
- Validation des données (Zod)
- Rate limiting (protection anti-spam)
- Tracking visiteurs avec géolocalisation IP (ip-api.com)
- Notification email lors d'un nouveau message (Nodemailer/Gmail)
- Authentification JWT avec refresh token
- Gestion d'erreurs centralisée

---

## Déploiement en production

### Avec un VPS (recommandé)

1. Installer Docker et Docker Compose sur le serveur
2. Cloner le repo et configurer `.env`
3. Lancer `docker compose up --build -d`
4. Configurer un nom de domaine pointant vers le serveur
5. Ajouter SSL avec Let's Encrypt (modifier `nginx/conf.d/default.conf`)

### Variables d'environnement à modifier en production

```env
NODE_ENV=production
JWT_SECRET=une_cle_tres_longue_et_aleatoire
JWT_REFRESH_SECRET=une_autre_cle_tres_longue
DB_PASSWORD=un_mot_de_passe_tres_securise
ADMIN_INITIAL_PASSWORD=un_mot_de_passe_fort
```

---

## Licence

Projet personnel - Sitraka Harinjaka
