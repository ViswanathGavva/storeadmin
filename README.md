# storeadmin
start mongo
mongod --dbpath /Users/viswanath.gavva/dbs/mongo/data/ --logpath /Users/viswanath.gavva/dbs/mongo/logs/mongod.log --port 12345

Connect to Mongo
mongosh "mongodb://localhost:12345/kalakriti"

use kalakriti
kalakriti> show collections;
sessions
user
users
usertypes

start server in dev mode
node dev