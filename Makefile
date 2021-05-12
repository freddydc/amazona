# --> Enable And Disable Docker.
di:
	sudo systemctl disable --now docker
en:
	sudo systemctl enable --now docker

# --> Docker Service Info.
st:
	sudo systemctl status docker

# --> Main Docker Image Build.
# Development image.
dev-build:
	sudo docker build -t backend-dev \
		-f backend/Dockerfile.dev ./backend

	sudo docker build -t frontend-dev \
		-f frontend/Dockerfile.dev ./frontend
# Production image.
prod-build:
	sudo docker build -t backend \
		-f backend/Dockerfile ./backend

	sudo docker build -t frontend \
		-f frontend/Dockerfile ./frontend

# --> Docker Info.
ps:
	sudo docker ps -a
nt-ls:
	sudo docker network ls
nt-ins:
	sudo docker network inspect \
		amazona_store-tier
v-ls:
	sudo docker volume ls

# --> Push Image Docker Hub.
push:
	sudo docker login -u freddydc

	sudo docker push \
		freddydc/frontend:latest

	sudo docker push \
		freddydc/backend:latest

	sudo docker logout

# --> Docker Image Info.
img:
	sudo docker images

# Development
dive-server-dev:
	sudo docker run --rm -it \
    -v /var/run/docker.sock:/var/run/docker.sock \
    wagoodman/dive:v0.10 backend-dev
dive-front-dev:
	sudo docker run --rm -it \
    -v /var/run/docker.sock:/var/run/docker.sock \
    wagoodman/dive:v0.10 frontend-dev

# Production
dive-server:
	sudo docker run --rm -it \
    -v /var/run/docker.sock:/var/run/docker.sock \
    wagoodman/dive:v0.10 backend
dive-front:
	sudo docker run --rm -it \
    -v /var/run/docker.sock:/var/run/docker.sock \
    wagoodman/dive:v0.10 frontend

# --> Docker Image Clean.
rm-server:
	sudo docker rmi backend
rm-front:
	sudo docker rmi frontend

# Development
rm-img-dev:
	sudo docker rmi \
		backend-dev \
		frontend-dev
# Production
rm-img:
	sudo docker rmi \
		backend \
		frontend

# --> Docker Container: Stop And Remove.
dc-stop:
	sudo docker stop $$(sudo docker ps -a -q)
dc-rm:
	sudo docker rm $$(sudo docker ps -a -q)

# --> Docker Compose: Up - Stop - Down.
# Development.
up-dev:
	sudo docker-compose -f docker-compose.dev.yml up
# Production.
up-prod:
	sudo docker-compose up

dcm-stop:
	sudo docker-compose stop
dcm-down:
	sudo docker-compose down

# --> Docker Run Containers.
ru-alpine:
	sudo docker run --name alpine \
		--rm -it alpine:3.13

ru-api-dev:
	sudo docker run --name api \
		--rm -p 5000:5000 backend-dev
ru-front-dev:
	sudo docker run --name front \
		--rm -p 3000:3000 frontend-dev

ru-api-prod:
	sudo docker run --name api \
		--rm -p 5000:5000 backend
ru-front-prod:
	sudo docker run --name front \
		--rm -p 3000:3000 frontend

# --> Docker Exec Container.
e-mongo:
	sudo docker exec -it mongo bash

e-api-dev:
	sudo docker exec -it store-api sh
e-front-dev:
	sudo docker exec -it store-front sh
e-api:
	sudo docker exec -it api sh
e-front:
	sudo docker exec -it front sh

# --> Docker Clean.
pr:
	sudo docker system prune

img-pr:
	sudo docker image prune

c-pr:
	sudo docker container prune
c-cl:
	sudo docker stop $$(sudo docker ps -a -q)
	sudo docker rm $$(sudo docker ps -a -q)

v-pr:
	sudo docker volume prune
nt-pr:
	sudo docker network prune

rm-mo-v:
	sudo docker volume rm amazona_store-data
