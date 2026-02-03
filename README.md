Zentra hub

- configurar o .env: descomentar a linha DB_DATABASE e colocar o caminho do banco sqlite criado.

- composer install
- npm install
- docker compose up --build --watch
- docker compose exec app php artisan key:generate
- docker compose exec app php artisan migrate
- docker compose exec app php artisan db:seed
- npm run dev
- acessar localhost:8000