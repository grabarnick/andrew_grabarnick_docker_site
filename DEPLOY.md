# 🚀 Автоматический деплой

Этот проект настроен для автоматического деплоя на DigitalOcean.

## 📋 Быстрый старт

### 1. Настройка (один раз)
```bash
# Запустите мастер-скрипт настройки
chmod +x setup-deploy.sh
./setup-deploy.sh
```

### 2. Деплой
```bash
# Простой деплой
./deploy.sh

# Продвинутый деплой с проверками
./deploy-advanced.sh
```

## 🔧 Конфигурация

### Файлы конфигурации:
- `deploy.sh` - Простой скрипт деплоя
- `deploy-advanced.sh` - Продвинутый скрипт с проверками
- `deploy-config.sh` - Конфигурация
- `.github/workflows/deploy.yml` - GitHub Actions

### Переменные окружения:
- `SERVER_IP` - IP адрес сервера
- `SERVER_USER` - Пользователь сервера (root)
- `PROJECT_PATH` - Путь к проекту на сервере
- `DOMAIN` - Домен сайта

## 🎯 Workflow

### Ежедневная разработка:
1. Внесите изменения в код
2. Протестируйте локально: `npm run dev`
3. Задеплойте: `./deploy.sh`

### С GitHub Actions:
1. Внесите изменения
2. Закоммитьте: `git add . && git commit -m "Update"`
3. Запушьте: `git push origin main`
4. GitHub Actions автоматически задеплоит

## 🔍 Мониторинг

### Проверка статуса:
```bash
# Статус контейнеров
ssh root@YOUR_SERVER_IP "cd /root/andrew_grabarnick_docker_site && docker compose ps"

# Логи
ssh root@YOUR_SERVER_IP "cd /root/andrew_grabarnick_docker_site && docker compose logs web"
```

### Проверка сайта:
```bash
# HTTP статус
curl -I https://grabarnick.com

# Проверка SSL
curl -I https://grabarnick.com
```

## 🛠️ Устранение неполадок

### Проблемы с SSH:
```bash
# Проверка подключения
ssh -v root@YOUR_SERVER_IP

# Пересоздание ключей
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
ssh-copy-id root@YOUR_SERVER_IP
```

### Проблемы с Docker:
```bash
# На сервере
docker compose down
docker system prune -f
docker compose up --build -d
```

### Откат к предыдущей версии:
```bash
# На сервере
ssh root@YOUR_SERVER_IP
cd /root/andrew_grabarnick_docker_site
git log --oneline
git checkout <commit-hash>
docker compose up --build -d
```

## 📊 GitHub Actions

### Настройка секретов:
1. Зайдите в GitHub репозиторий
2. Settings → Secrets and variables → Actions
3. Добавьте:
   - `HOST`: IP адрес сервера
   - `USERNAME`: root
   - `SSH_KEY`: содержимое ~/.ssh/id_rsa

### Автоматический деплой:
- При push в ветку `main` или `master`
- Автоматическая пересборка и перезапуск контейнеров
- Очистка неиспользуемых Docker образов

## 🔒 Безопасность

### SSH ключи:
- Используйте RSA 4096-bit ключи
- Никогда не коммитьте приватные ключи
- Регулярно обновляйте ключи

### Сервер:
- Обновляйте систему: `apt update && apt upgrade`
- Настройте firewall: `ufw enable`
- Используйте Cloudflare для дополнительной защиты

## 📈 Производительность

### Оптимизация:
- Cloudflare CDN включен
- Кэширование статических файлов
- Сжатие gzip
- Минификация CSS/JS

### Мониторинг:
- Cloudflare Analytics
- Docker stats: `docker stats`
- Логи Nginx: `docker compose logs web`
