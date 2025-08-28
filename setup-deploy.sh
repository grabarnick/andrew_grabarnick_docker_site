#!/bin/bash

# Мастер-скрипт для настройки автоматического деплоя

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🚀 Настройка автоматического деплоя${NC}"
echo ""

# Проверка, что мы в правильной директории
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Запустите скрипт из корневой папки проекта${NC}"
    exit 1
fi

# Запрос IP сервера
echo -e "${YELLOW}📡 Введите IP адрес вашего сервера:${NC}"
read -p "IP: " SERVER_IP

if [ -z "$SERVER_IP" ]; then
    echo -e "${RED}❌ IP адрес не может быть пустым${NC}"
    exit 1
fi

# Обновление конфигурации в файлах
echo -e "${YELLOW}🔧 Обновляем конфигурацию...${NC}"

# Обновляем deploy.sh
sed -i.bak "s/YOUR_ACTUAL_SERVER_IP/$SERVER_IP/g" deploy.sh
sed -i.bak "s/YOUR_ACTUAL_SERVER_IP/$SERVER_IP/g" deploy-advanced.sh
sed -i.bak "s/YOUR_ACTUAL_SERVER_IP/$SERVER_IP/g" deploy-config.sh

# Удаляем backup файлы
rm -f deploy.sh.bak deploy-advanced.sh.bak deploy-config.sh.bak

# Проверка SSH ключей
echo -e "${YELLOW}🔑 Проверяем SSH ключи...${NC}"

if [ ! -f ~/.ssh/id_rsa ]; then
    echo -e "${YELLOW}🔑 Генерируем SSH ключ...${NC}"
    ssh-keygen -t rsa -b 4096 -C "agrabarnick@gmail.com" -f ~/.ssh/id_rsa -N ""
    echo -e "${GREEN}✅ SSH ключ создан${NC}"
else
    echo -e "${GREEN}✅ SSH ключ уже существует${NC}"
fi

# Копирование ключа на сервер
echo -e "${YELLOW}📤 Копируем SSH ключ на сервер...${NC}"
if ssh-copy-id -o ConnectTimeout=10 root@$SERVER_IP; then
    echo -e "${GREEN}✅ SSH ключ скопирован на сервер${NC}"
else
    echo -e "${RED}❌ Не удалось скопировать SSH ключ. Проверьте подключение к серверу${NC}"
    echo -e "${YELLOW}💡 Попробуйте вручную: ssh-copy-id root@$SERVER_IP${NC}"
fi

# Создание исполняемых файлов
echo -e "${YELLOW}🔧 Настраиваем права доступа...${NC}"
chmod +x deploy.sh
chmod +x deploy-advanced.sh
chmod +x deploy-config.sh
chmod +x .git/hooks/post-commit

# Тест подключения
echo -e "${YELLOW}🧪 Тестируем подключение к серверу...${NC}"
if ssh -o ConnectTimeout=10 root@$SERVER_IP "echo 'Подключение успешно'"; then
    echo -e "${GREEN}✅ Подключение к серверу работает${NC}"
else
    echo -e "${RED}❌ Не удалось подключиться к серверу${NC}"
    echo -e "${YELLOW}💡 Проверьте:${NC}"
    echo "   - IP адрес сервера"
    echo "   - SSH ключи"
    echo "   - Доступность сервера"
fi

# Создание .gitignore для деплоя
echo -e "${YELLOW}📝 Обновляем .gitignore...${NC}"
if ! grep -q "deploy-config.sh" .gitignore; then
    echo "" >> .gitignore
    echo "# Deploy config" >> .gitignore
    echo "deploy-config.sh" >> .gitignore
fi

echo ""
echo -e "${GREEN}🎉 Настройка завершена!${NC}"
echo ""
echo -e "${BLUE}📋 Доступные команды:${NC}"
echo -e "${GREEN}  ./deploy.sh${NC}           - Простой деплой"
echo -e "${GREEN}  ./deploy-advanced.sh${NC}  - Продвинутый деплой с проверками"
echo -e "${GREEN}  ./deploy-config.sh${NC}    - Показать конфигурацию"
echo ""
echo -e "${BLUE}🚀 Для тестирования выполните:${NC}"
echo -e "${GREEN}  ./deploy.sh${NC}"
echo ""
echo -e "${BLUE}📚 GitHub Actions настроены автоматически${NC}"
echo -e "${YELLOW}💡 Не забудьте добавить секреты в GitHub:${NC}"
echo "   - HOST: $SERVER_IP"
echo "   - USERNAME: root"
echo "   - SSH_KEY: содержимое ~/.ssh/id_rsa"
