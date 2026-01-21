
FROM php:8.4-fpm

RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    zip \
    unzip \
    sqlite3 \
    libsqlite3-dev \
    && rm -rf /var/lib/apt/lists/* \

    && docker-php-ext-install pdo_sqlite pdo_mysql mbstring exif pcntl bcmath gd sockets zip


COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www