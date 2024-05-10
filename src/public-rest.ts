import pg from 'pg';
import {Get, Path, Route} from "tsoa";

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

interface App {
    name: string;
    slug: string;
    categrory_id: string;
    user_id: string;
}

interface AppDetails {
    name: string;
    slug: string;
    categrory: string;
    description: string;
    status: string;
    author: string;
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


    /**
     * Get list of apps
     */
    @Get("/apps")
    public async getApps(): Promise<App[]> {
        const result = await pool.query<App>(`select name, slug, category_id, user_id from projects`);
        return result.rows;
    }

    /**
     * Get app details
     */
    @Get("/apps/{name}")
    public async getAppDetails(@Path() name: string): Promise<AppDetails | undefined> {
        const result = await pool.query<AppDetails>(`select name, slug, category_id, user_id from projects where name = $1`, [name]);
        if (result.rows[0]) {
            return result.rows[0];
        } else {
            // TODO handle not found...
        }
    }
}
