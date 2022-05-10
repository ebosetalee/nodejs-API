import express from "express";
import schema from "../validation-schema.js";
import validate from "../../middleware/validate.js";
import { createUser } from "../controllers/user.js";

const router = express.Router();
const { CREATE } = schema;

router.post("/", validate(CREATE), createUser);

export default router;
