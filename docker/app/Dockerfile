FROM php:8.4-fpm

# Node 20 via nodesource
RUN apt-get update && apt-get install -y curl gnupg && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y \
      nodejs git libpng-dev libonig-dev libxml2-dev \
      libzip-dev zip unzip sqlite3 libsqlite3-dev && \
    docker-php-ext-install pdo_sqlite mbstring exif pcntl bcmath gd zip sockets && \
    rm -rf /var/lib/apt/lists/*

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

COPY docker/app/custom.ini /usr/local/etc/php/conf.d/custom.ini
COPY docker/app/start.sh /start.sh
RUN chmod +x /start.sh

CMD ["/start.sh"]
