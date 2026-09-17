# Etapa 1: Compilación de Angular
FROM node:22-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

# Usar el index.csr.html real como index.html para la SPA y remover carpetas prerenderizadas de redirección
RUN if [ -f dist/Frontend-CK/browser/index.csr.html ]; then \
      cp dist/Frontend-CK/browser/index.csr.html dist/Frontend-CK/browser/index.html; \
      rm -rf dist/Frontend-CK/browser/dashboard \
             dist/Frontend-CK/browser/inspeccion \
             dist/Frontend-CK/browser/login \
             dist/Frontend-CK/browser/mantenimiento \
             dist/Frontend-CK/browser/maquinas \
             dist/Frontend-CK/browser/settings \
             dist/Frontend-CK/browser/stock-agujas \
             dist/Frontend-CK/browser/usuarios; \
    fi

# Etapa 2: Servidor Nginx ligero
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/Frontend-CK/browser /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
