    FROM php:8.2-fpm-alpine AS php

    RUN apk add --no-cache \
        git \
        unzip \
        libzip-dev \
        oniguruma-dev \
        autoconf \
        g++ \
        make && \
        docker-php-ext-install pdo pdo_sqlite zip mbstring
    
    WORKDIR /app
    RUN php -r "copy('https://getcomposer.org/installer','composer-setup.php');" && \
        php composer-setup.php --install-dir=/usr/bin --filename=composer
    
    COPY composer.json composer.lock ./
    RUN composer install --no-dev --optimize-autoloader --no-interaction
    
    COPY . .
    
    RUN php artisan migrate --seed --force
    
    FROM node:18-alpine AS node
    WORKDIR /app
    COPY package.json package-lock.json ./
    RUN npm ci
    COPY . .
    RUN npm run build
    
    FROM php:8.2-fpm-alpine
    WORKDIR /app
    
    COPY --from=php /app /app
    COPY --from=node /app/public /app/public
    
    RUN chown -R www-data:www-data /app
    
    EXPOSE 9000
    CMD ["php-fpm"]
    