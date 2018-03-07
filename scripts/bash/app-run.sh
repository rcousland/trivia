# donload git source. then setup docker images and start. run as appuser
# clone git
cd /data/app
git clone https://github.com/rcousland/trivia.git

#build docker image
cd /data/app/trivia/scripts/docker/app
sudo docker build -t trivia-app .

#run mongodb docker
sudo docker run -d -p 27017:27017 -v /data/db:/data/db mongo

#run trivia-app
sudo docker run -d --net="host" -p 80:80 trivia-app