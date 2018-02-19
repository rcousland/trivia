# donload git source. then setup docker images and start. run as appuser
# clone git
cd /data/app
git clone https://github.com/rcousland/trivia.git

#build docker image
cd /data/app/trivia/scripts/docker/app
docker build -t trivia-app

#run mongodb docker
#docker run -d -p --net=host -v /data/db:/data/db --name mongo-trivia
docker run -d -p --net=host -v /data/db:/data/db -d mongo:Latest --name some-mongo

#run trivia-app
docker run -d -P --net=bridge trivia-app