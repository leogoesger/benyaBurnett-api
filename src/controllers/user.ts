import { Request, Response } from "express";
import { User } from "../models";
import { verify, sign } from "jsonwebtoken";
import { error } from "util";

const userController = {
    logIn(req: Request, res: Response) {
        User.findOne(
            {
                email: req.body.email,
            },
            (err, user) => {
                if (err) throw err;

                if (!user) {
                    res.send({
                        success: false,
                        message: "Authentication failed. User not found.",
                        reroute: "/users/login",
                    });
                } else {
                    // Check if password matches
                    const isAuth = user.comparePassword(req.body.password);

                    user.jwt = sign(
                        { email: req.body.email },
                        process.env.JWT_SECRET
                    );

                    if (isAuth) {
                        res.send(user);
                    }
                }
            }
        );
    },

    signUp(req: Request, res: Response) {
        const newUser = new User({
            email: req.body.email,
            password: req.body.password,
            name: req.body.name,
        });

        User.findOne({ email: req.body.email }, (err, user) => {
            if (user) {
                return res.send({
                    success: false,
                    message: `Username: ${req.body.email} not available`,
                    route: "user/signup",
                });
            } else {
                const jwt = sign(
                    { email: req.body.email },
                    process.env.JWT_SECRET
                );

                newUser
                    .save()
                    .then(d => {
                        const dd = d.toObject();
                        dd.jwt = jwt;
                        return res.send({
                            success: true,
                            message: dd,
                            route: "user/articles",
                        });
                    })
                    .catch(err => {
                        throw err;
                    });
            }
        });
    },

    changePWD(req: Request, res: Response) {
        User.find({}, (error, users) => {
            return res.send(users);
        });
    },
};

export default userController;
