# MAKEFILE:
# --> Docker.
compose = sudo docker-compose
docker = sudo docker
# --> Mongodb.
MONGODB_URL = MONGODB_URL=mongodb://mongo-test:27017/AmazonaAIR
MONGO_BIONIC = mongo:4-bionic
# --> Messages.
ctInfo = echo "\n Containers empty. \n"
tagInfo = echo "\n No image to tag. \n"
pushInfo = echo "\n Image not exist to push. \n"
netInfo = echo "\n Network already exist. \n"

# --> Production Image Tags.
SERVER = backend:v0.1.0
FRONT = frontend:v0.1.0

# --> Development Image tags.
serverDev = backend
frontDev = frontend

USER = freddydc

# --> Utils.
ALPINE = alpine:3.13
frontPath = ./frontend
serverPath = ./backend

composeFile = docker-compose.dev.yml
DIVE = wagoodman/dive:v0.10
mgData = amazona_store-data
storeNetwork = amazona_store-tier
testNet = red

# --> Help.
help:
	@echo "Commands:"
	@echo "  make ps    List containers running and stopped"

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
	${docker} build -t backend \
		-f backend/Dockerfile.dev ${serverPath}

	${docker} build -t frontend \
		-f frontend/Dockerfile.dev ${frontPath}
# Production image.
prod-build:
	${docker} build -t ${SERVER} \
		-f backend/Dockerfile ${serverPath}

	${docker} build -t ${FRONT} \
		-f frontend/Dockerfile ${frontPath}

# --> Docker Info.
ps:
	${docker} ps -a
psl:
	${docker} ps -l

nt-ls:
	${docker} network ls
nt-ins:
	${docker} network inspect ${storeNetwork}
vl-ls:
	${docker} volume ls

# --> Production tags.
tags-prod:
	${docker} tag frontend:v0.1.0 ${USER}/frontend:v0.1.0 || ${tagInfo}
	${docker} tag backend:v0.1.0 ${USER}/backend:v0.1.0 || ${tagInfo}

# --> Push Image Docker Hub.
push:
	${docker} login -u ${USER}

	${docker} push ${USER}/frontend:v0.1.0 || ${pushInfo}
	${docker} push ${USER}/backend:v0.1.0	|| ${pushInfo}

	${docker} logout

# --> Docker Image Info.
img:
	${docker} images

# Development
dive-server-dev:
	${docker} run --rm -it \
    -v /var/run/docker.sock:/var/run/docker.sock \
    ${DIVE} ${serverDev}
dive-front-dev:
	${docker} run --rm -it \
    -v /var/run/docker.sock:/var/run/docker.sock \
    ${DIVE} ${frontDev}

# Production
dive-server:
	${docker} run --rm -it \
    -v /var/run/docker.sock:/var/run/docker.sock \
    ${DIVE} ${SERVER}
dive-front:
	${docker} run --rm -it \
    -v /var/run/docker.sock:/var/run/docker.sock \
    ${DIVE} ${FRONT}

# --> Docker Image Clean.
rm-server:
	${docker} rmi ${SERVER}
rm-front:
	${docker} rmi ${FRONT}

# Development.
rm-img-dev:
	${docker} rmi \
		backend-dev \
		frontend-dev
# Production.
rm-img:
	${docker} rmi ${SERVER} ${FRONT}

# --> Docker Compose:
dcm-ps:
	${compose} ps
# Production.
up:
	${compose} up -d
# Development.
up-dev:
	${compose} -f ${composeFile} up

dcm-stop:
	${compose} stop
dcm-down:
	${compose} down

dcm-logs:
	${compose} logs
dcm-logs-mongo:
	${compose} logs mongodb
dcm-logs-api:
	${compose} logs api
dcm-logs-front:
	${compose} logs storefront
dcm-logs-f:
	${compose} logs -f api storefront mongodb

dcm-build:
	${compose} build
dcm-build-dev:
	${compose} -f ${composeFile} build

# --> Manually run: mongo - server - front.
run-mnl:
	${docker} network create --attachable ${testNet} || ${netInfo}

	${docker} run -d --name store-mongo --rm -p 27018:27017 \
		--mount src=amazona_store-data,dst=/data/db ${MONGO_BIONIC}

	${docker} run -d --name store-api --rm -p 5000:5000 \
		--env ${MONGODB_URL} ${serverDev}

	${docker} run -d --name store-front --rm -p 3000:3000 ${frontDev}

	${docker} network connect ${testNet} store-mongo
	${docker} network connect ${testNet} store-api
	${docker} network connect ${testNet} store-front

# --> Docker Run Containers.
run-alpine:
	${docker} run --name alpine --rm -it ${ALPINE}

run-api-dev:
	${docker} run --name store-api --rm -p 5000:5000 ${serverDev}
run-front-dev:
	${docker} run --name store-front --rm -p 3000:3000 ${frontDev}

run-api:
	${docker} run --name api --rm -p 5000:5000 ${SERVER}
run-front:
	${docker} run --name front --rm -p 3000:3000 ${FRONT}

# --> Docker Exec Container.
exec-mongo-dev:
	${docker} exec -it store-mongo bash
exec-api-dev:
	${docker} exec -it store-api sh
exec-front-dev:
	${docker} exec -it store-front sh

exec-api:
	${docker} exec -it api sh
exec-front:
	${docker} exec -it front sh

# --> Docker Clean.
pr:
	${docker} system prune

img-pr:
	${docker} image prune

# Docker Container: Stop And Remove.
ct-pr:
	${docker} container prune
ct-stop:
	${docker} stop `${docker} ps -aq` || ${ctInfo}
ct-rm:
	${docker} rm $$(${docker} ps -a -q) || ${ctInfo}

ct-clear: ct-stop ct-rm

vl-pr:
	${docker} volume prune
nt-pr:
	${docker} network prune

rm-mg-vl:
	${docker} volume rm ${mgData}
