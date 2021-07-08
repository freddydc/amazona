compose = sudo docker-compose
composeFile = docker-compose.dev.yml
docker = sudo docker

MONGO_VOLUME = src=amazona_store-data,dst=/data/db
MONGO_URL = MONGODB_URL=mongodb://mongo-test:27017/AmazonaTest
MONGO_BIONIC = mongo:4-bionic
mongoData = amazona_store-data

storeNet = amazona_store-tier
testNet = red

conMessage = echo '\n Containers Empty \n'
tagMessage = echo '\n No Image To Tag \n'
pushMessage = echo '\n Image Not Found \n'
netMessage = echo '\n Already Exist \n'

API_PORT = 5000:5000
FRONT_PORT = 3000:3000
MONGO_PORT = 27017:27017

API = api:v0.1.0
FRONT = front:v0.1.0
ALPINE = alpine:3.13
DIVE = wagoodman/dive:v0.10
diveMount = /var/run/docker.sock:/var/run/docker.sock

apiTag = backend
frontTag = frontend

apiPath = ./backend
frontPath = ./frontend

USER = freddydc

help:
	@echo 'Welcome'
di:
	sudo systemctl disable --now docker
en:
	sudo systemctl enable --now docker
st:
	sudo systemctl status docker

# BUILD IMAGE
build:
	${docker} build -t ${apiTag} -f backend/Dockerfile.dev ${apiPath}
	${docker} build -t ${frontTag} -f frontend/Dockerfile.dev ${frontPath}
pro-build:
	${docker} build -t ${API} -f backend/Dockerfile ${apiPath}
	${docker} build -t ${FRONT} -f frontend/Dockerfile ${frontPath}

# INFO
ps:
	@${docker} ps -a
img:
	@${docker} images
lps:
	@${docker} ps -l
nls:
	@${docker} network ls
ine:
	${docker} network inspect ${storeNet}
vls:
	@${docker} volume ls

# PRODUCTION TAG
tag-pro:
	${docker} tag ${FRONT} ${USER}/${FRONT} || ${tagMessage}
	${docker} tag ${API} ${USER}/${API} || ${tagMessage}

# PUSH
push:
	${docker} login -u ${USER}
	${docker} push ${USER}/${FRONT} || ${pushMessage}
	${docker} push ${USER}/${API}	|| ${pushMessage}
	${docker} logout

# DIVE IMAGE
div-api-d:
	${docker} run --rm -it -v ${diveMount} ${DIVE} ${apiTag}
div-sf-d:
	${docker} run --rm -it -v ${diveMount} ${DIVE} ${frontTag}
div-api:
	${docker} run --rm -it -v ${diveMount} ${DIVE} ${API}
div-sf:
	${docker} run --rm -it -v ${diveMount} ${DIVE} ${FRONT}

# REMOVE IMAGE
rm-api:
	${docker} rmi ${API}
rm-sf:
	${docker} rmi ${FRONT}
rmi:
	${docker} rmi ${apiTag} ${frontTag}
rmi-pro:
	${docker} rmi ${API} ${FRONT}

# COMPOSE
cps:
	@${compose} ps
up:
	${compose} -f ${composeFile} up
up-pro:
	${compose} up -d
cs:
	${compose} stop
cd:
	${compose} down
log:
	${compose} logs
lmo:
	${compose} logs -f mongo
lap:
	${compose} logs -f api
lsf:
	${compose} logs -f front
logs:
	${compose} logs -f api front mongo
cmb:
	${compose} -f ${composeFile} build
cmb-pro:
	${compose} build

# RUN MANUAL: Mongo, Api, Front.
run-m:
	${docker} network create --attachable ${testNet} || ${netMessage}

	${docker} run -d --name mongo --rm -p ${MONGO_PORT} \
		--mount ${MONGO_VOLUME} ${MONGO_BIONIC}
	${docker} run -d --name api --rm -p ${API_PORT} \
		--env ${MONGO_URL} ${apiTag}
	${docker} run -d --name front --rm -p ${FRONT_PORT} ${frontTag}

	${docker} network connect ${testNet} mongo
	${docker} network connect ${testNet} api
	${docker} network connect ${testNet} front

# RUN
run-alp:
	${docker} run --name alpine --rm -it ${ALPINE}
run-api-d:
	${docker} run --name api --rm -p ${API_PORT} ${apiTag}
run-sf-d:
	${docker} run --name front --rm -p ${FRONT_PORT} ${frontTag}
run-api:
	${docker} run --name api --rm -p ${API_PORT} ${API}
run-sf:
	${docker} run --name front --rm -p ${FRONT_PORT} ${FRONT}

# EXEC
e-mon:
	${docker} exec -it mongo bash
e-api:
	${docker} exec -it api sh
e-sf:
	${docker} exec -it front sh

# REMOVE
pr:
	${docker} system prune
ipr:
	${docker} image prune
cnp:
	${docker} container prune
cns:
	${docker} stop `${docker} ps -aq` || ${conMessage}
cnr:
	${docker} rm $$(${docker} ps -a -q) || ${conMessage}

ra: cst crm
rsf:
	${docker} rm front
rap:
	${docker} rm api
rmo:
	${docker} rm mongo

vpr:
	${docker} volume prune
npr:
	${docker} network prune
r-mon-v:
	${docker} volume rm ${mongoData}
