# Create an image for backend.
build:
	sudo docker build -t backend .

net-ls:
	cd ../ && $(MAKE) net-ls

run:
	sudo docker run --name amazona_server --rm -p 5000:5000 backend

alpine:
	cd ../ && $(MAKE) alpine

run-b:
	cd ../ && $(MAKE) run-b
run-f:
	cd ../ && $(MAKE) run-f

exec-mongo:
	cd ../ && $(MAKE) exec-mongo

exec-b:
	cd ../ && $(MAKE) exec-b
exec-f:
	cd ../ && $(MAKE) exec-f

img:
	cd ../ && $(MAKE) img
a-ps:
	cd ../ && $(MAKE) a-ps

dl-img:
	sudo docker rmi backend

img-pr:
	cd ../ && $(MAKE) img-pr

prune:
	cd ../ && $(MAKE) prune

con-pr:
	cd ../ && $(MAKE) con-pr

vl-pr:
	cd ../ && $(MAKE) vl-pr

net-pr:
	cd ../ && $(MAKE) net-pr

com-up:
	cd ../ && $(MAKE) com-up
com-stop:
	cd ../ && $(MAKE) com-stop
com-down:
	cd ../ && $(MAKE) com-down
