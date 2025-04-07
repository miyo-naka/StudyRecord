# !/bin/bash

# 権限設定
docker compose exec php chown -R www-data:www-data /var/www/storage
docker compose exec php chown -R www-data:www-data /var/www/bootstrap/cache
docker compose exec php chmod -R 775 /var/www/storage
docker compose exec php chmod -R 775 /var/www/bootstrap/cache