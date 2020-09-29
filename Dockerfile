FROM node:12.16

ENV EDITOR=vim TORRCPATH=/usr/local/etc/tor/torrc

RUN apt-get update \
  apt-get install -y \
  build-essential \
  fakeroot \
  devscripts \
  libevent-dev \
  libssl-dev \
  sqlite3 \
  zlib1g-dev \
  libtool \
  autoconf \
  automake \
  autotools-dev \
  libgmp-dev \
  libsqlite3-dev \
  python3 \
  python3-mako \
  libsodium-dev \
  gettext \
  borgbackup \
  vim \
  git clone https://github.com/ElementsProject/lightning.git; \
  wget https://dist.torproject.org/tor-0.4.0.5.tar.gz; \
  wget https://raw.githubusercontent.com/torproject/tor/master/src/config/torrc.sample.in
  
RUN lightning=true; cd lightning; ./configure; make; make install \
    tor=true; tar xf tor-0.4.0.5.tar.gz; cd tor-0.4.0.5; ./configure; make; make install

RUN mkdir -p /usr/local/etc/tor \
    mv torrc.sample.in $TORRCPATH \
    mkdir -p /var/lib/tor/ao \
    echo "HiddenServiceDir /var/lib/tor/ao" | tee -a $TORRCPATH 1>/dev/null 2>&1 \
    echo "HiddenServicePort 80 127.0.0.1:8003" | tee -a $TORRCPATH 1>/dev/null 2>&1

RUN npm install -g webpack webpack-cli npm-run-all

EXPOSE 3000 35729

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . ./

RUN npm install

ENTRYPOINT [ "/usr/src/app/entrypoint.sh" ]
CMD ["bash"]