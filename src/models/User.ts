import * as bcrypt from "bcrypt";
import { Schema, model, Model, Document } from "mongoose";

export interface IUserDocument extends Document {
    name: string;
    email: string;
    password: string;
    jwt: string;
    comparePassword: (candidatePassword: string) => Promise<boolean>;
}

interface IUserModel extends Model<IUserDocument> {
    findByToken(): void;
}

const UserSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        minlength: 6,
        maxlength: 50,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 16,
    },
});

UserSchema.pre("save", async function save(next) {
    const user = this as IUserDocument;
    if (!user.isModified("password")) {
        return next();
    }
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
    next();
});

UserSchema.methods.comparePassword = function comparePassword(
    candidatePassword: string
) {
    return bcrypt.compare(candidatePassword, this.password);
};

const User: IUserModel = model<IUserDocument, IUserModel>("User", UserSchema);

export default User;
