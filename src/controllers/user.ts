import { Request, Response } from "express";
import { User } from "../models";
import { sign } from "jsonwebtoken";

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export function validateValue(value: string, regex: any) {
    return regex.test(value);
}

export function validateRecBody(req: Request, res: Response) {
    if (!validateValue(req.body.email, emailRegex)) {
        return res.status(400).send({
            success: false,
            message: `Not a valid email, please try again`,
            route: "user/signup",
        });
    }
    if (!validateValue(req.body.password, passwordRegex)) {
        return res.status(400).send({
            success: false,
            message: `Password must be eight characters long and contain at least one letter and one number`,
            route: "user/signup",
        });
    }
    if (!req.body.name) {
        return res.status(400).send({
            success: false,
            message: `Not a proper name`,
            route: "user/signup",
        });
    }
}

const userController = {
    async logIn(req: Request, res: Response) {
        if (!req.body.email || !req.body.password) {
            return res.status(400).send({
                success: false,
                message: `Email and/or Password field can't be empty`,
                route: "user/login",
            });
        }

        const user = await User.findOne({
            email: req.body.email,
        });

        if (!user) {
            res.status(401).send({
                success: false,
                message: "Authentication failed. User not found.",
                reroute: "/users/login",
            });
        } else {
            // Check if password matches
            const isAuth = await user.comparePassword(req.body.password);
            if (isAuth) {
                const userObj = user.toObject();
                const currentTime = new Date();
                const expirationTime =
                    currentTime.getTime() + 4 * 60 * 60 * 1000;

                userObj.jwt = sign(
                    {
                        email: req.body.email,
                        expirationTime,
                    },
                    process.env.JWT_SECRET
                );

                return res.status(200).send({
                    success: true,
                    message: userObj,
                    route: "articles/post",
                });
            } else {
                return res.status(401).send({
                    success: false,
                    message: `Username and/or Password don't match`,
                    route: "user/login",
                });
            }
        }
    },

    async signUp(req: Request, res: Response) {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).send({
                success: false,
                message: `Username: ${req.body.email} not available`,
                route: "user/signup",
            });
        } else {
            validateRecBody(req, res);

            const newUser = new User({
                email: req.body.email,
                password: req.body.password,
                name: req.body.name,
            });
            const currentTime = new Date();
            const jwt = sign(
                {
                    email: req.body.email,
                    expirationTime: currentTime.getTime() + 4 * 60 * 60 * 1000,
                },
                process.env.JWT_SECRET
            );

            newUser
                .save()
                .then(d => {
                    const userObj = d.toObject();
                    userObj.jwt = jwt;
                    return res.status(200).send({
                        success: true,
                        message: userObj,
                        route: "user/articles",
                    });
                })
                .catch(err => {
                    throw err;
                });
        }
    },

    listUsers(req: Request, res: Response) {
        User.find({}, (_, users) => {
            return res.send(users);
        });
    },

    getme(req: any, res: Response) {
        return res.status(200).send(req.body.user);
    },
};

export default userController;
