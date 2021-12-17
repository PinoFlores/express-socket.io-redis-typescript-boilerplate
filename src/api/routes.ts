import {Router} from "express";
import examples from "./routes/examples";

const router = Router();

router.use("/example", examples);

export default router;
