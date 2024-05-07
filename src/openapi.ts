import {Express} from 'express';
import swaggerUi from "swagger-ui-express";

export default function openapi(app: Express) {
    app.use(
        "/openapi",
        swaggerUi.serve,
        swaggerUi.setup(undefined, {
            swaggerOptions: {
                url: "/swagger.json",
            },
        })
    );
}