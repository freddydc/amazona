# === DOCKER MAKEFILE ===
# ==> Commands <==
compose = sudo docker-compose
docker = sudo docker
# ==> Mongodb <==
MONGODB_VOLUME = src=amazona_store-data,dst=/data/db
MONGODB_URL = MONGODB_URL=mongodb://mongo-test:27017/AmazonaAIR
MONGO_BIONIC = mongo:4-bionic
# ==> Messages <==
ctInfo = echo "\n Containers empty. \n"
tagInfo = echo "\n No image to tag. \n"
pushInfo = echo "\n Image not exist to push. \n"
netInfo = echo "\n Network already exist. \n"
# ==> Ports <==
API_PORT = 5000:5000
FRONT_PORT = 3000:3000
DB_PORT = 27017:27017
# ==> Production Image Tags <==
SERVER = backend:v0.1.0
FRONT = frontend:v0.1.0
# ==> Development Image tags <==
serverDev = backend
frontDev = frontend
# ==> User <==
USER = freddydc
# ==> Utils <==
ALPINE = alpine:3.13
frontPath = ./frontend
serverPath = ./backend
composeFile = docker-compose.dev.yml
DIVE = wagoodman/dive:v0.10
mgData = amazona_store-data
storeNetwork = amazona_store-tier
testNet = red
# ==> Help <==
help:
	@echo "Commands:"
	@echo "  make ps    List containers running and stopped"
# ==> Enable And Disable <==
di:
	sudo systemctl disable --now docker
en:
	sudo systemctl enable --now docker
# ==> Service Information <==
st:
	sudo systemctl status docker
# ==> Main Image Builder <==
# Development image.
d-build:
	${docker} build -t backend \
		-f backend/Dockerfile.dev ${serverPath}
	${docker} build -t frontend \
		-f frontend/Dockerfile.dev ${frontPath}
# Production image.
p-build:
	${docker} build -t ${SERVER} \
		-f backend/Dockerfile ${serverPath}
	${docker} build -t ${FRONT} \
		-f frontend/Dockerfile ${frontPath}
# ==> Information <==
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
# ==> Production Tags <==
tg-p:
	${docker} tag frontend:v0.1.0 ${USER}/frontend:v0.1.0 || ${tagInfo}
	${docker} tag backend:v0.1.0 ${USER}/backend:v0.1.0 || ${tagInfo}
# ==> Push Image <==
push:
	${docker} login -u ${USER}
	${docker} push ${USER}/frontend:v0.1.0 || ${pushInfo}
	${docker} push ${USER}/backend:v0.1.0	|| ${pushInfo}
	${docker} logout
# ==> Docker Image Information <==
img:
	${docker} images
# Development
dv-server-d:
	${docker} run --rm -it \
    -v /var/run/docker.sock:/var/run/docker.sock \
    ${DIVE} ${serverDev}
dv-front-d:
	${docker} run --rm -it \
    -v /var/run/docker.sock:/var/run/docker.sock \
    ${DIVE} ${frontDev}
# Production
dv-server:
	${docker} run --rm -it \
    -v /var/run/docker.sock:/var/run/docker.sock \
    ${DIVE} ${SERVER}
dv-front:
	${docker} run --rm -it \
    -v /var/run/docker.sock:/var/run/docker.sock \
    ${DIVE} ${FRONT}
# ==> Image Cleaner <==
rm-server:
	${docker} rmi ${SERVER}
rm-front:
	${docker} rmi ${FRONT}
# Development.
rm-img-d:
	${docker} rmi ${serverDev} ${frontDev}
# Production.
rm-img:
	${docker} rmi ${SERVER} ${FRONT}
# ==> Docker Compose <==
cps:
	${compose} ps
# Production.
up-p:
	${compose} up -d
# Development.
up:
	${compose} -f ${composeFile} up
dcs:
	${compose} stop
dcd:
	${compose} down
dcl:
	${compose} logs
dcl-mg:
	${compose} logs mongodb
dcl-api:
	${compose} logs api
dcl-front:
	${compose} logs storefront
dcl-f:
	${compose} logs -f api storefront mongodb
dc-build:
	${compose} build
dc-build-d:
	${compose} -f ${composeFile} build
# ==> Manually Runner: (mongo - api - front) <==
run-mnl:
	${docker} network create --attachable ${testNet} || ${netInfo}

	${docker} run -d --name mongo --rm -p ${DB_PORT} \
		--mount ${MONGODB_VOLUME} ${MONGO_BIONIC}
	${docker} run -d --name api --rm -p ${API_PORT} \
		--env ${MONGODB_URL} ${serverDev}
	${docker} run -d --name front --rm -p ${FRONT_PORT} ${frontDev}

	${docker} network connect ${testNet} mongo
	${docker} network connect ${testNet} api
	${docker} network connect ${testNet} front
# ==> Container Runner <==
run-alp:
	${docker} run --name alpine --rm -it ${ALPINE}
run-api-d:
	${docker} run --name api --rm -p ${API_PORT} ${serverDev}
run-front-d:
	${docker} run --name front --rm -p ${FRONT_PORT} ${frontDev}
run-api:
	${docker} run --name api --rm -p ${API_PORT} ${SERVER}
run-front:
	${docker} run --name front --rm -p ${FRONT_PORT} ${FRONT}
# ==> Exec Containers <==
e-mg:
	${docker} exec -it mongo bash
e-api:
	${docker} exec -it api sh
e-front:
	${docker} exec -it front sh
# ==> Cleaner <==
pr:
	${docker} system prune
img-pr:
	${docker} image prune
# Container: Stop And Remove.
ct-pr:
	${docker} container prune
ct-stop:
	${docker} stop `${docker} ps -aq` || ${ctInfo}
ct-rm:
	${docker} rm $$(${docker} ps -a -q) || ${ctInfo}
# Clear all containers.
ct-clr: ct-stop ct-rm
vl-pr:
	${docker} volume prune
nt-pr:
	${docker} network prune
rm-mg-vl:
	${docker} volume rm ${mgData}
