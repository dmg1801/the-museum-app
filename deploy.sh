#!/bin/bash
cd ~/the-museum-app || exit
git pull origin master
docker-compose -f docker-compose.prod.yml build
docker-compose -f docker-compose.prod.yml up -d
