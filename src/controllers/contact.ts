import { Request, Response } from "express";
import * as nodemailer from "nodemailer";
import * as mg from "nodemailer-mailgun-transport";
import { validateEmail } from "../utils/helpers";

const auth = {
    auth: {
        api_key: process.env.MAILGUN_API_KEY,
        domain: process.env.MAILGUN_DOMAIN,
    },
};

interface IBody extends Request {
    body: {
        name: string;
        email: string;
        phone: string;
        msg: string;
    };
}

const nodeMailerMailgun = nodemailer.createTransport(mg(auth));

const contactController = {
    submit: (req: IBody, res: Response) => {
        const { name, email, phone, msg } = req.body;

        if (!name || !email || !phone || !msg || !validateEmail(email)) {
            return res.status(400).send({ message: "Invalid Message!" });
        }

        const mailOptions = {
            from: `${name} <${email}>`, // sender address
            to: "leoq91@gmail.com", // list of receivers
            subject: "Design Service Inc", // Subject line
            text: "Phone: " + phone + "\n" + msg, // plain text body
        };
        nodeMailerMailgun.sendMail(mailOptions, error => {
            if (error) {
                res.status(400).send({ message: "Something Went Wrong" });
            }
        });
        res.status(200).send({ message: "Message Sent!" });
    },
};

export default contactController;
