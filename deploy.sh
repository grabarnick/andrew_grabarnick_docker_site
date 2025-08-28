#!/bin/bash

# Конфигурация
SERVER_IP="104.248.197.75"
SERVER_USER="root"
PROJECT_PATH="/root/andrew_grabarnick_docker_site"

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🚀 Начинаем деплой на сервер...${NC}"

# Проверка подключения к серверу
echo -e "${YELLOW}📡 Проверяем подключение к серверу...${NC}"
if ! ssh -o ConnectTimeout=10 $SERVER_USER@$SERVER_IP "echo 'Подключение успешно'"; then
    echo -e "${RED}❌ Не удалось подключиться к серверу${NC}"
    exit 1
fi

# Синхронизация файлов
echo -e "${YELLOW}📁 Синхронизируем файлы...${NC}"
rsync -avz --delete \
    --exclude '.git' \
    --exclude 'node_modules' \
    --exclude 'dist' \
    --exclude '.DS_Store' \
    ./ $SERVER_USER@$SERVER_IP:$PROJECT_PATH/

# Выполнение команд на сервере
echo -e "${YELLOW}🔧 Пересобираем и запускаем контейнеры...${NC}"
ssh $SERVER_USER@$SERVER_IP << 'EOF'
cd /root/andrew_grabarnick_docker_site
docker compose down
docker compose up --build -d
docker system prune -f
echo "✅ Деплой завершен!"
EOF

echo -e "${GREEN}🎉 Деплой успешно завершен!${NC}"
echo -e "${GREEN}🌐 Сайт доступен по адресу: https://grabarnick.com${NC}"
