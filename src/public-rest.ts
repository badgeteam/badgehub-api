import express, {Router} from 'express';
import pg from 'pg';

export default function publicRest(router: Router, pool: pg.Pool) {
    router.get('/devices', async (req, res) => {
        const result = await pool.query(`select name, slug from badges`);
        return res.status(200).json(result.rows);
    });

    router.get('/categories', async (req, res) => {
        const result = await pool.query(`select name, slug from categories`);
        return res.status(200).json(result.rows);
    });
}