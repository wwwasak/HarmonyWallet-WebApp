import express from "express";

const router = express.Router();

import api from "./api/index.js";
import login from "./login.js";

router.use("/api", api);
router.get("/", (req, res) => {
  res.send("team project");
});

router.use("/login", login);

export default router;
