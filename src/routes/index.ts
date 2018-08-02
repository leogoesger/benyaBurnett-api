import { Router } from "express";
import user from "./user";
import article from "./article";
import contact from "./contact";

const router = Router();

router.use("/api/user", user);
router.use("/api/articles", article);
router.use("/api/contact", contact);

export default router;
