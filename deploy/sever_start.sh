cd /home/Chris/codehub/my_blog/my_blog_next

gunzip blog-images.tar.gz
docker load -i blog-images.tar
docker compose -f docker-compose.prod.yml up -d