import express, {Router} from 'express';
import pg from 'pg';

const app = express();
const port = 8081;

const router = Router();

app.use(express.json());
app.use(express.static('public'));
app.use('/api-v1', router);

const pool = new pg.Pool({
    host: 'db',
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432,
});

router.get('/test', async (req, res) => {
    const result = await pool.query(`select name from test`);
    // When making sequential queries:
    // const client = await pool.connect()
    // await client.query('SELECT NOW()')
    // await client.query('SELECT NOW()')
    // client.release()
    console.info('result', result.rows);
    const welcome = result.rows.map((row) => row.name).join(' ');

    return res.status(200).send(welcome);
});

app.listen(port, () => {
    console.info(`Node.js server started on port ${port}`);
});