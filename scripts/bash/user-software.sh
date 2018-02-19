# Setup new user with folders and permissions. run as root or sudo

# install git
apt-get update
apt-get install git

# Install curl
apt-get install curl

# install docker
apt-get update
apt-get install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
apt-key fingerprint 0EBFCD88
add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu zesty stable"
apt-get update
apt-get install docker-ce

# create new user and login
echo appuser:password | sudo chpasswd

# setup sudo permissions
echo 'user appuser = (root) NOPASSWD: /sbin/apt-get' >> /etc/sudoers
echo 'user appuser = (root) NOPASSWD: /sbin/curl' >> /etc/sudoers
echo 'user appuser = (root) NOPASSWD: /sbin/add-apt-repository' >> /etc/sudoers

#create dirs and change permissions
mkdir /data/db
mkdir /data/app
chown appuser /data/db
chown appuser /data/app