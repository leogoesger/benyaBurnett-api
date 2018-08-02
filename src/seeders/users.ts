import { User } from "../models";
import { users } from "./data";

const seedUsers = () =>
    User.remove({}).then(() => User.collection.insertMany(users));

export default seedUsers;
