#!/bin/bash

#stop the old image
docker stop docker-node;

#delete the old image
docker rm docker-node;

# create the docker image
docker build -t cyborg/node-web-app . ;

# run the docker image and map the public port 80 to private docker port 80
# option -d pour faire tourner l'image en tache de fond
docker run --name docker-node -p 80:80 cyborg/node-web-app ;
# docker run --name docker-node -p 80:80 -d cyborg/node-web-app ;
