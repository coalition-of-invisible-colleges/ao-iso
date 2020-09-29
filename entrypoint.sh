#!/bin/bash

echo "module.exports = { \
    bitcoind: { \
        network: 'mainnet' \
    }, \
    bitcoinAverage: { \
        pub: '', \
        secret: '' \
    }, \
    sqlite3: { \
        file: 'database.sqlite3' \
    }, \
    clightning: { \
        dir: '$HOME/.lightning/bitcoin' \
    }, \
    tor: { \
      hostname: '$TORHOSTNAME' \
    } \
}" > configuration.js
echo "configuration.js created"
exec "$@"
