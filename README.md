# Mock Airbnb Summary Bar Service System Design

Inherited front-end and back-end legacy code of a modeled Airbnb summary bar module. The back-end system was scaled up from 100 to roughly 16 million database records. It was also redesigned to support a minimum of 100 requests per second on EC2 using a t2.micro instance. Built with Express, Node, and PostgreSQL, tested with New Relic, Loader.io, and Artillery.  

## Default View

<img width="712" alt="SummaryBar" src="https://user-images.githubusercontent.com/66794449/120021327-291b5480-bfa8-11eb-8d89-a1ac8ebc3bc6.png">

## Technologies Used

• React <br />
• Express <br />
• PostgresSQL <br />
• Sequelize <br />
• CouchDB <br />
• Redis <br />
• New Relic <br />
• Artillery <br />
• Loader.io <br />

## Setup on Local

1. git clone
2. install dependencies with "npm install"
3. seed the database by running "npm run seedPostgres"
4. start server with "npm run server-dev"
5. build bundle with "npm run build"
6. verify app is up and running at localhost:5002/rooms/:id (for id values 1-10000000)
7. for development, start webpack by running "npm run react-dev"


# API

This describes the resources that make up the summary-bar-service REST API. All data is sent and received as JSON.

## Endpoints:

http://localhost:5002/rooms/:stayId/summary/

###### GET

Return an object of summary information for this location:

{
    "__v": 0,
    "stayId": 109,
    "typeOfStay": "Spy mansion",
    "numGuests": 5,
    "numBaths": 1.5,
    "numBeds": 5,
    "numBedrooms": 2,
    "hostName": "FirstName LastName",
    "_id": "60415bc55ffa344ca04915b8"
}

###### POST

Return 200 if record is successfully added, return 404 if record is not successfully added to database or if item already exists:

Endpoint: http://localhost:5002/rooms/summary

Expected body:

{
    "stayId": integer,
    "typeOfStay": string,
    "numGuests": integer,
    "numBaths": integer,
    "numBeds": integer,
    "numBedrooms": integer,
    "hostName": string
}

###### PUT

Will update summary information for record that matches given stayId.

Endpoint: http://localhost:5002/rooms/summary/201

###### DELETE

Will delete entries from database that match given stayId.

Example:

http://localhost:5002/rooms/summary/201

Will delete record with stayId of 201.

## Related Projects 

• [users-service - Gigi C.](https://github.com/Team-Vaughan/user-service) <br/>
• [photos-service - Chris T.](https://github.com/Team-Vaughan/photos-service)
