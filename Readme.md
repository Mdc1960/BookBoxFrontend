#  Gestion de Boîtes à Livres — Frontend

## Description : 

Ce dépôt contient la partie **Frontend** du projet **Gestion de Boîtes à Livres**.  
L’application permet aux utilisateurs d’interagir avec les **API backend** afin de gérer les boîtes à livres, les réservations et les utilisateurs via une interface web moderne.

## Réalisé par

- COULIBALY Mamadou
- MERABTENE Radia



## Technologies utilisées

- Angular 17
- Node.js version v22.17.0
- npm version 10.9.2
- TypeScript
- HTML / CSS

 
##  Architecture du projet

```text
/src
 ├── /app
 │    ├── /services
 │    │     ├── Services CRUD pour les API
 │    │     └── Service d’authentification (JWT)
 │    ├── /components
 │    │     └── Composants liés aux entités métiers
 │    ├── /initial-page
 │    │     └── Page d’accueil
 │    ├── /add-element-component
 │    │     └── Ajout d’utilisateurs, boîtes et réservations
 │    ├── /global-forms
 │    │     └── Les differents formulaires pour la création et modification des entités 
 │    ├── /update-element-component
 │    │     └── Composants pour la modification des entités existantes
 │    ├── app.component.ts
 │    │     └── Composant racine de l’application
 │    └── app.routes.ts
 │          └── Configuration des routes
 │
 ├── /images
 │     └── Images utilisées dans l’interface
 │
 ├── /assets
 │     └── Ressources statiques (vide)
 │
 ├── angular.json
 │     └── Configuration Angular
 │
 ├── package.json
 │     └── Dépendances du projet
 │
 └── proxy-config.json
       └── Connexion avec le backend
```
## Installation et lancement
## 1.Prérequis
- Node.js
- Angular CLI 17
- npm
- un environnement : Windows 10+ ou macOS (de preference car le projet a été développé sur ses environnements)
## 2. Lancement du projet :
- a) cloner le dépot en utilisant l'url Https de ce dépot.
  https://github.com/rdVirgo/BookBox_frontend.git
- b) installer les dépendances : npm install 
- c) ng serve : pour lancer l'application , l'application sera accessible sur l'adresse suivante 
  http://localhost:4200
-   d) pour la releir à la partie backend : 
  excuter : ng serve --proxy-config proxy-config.json

 "ça y est vous pouvez tester l'application !"
"
