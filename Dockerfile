FROM php:8.2-fpm-alpine AS php

# 1) Actualizamos índices y agregamos las dependencias build + libs PHP
RUN apk update && apk add --no-cache \
    bash \
    git \
    unzip \
    libzip-dev \
    oniguruma-dev \
    autoconf \
    g++ \
    make \
  && docker-php-ext-configure zip \
  && docker-php-ext-install \
       pdo \
       pdo_sqlite \
       zip \
       mbstring \
  && rm -rf /var/cache/apk/*

WORKDIR /app

# Installer Composer
RUN php -r "copy('https://getcomposer.org/installer','composer-setup.php');" \
 && php composer-setup.php --install-dir=/usr/bin --filename=composer \
 && rm composer-setup.php

# Instalamos dependencias PHP sin dev
COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Copiamos el resto y migramos
COPY . .
RUN php artisan migrate --force

# Build de assets
FROM node:18-alpine AS node
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Imagen final
FROM php:8.2-fpm-alpine
WORKDIR /app

COPY --from=php /app /app
COPY --from=node /app/public /app/public

RUN chown -R www-data:www-data /app

EXPOSE 9000
CMD ["php-fpm"]
