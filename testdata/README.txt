TO EXPORT:
mongoexport --db mean-dev --collection users --out users.json


TO IMPORT:
mongoimport --db mean-dev --collection users --file users.json --journal --dbpath <path>