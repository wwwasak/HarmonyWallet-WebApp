import express from "express";

const router = express.Router();

import api from "./api/index.js";
import login from "./login.js";
import signup from "./signup.js";

router.use("/api", api);
router.get("/", (req, res) => {
  res.send("team project");
});

router.use("/login", login);

router.use("/signup", signup);

export default router;
