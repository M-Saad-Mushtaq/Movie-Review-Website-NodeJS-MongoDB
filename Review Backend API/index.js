import app from "./server.js";
import mongodb from "mongodb";
//import reviewsDAO from "./dao/reviewsDAO.js";

import dotenv from 'dotenv';            //.env file access
import ReviewsDAO from "./dao/reviewsDAO.js";
dotenv.config({path: 'review.env'});    //.env file access

const MongoClient = mongodb.MongoClient;
const uri = `mongodb://localhost:27017/reviewdb`;   //your connection string

const port = 8000;

MongoClient.connect(
    uri,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500
    })
    .catch(err => {
        console.error(err.stack);
        process.exit(1);
    })
    .then(async client => {
        await ReviewsDAO.injectDB(client);
        app.listen(port, () => {
            console.log(`Listening on port ${port}`);
        })
    });