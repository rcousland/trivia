# donload git source. then setup docker images and start. run as appuser
# clone git
cd /data/app
git clone https://github.com/rcousland/trivia.git

#build docker image
cd /data/app/trivia
docker-compose build
docker-compose up