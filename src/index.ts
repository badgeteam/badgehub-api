import express, {Router} from 'express';
import pg from 'pg';
import populate from "./populate.js";
import publicRest from "./public-rest.js";

const app = express();
const port = 8081;

const router = Router();

app.use(express.json());
app.use(express.static('public'));
app.use('/api/v3', router);

const pool = new pg.Pool({
    host: 'db',
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432,
});

app.listen(port, () => {
    console.info(`Node.js server started.`);
});

publicRest(router, pool);
