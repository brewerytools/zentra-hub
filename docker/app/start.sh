#!/bin/bash
set -e

# Instala dependências se necessário
[ ! -d vendor ] && composer install --no-interaction
[ ! -d node_modules ] && npm install

# Sobe Vite em background
npm run dev -- --host &

# Sobe PHP-FPM em foreground
php-fpm
