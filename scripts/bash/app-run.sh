#run mongodb docker
sudo docker run -d -p 27017:27017 -v /data/db:/data/db mongo

# donload git source. then setup docker images and start. run as appuser
# clone git
cd /data/app
git clone https://github.com/rcousland/trivia.git

# install packages
npm install

# insert test data into DB
npm run setup

# run app as background job
# install pm2 use this tutorial
#https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04