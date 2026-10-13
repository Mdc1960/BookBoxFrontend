
# Étape 1 : compilation Angular
FROM node:22-alpine AS build

WORKDIR /app/bookbox_frontend

# Copier les fichiers de dépendances
COPY bookbox_frontend/package*.json ./
RUN npm ci

# Copier le code Angular
COPY bookbox_frontend/ ./

# Compiler l'application en production
RUN npm run build

# Étape 2 : serveur web Nginx
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/bookbox_frontend/dist/bookbox_frontend/browser/ /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
