import express, {Router} from 'express';
import pg from 'pg';
import populate from "./populate.js";

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

router.get('/test', async (req, res) => {
    const result = await pool.query(`select name from badges`);
    console.info('result', result.rows);
    const welcome = result.rows.map((row) => row.name).join(' ');

    return res.status(200).send(welcome);
});

router.get('/populate', async (req, res) => {
    populate(pool);
    return res.status(200).send('Population done.');
});

app.listen(port, () => {
    console.info(`Node.js server started.`);
});