# Summary Bar component for Mock AirBnB

## Usage:
Run 'npm install'
Modify config.js with your mongo connection information
Run 'npm run seed'
Build with 'npm run react-dev'
Start server with 'npm run server-dev'


## CRUD API

Endpoint:

http://localhost:5002/rooms/summary/:stayId

## GET

Return an object of summary information for this location:

{
    "__v": 0,
    "stayId": 109,
    "typeOfStay": "Spy mansion",
    "numGuests": 5,
    "numBaths": 1.5,
    "numBeds": 5,
    "numBedrooms": 2,
    "_id": "60415bc55ffa344ca04915b8"
}

## POST

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
}

## PUT

Will update summary information for record that matches given stayId.

Endpoint: http://localhost:5002/rooms/summary/201

## DELETE

Will delete entries from database that match given stayId.

Example:

http://localhost:5002/rooms/summary/201

Will delete record with stayId of 201.
