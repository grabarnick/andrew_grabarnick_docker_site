#!/bin/bash

# Конфигурация
SERVER_IP="104.248.197.75"
SERVER_USER="root"
PROJECT_PATH="/root/andrew_grabarnick_docker_site"
DOMAIN="grabarnick.com"

# Цвета
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Функция для логирования
log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
    exit 1
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Проверка зависимостей
check_dependencies() {
    log "Проверяем зависимости..."
    
    if ! command -v rsync &> /dev/null; then
        error "rsync не установлен. Установите: brew install rsync"
    fi
    
    if ! command -v ssh &> /dev/null; then
        error "ssh не установлен"
    fi
    
    success "Все зависимости установлены"
}

# Проверка подключения
check_connection() {
    log "Проверяем подключение к серверу..."
    
    if ! ssh -o ConnectTimeout=10 -o BatchMode=yes $SERVER_USER@$SERVER_IP "echo 'OK'" &> /dev/null; then
        error "Не удалось подключиться к серверу. Проверьте SSH ключи и доступность сервера"
    fi
    
    success "Подключение к серверу установлено"
}

# Локальная сборка для проверки
local_build_test() {
    log "Тестируем локальную сборку..."
    
    if ! npm run build; then
        error "Локальная сборка не удалась. Исправьте ошибки перед деплоем"
    fi
    
    success "Локальная сборка успешна"
}

# Синхронизация файлов
sync_files() {
    log "Синхронизируем файлы с сервером..."
    
    rsync -avz --delete \
        --exclude '.git' \
        --exclude 'node_modules' \
        --exclude 'dist' \
        --exclude '.DS_Store' \
        --exclude '.env' \
        --exclude 'deploy*.sh' \
        ./ $SERVER_USER@$SERVER_IP:$PROJECT_PATH/
    
    success "Файлы синхронизированы"
}

# Деплой на сервере
deploy_on_server() {
    log "Выполняем деплой на сервере..."
    
    ssh $SERVER_USER@$SERVER_IP << EOF
set -e
cd $PROJECT_PATH

# Остановка контейнеров
echo "Останавливаем контейнеры..."
docker compose down

# Пересборка и запуск
echo "Пересобираем и запускаем контейнеры..."
docker compose up --build -d

# Очистка неиспользуемых образов
echo "Очищаем неиспользуемые Docker образы..."
docker system prune -f

# Проверка статуса
echo "Проверяем статус контейнеров..."
docker compose ps

echo "✅ Деплой на сервере завершен!"
EOF
    
    success "Деплой на сервере выполнен"
}

# Проверка работоспособности
health_check() {
    log "Проверяем работоспособность сайта..."
    
    sleep 10  # Ждем запуска контейнеров
    
    if curl -f -s https://$DOMAIN > /dev/null; then
        success "Сайт доступен по адресу: https://$DOMAIN"
    else
        warning "Сайт может быть недоступен. Проверьте логи: ssh $SERVER_USER@$SERVER_IP 'cd $PROJECT_PATH && docker compose logs web'"
    fi
}

# Основная функция
main() {
    echo -e "${BLUE}🚀 Начинаем автоматический деплой${NC}"
    echo -e "${BLUE}📋 Сервер: $SERVER_USER@$SERVER_IP${NC}"
    echo -e "${BLUE}📁 Путь: $PROJECT_PATH${NC}"
    echo -e "${BLUE}🌐 Домен: $DOMAIN${NC}"
    echo ""
    
    check_dependencies
    check_connection
    local_build_test
    sync_files
    deploy_on_server
    health_check
    
    echo ""
    success "🎉 Деплой полностью завершен!"
    echo -e "${GREEN}🌐 Сайт доступен: https://$DOMAIN${NC}"
}

# Запуск
main "$@"
