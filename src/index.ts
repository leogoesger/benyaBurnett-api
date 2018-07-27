/* tslint:disable:no-console */

import { createServer } from "http";
import * as dotenv from "dotenv";
import app from "./app";

dotenv.config({ path: ".env" });

const port = parseInt(process.env.PORT as string, 10) || 4000;
app.set("port", port);

(() =>
    createServer(app).listen(port, () =>
        console.info(`Server running on port ${port}`)
    ))();
