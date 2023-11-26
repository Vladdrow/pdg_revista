import { Router } from "express";

import {
    register,
    login,
    logout,
    confirmPaymentAndGenerateKey,
    session,
    buySubscription,
} from "../controllers/auth.controllers.js";
import authenticateJWT from "../middlewares/tokenMiddleware.js";


const router = Router();

/* router.post("/register", register);
router.post("/login", login); */
router.post("/register", register);
router.post("/login", login);
router.post("/confirm-payment", confirmPaymentAndGenerateKey);
router.post("/logout", logout);
router.get("/session", authenticateJWT, session);
router.post("/buySubscription", buySubscription);
/* router.post("/verify", verifyTokenController); */

export default router;
