import express, {Express} from 'express';
import {RegisterRoutes} from "./generated/routes.js";
import openapi from "./openapi.js";

const app = express();
const port = 8081;

app.use(express.json());
app.use(express.static('public'));

app.listen(port, () => {
    console.info(`Node.js server started.`);
});

RegisterRoutes(app);

openapi(app);