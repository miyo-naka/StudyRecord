FROM php:8.2-fpm

WORKDIR /var/www

# PHP拡張やツールのインストール
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    git \
    curl \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Composerインストール
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Laravelの依存関係インストール（初回だけ）
COPY ./src /var/www
RUN composer install

CMD ["php-fpm"]
