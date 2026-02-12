
# Zentra Hub — Guia de Uso e Instalação

Este projeto roda com Docker, Nginx, Laravel, React (Inertia) e SQLite.

## Requisitos
- Docker + Docker Compose
- Git

---

## 1. Clonar o projeto

```bash
git clone https://github.com/brewerytools/zentra-hub.git
cd zentra-hub
```

---

## 2. Subir o ambiente

```bash
docker compose up -d --build
```

---

## 3. Criar o banco SQLite (fora do container)

```bash
touch database/database.sqlite
```

---

## 4. Entrar no container do Laravel

```bash
docker exec -it laravel_app_zentra bash
```

---

## 5. Instalar dependências

```bash
composer install
```

---

## 6. Gerar a chave da aplicação

```bash
php artisan key:generate
```

---

## 7. Rodar as migrations

```bash
php artisan migrate
```

---

## 8. Limpar e otimizar

```bash
php artisan optimize:clear
php artisan optimize
```

---

## 9. Acessar o sistema

Aplicação:  
http://localhost:8000

Frontend (Vite):  
http://localhost:5173

---


---

## Configuração do .env (importante)

Antes de rodar o projeto, confira se o arquivo `.env` está assim para ambiente local com SQLite:

```env
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost

DB_CONNECTION=sqlite
DB_DATABASE=/var/www/database/database.sqlite

SESSION_DRIVER=file
CACHE_STORE=file
QUEUE_CONNECTION=sync
```

### O que isso significa

- `DB_DATABASE`: aponta para o caminho **dentro do container**
- `SESSION_DRIVER=file`: sessões salvas em arquivo (mais leve no dev)
- `CACHE_STORE=file`: cache em arquivo (evita dependências extras)
- `QUEUE_CONNECTION=sync`: filas rodam na hora (sem worker)

Essas opções deixam o projeto mais leve no ambiente de desenvolvimento

## Observações Importantes

- O banco é SQLite e está em:
  /var/www/database/database.sqlite

- O Vite já sobe automaticamente com o Docker.

- Cache, sessão e filas estão em modo **file/sync** para ambiente local.

---

## Comandos Úteis (dentro do container)

```bash
php artisan migrate:fresh --seed
php artisan config:clear
php artisan route:clear
php artisan view:clear
php artisan optimize
```

