/* tslint:disable:no-console */
import * as mongoose from "mongoose";
import { articleSeeder, userSeeder } from "../seeders";

(mongoose as any).Promise = global.Promise;
mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/bbDB",
    { useNewUrlParser: true }
);

const Promises = [articleSeeder(), userSeeder()];

(() => Promise.all(Promises).then(() => process.exit(0)))();
