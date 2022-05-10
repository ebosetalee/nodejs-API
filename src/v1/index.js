import express from "express";
import userRoutes from "../v1/routes/user.js";

const router = express.Router();

router.use("/user", userRoutes);

export default router;