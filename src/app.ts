import * as express from "express";
import * as bodyParser from "body-parser";
import * as logger from "morgan";
import * as cors from "cors";
import * as mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env" });
import routes from "./routes";

const app = express();
app.use(cors());
app.use(logger("tiny"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routes);

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/bbDB",
    { useNewUrlParser: true }
);

app.disable("etag");

export default app;
