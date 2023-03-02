import { Router } from "express";
import authController from "../controllers/authController.js";
import captureController from "../controllers/captureController.js";
import refundController from "../controllers/refundController.js";
import voidController from "../controllers/voidController.js";

const router = Router();

router.post("/authorize", authController);
router.post("/capture", captureController);
router.post("/refund", refundController);
router.post("/void", voidController);

export default router;
