# --> Production And Development Image Builder.
# Development.
dev-build:
	sudo docker build -t backend-dev -f Dockerfile.dev .
# Production.
prod-build:
	sudo docker build -t backend .
# Run Containers Port.
ru-api-dev:
	cd ../ && $(MAKE) run-api-dev
ru-api-prod:
	cd ../ && $(MAKE) run-api-prod
# Remove Image.
rm-img:
	sudo docker rmi backend

# --> Docker Commands.
img:
	cd ../ && $(MAKE) img
ps:
	cd ../ && $(MAKE) ps
nt-ls:
	cd ../ && $(MAKE) nt-ls

e-mongo:
	cd ../ && $(MAKE) e-mongo
e-api-dev:
	cd ../ && $(MAKE) e-api-dev
e-front-dev:
	cd ../ && $(MAKE) e-front-dev

pr:
	cd ../ && $(MAKE) pr
img-pr:
	cd ../ && $(MAKE) img-pr
c-pr:
	cd ../ && $(MAKE) c-pr
v-pr:
	cd ../ && $(MAKE) v-pr
nt-pr:
	cd ../ && $(MAKE) nt-pr

up-dev:
	cd ../ && $(MAKE) up-dev
up-prod:
	cd ../ && $(MAKE) up-prod
dcm-stop:
	cd ../ && $(MAKE) dcm-stop
dcm-down:
	cd ../ && $(MAKE) dcm-down
