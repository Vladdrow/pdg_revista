import { Router } from "express";
import { updateUserData, deleteUser } from "../controllers/update.controller.js";

const router = Router();

router.post("/updateUser", updateUserData);
router.delete("/user/:userId", deleteUser);

export default router;
