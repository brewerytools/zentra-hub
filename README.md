# Zentra Hub — Guia de Uso e Instalação

Este projeto roda com Docker, Nginx, Laravel, React (Inertia) e SQLite.

## Requisitos

- Docker + Docker Compose
- Git

---

## Instalação

### 1. Clonar o projeto

```bash
git clone https://github.com/brewerytools/zentra-hub.git
cd zentra-hub
```

---

### 2. Subir o ambiente

```bash
docker compose up -d --build
```

O `start.sh` já roda automaticamente `composer install` e `npm install` na primeira vez.

---

### 3. Criar o banco SQLite

Rode esse comando **fora do container**, na raiz do projeto:

```bash
touch database/database.sqlite
```

---

### 4. Entrar no container

```bash
docker compose exec app bash
```

---

### 5. Configurar o ambiente

```bash
cp .env.example .env
php artisan key:generate
```

---

### 6. Rodar as migrations

```bash
chown www-data:www-data database/database.sqlite
chown www-data:www-data database
php artisan migrate
```

---

### 7. Acessar o sistema

| Serviço | URL |
|---|---|
| Aplicação | http://localhost:8000 |

---

## Configuração do .env

```env
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=sqlite
DB_DATABASE=/var/www/database/database.sqlite

SESSION_DRIVER=cookie
CACHE_STORE=array
QUEUE_CONNECTION=sync
```

> `DB_DATABASE` aponta para o caminho **dentro do container**, não no seu sistema.

---

## Comandos Úteis

Todos os comandos rodam **dentro do container** (`docker compose exec app bash`):

```bash
# Migrations
php artisan migrate
php artisan migrate:fresh --seed

# Cache
php artisan optimize:clear
php artisan optimize
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Rotas
php artisan route:list
```

