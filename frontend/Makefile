# Create an image for frontend.
build:
	sudo docker build -t frontend .

net-ls:
	cd ../ && $(MAKE) net-ls

run:
	sudo docker run --name amazona_client --rm -p 3000:3000 frontend

alpine:
	cd ../ && $(MAKE) alpine

run-f:
	cd ../ && $(MAKE) run-f
run-b:
	cd ../ && $(MAKE) run-b

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
