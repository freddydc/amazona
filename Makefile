# Docker service enable & disable.
disable:
	sudo systemctl disable --now docker
enable:
	sudo systemctl enable --now docker

# Docker service info.
status:
	sudo systemctl status docker

# Main docker image builder.
main-build:
	cd ./backend && $(MAKE) build
	cd ./frontend && $(MAKE) build

# Docker info.
a-ps:
	sudo docker ps -a
net-ls:
	sudo docker network ls
vl-ls:
	sudo docker volume ls

# Docker images info.
img:
	sudo docker images

dive-b:
	sudo docker run --rm -it \
    -v /var/run/docker.sock:/var/run/docker.sock \
    wagoodman/dive:v0.10 backend
dive-f:
	sudo docker run --rm -it \
    -v /var/run/docker.sock:/var/run/docker.sock \
    wagoodman/dive:v0.10 frontend

# Docker images clean.
dl-img-b:
	sudo docker rmi backend
dl-img-f:
	sudo docker rmi frontend
dl-all-img:
	sudo docker rmi backend frontend

# Docker Container: stop & remove.
doc-stop:
	sudo docker stop $$(sudo docker ps -a -q)
doc-rm:
	sudo docker rm $$(sudo docker ps -a -q)

# Docker Compose: up - stop - down.
com-up:
	sudo docker-compose up
com-stop:
	sudo docker-compose stop
com-down:
	sudo docker-compose down

# Docker run.
alpine:
	sudo docker run --rm -it alpine:3.13

run-b-p:
	cd ./backend && $(MAKE) run
run-f-p:
	cd ./frontend && $(MAKE) run

run-b:
	sudo docker run --name amazona_server --rm -it backend
run-f:
	sudo docker run --name amazona_client --rm -it frontend

# Docker exec.
exec-mongo:
	sudo docker exec -it amazona_mongo bash
exec-b:
	sudo docker exec -it amazona_server sh
exec-f:
	sudo docker exec -it amazona_client sh

# Docker clean.
prune:
	sudo docker system prune

img-pr:
	sudo docker image prune

con-pr:
	sudo docker container prune
con-clean:
	sudo docker stop $$(sudo docker ps -a -q)
	sudo docker rm $$(sudo docker ps -a -q)

vl-pr:
	sudo docker volume prune
net-pr:
	sudo docker network prune

db-vl-dl:
	sudo docker volume rm amazona_db-data
