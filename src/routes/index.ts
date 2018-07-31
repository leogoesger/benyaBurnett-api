import { Router } from "express";
import user from "./user";
import article from "./article";

const router = Router();

router.use("/api/user", user);
router.use("api/article", article);

export default router;
