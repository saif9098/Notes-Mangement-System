import express from "express";
import {
  updateUserController,
} from "../controllers/userController.js";
import userAuth from "../middelwares/authMiddleware.js";

//router object
const router = express.Router();

//routes
// GET USER DATA || POST
router.get("/getUser", userAuth, (req, res) => {
  res.status(200,"hello").send({ ok: true });
});

// UPDATE USER || PUT
router.put("/update-user", userAuth, updateUserController);

export default router;
