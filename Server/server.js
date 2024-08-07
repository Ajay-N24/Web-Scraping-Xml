import express from 'express';
const app = express();
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import scrape from './Routes/Scrape.js';
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-type, Accept"
    );
    next();
});
import cors from 'cors';
const corsOptions = {
    origin: "*",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(scrape);
app.listen(5000, () => {
    console.log(`Server Working on PORT Number 5000`);
});