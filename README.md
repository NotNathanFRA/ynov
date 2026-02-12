# 🚀 Ynov

Une application web interactive pour découvrir des destinations de voyage et passer un quiz de sélection personnalisée.

---

## 🚀 Table des matières

- [🔍 Présentation](#-présentation)
- [🧰 Technologies utilisées](#-technologies-utilisées)
- [🔧 Installation](#-installation)
- [▶️ Lancer en local](#️-lancer-en-local)
- [📦 Compiler / Build](#-compiler--build)
- [📁 Structure du projet](#-structure-du-projet)
- [🤝 Contribuer](#-contribuer)
- [📝 Licence](#-licence)

---

## 🔍 Présentation

Ynov est une application web construite avec React et TypeScript qui permet aux utilisateurs de :

- **Découvrir des destinations** de voyage avec une interface élégante et animée
- **Participer à un quiz** interactif pour obtenir des recommandations personnalisées
- **Visualiser les résultats** sur une page de confirmation
- **Naviguer facilement** entre les différentes sections de l'application

L'application met l'accent sur l'expérience utilisateur avec des animations fluides et un design moderne.

---

## 🧰 Technologies utilisées

| Catégorie | Technologies |
|-----------|-------------|
| **Frontend** | React 18.3, TypeScript 5.5 |
| **Build Tool** | Vite 5.4 |
| **Routing** | React Router DOM 6.16 |
| **Styling** | Tailwind CSS 3.4, PostCSS |
| **Animations** | Framer Motion 12.34 |
| **UI Icons** | Lucide React 0.344 |
| **Backend** | Supabase 2.57 |
| **Linting** | ESLint 9.9 |
| **Typage** | TypeScript 5.5 |

---

## 🔧 Installation

### Prérequis

- **Node.js** version 16+ 
- **npm** ou **yarn** (npm recommandé)
- Git

### Étapes

1. **Cloner le repository**
   ```bash
   git clone <votre-repo-url>
   cd ynov
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configurer les variables d'environnement** (si nécessaire pour Supabase)
   ```bash
   cp .env.example .env.local
   # Remplissez les variables Supabase
   ```

---

## ▶️ Lancer en local

### Mode développement

Lancez le serveur de développement :

```bash
npm run dev
```

L'application sera accessible à `http://localhost:5173` (port Vite par défaut).

### Vérifier la qualité du code

```bash
npm run lint        # Vérifier les erreurs ESLint
npm run typecheck   # Vérifier les types TypeScript
```

---

## 📦 Compiler / Build

### Générer la version de production

```bash
npm run build
```

Cela crée un dossier `dist/` optimisé et prêt pour le déploiement.

### Prévisualiser la build

```bash
npm run preview
```

Permet de tester la version compilée localement avant le déploiement.

---

## 📁 Structure du projet

```
ynov/
├── src/
│   ├── components/          # Composants React réutilisables
│   │   ├── Chatbot.tsx      # Composant chatbot interactif
│   │   ├── Destinations.tsx # Affichage des destinations
│   │   ├── Hero.tsx         # Section héro d'accueil
│   │   └── Quiz.tsx         # Quiz interactif
│   ├── pages/               # Pages de l'application
│   │   ├── ConfirmationPage.tsx  # Page de résultats
│   │   └── DestinationPage.tsx   # Page détail destination
│   ├── assets/              # Ressources statiques
│   │   └── images/          # Images du projet
│   ├── App.tsx              # Composant racine
│   ├── main.tsx             # Point d'entrée
│   ├── index.css            # Styles globaux
│   └── vite-env.d.ts        # Déclarations de types Vite
├── public/                  # Fichiers statiques
├── package.json             # Dépendances du projet
├── vite.config.ts           # Configuration Vite
├── tailwind.config.js       # Configuration Tailwind CSS
├── postcss.config.js        # Configuration PostCSS
├── tsconfig.json            # Configuration TypeScript
└── eslint.config.js         # Configuration ESLint
```

---

## 🤝 Contribuer

Les contributions sont les bienvenues ! Pour contribuer :

1. **Fork** le projet
2. **Créer une branche** pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. **Commiter** vos changements (`git commit -m 'Add some AmazingFeature'`)
4. **Pousser** vers la branche (`git push origin feature/AmazingFeature`)
5. **Ouvrir une Pull Request**

### Standards de code

- Respecter les règles ESLint : `npm run lint`
- Vérifier la cohérence des types : `npm run typecheck`
- Utiliser des composants fonctionnels avec Hooks
- Suivre les conventions de nommage TypeScript

---

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

---

**Développé avec ❤️ par la communauté Ynov**
