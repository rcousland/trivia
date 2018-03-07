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
useradd appuser

# setup sudo permissions
echo 'appuser ALL=(ALL) NOPASSWD: /usr/bin/docker' >> /etc/sudoers
echo 'appuser ALL=(ALL) NOPASSWD: /usr/local/bin/docker-compose' >> /etc/sudoers
echo 'appuser ALL=(ALL) NOPASSWD: /usr/bin/git' >> /etc/sudoers
echo 'appuser ALL=(ALL) NOPASSWD: /usr/bin/npm' >> /etc/sudoers
echo 'appuser ALL=(ALL) NOPASSWD: /usr/bin/node' >> /etc/sudoers

#create dirs and change permissions
mkdir /data
mkdir /data/db
mkdir /data/app
chown appuser /data/db
chown appuser /data/app

#redirect port 3000 to 80
iptables -t nat -I PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 3000

#allow port 80
sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT

#save iptables perminately
sudo apt-get install iptables-persistent

