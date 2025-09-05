cd /Users/xiaoxin/Documents/codehub/next/first

DOCKER_DEFAULT_PLATFORM=linux/amd64 docker compose build

docker save first-next-app:latest mongo:7.0 -o blog-images.tar
gzip blog-images.tar

scp -i ~/.ssh/id_ed25519_aliyun blog-images.tar.gz Chris@8.148.204.76:/home/Chris/codehub/my_blog/my_blog_next