import pg from 'pg';
import { Get, Route } from "tsoa";

/**
 * The code is annotated so that OpenAPI documentation can be generated with tsoa
 *
 * https://tsoa-community.github.io/docs/introduction.html
 *
 * After changing this file, don't forget to generate the OpenPI spec en the routes:
 *
 * npm run openapi
 */

const pool = new pg.Pool({
    host: 'db',
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432,
});

interface Device {
    name: string;
    slug: string;
}

interface Category {
    name: string;
    slug: string;
}

@Route("/api/v3")
export class RestController {
    /**
     * Get list of devices (badges)
     */
    @Get("/devices")
    public async getDevices(): Promise<Device[]> {
        const result = await pool.query<Device>(`select name, slug from badges`);
        return result.rows;
    }

    /**
     * Get list of categories
     */
    @Get("/categories")
    public async getCategories(): Promise<Category[]> {
        const result = await pool.query<Category>(`select name, slug from categories`);
        return result.rows;
    }
}
