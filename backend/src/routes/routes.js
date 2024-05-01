import express from "express";

const router = express.Router();

import api from "./api/index.js";
import login from "./login.js";
import signup from "./singup.js";
import logout from "./logout.js";

router.use("/api", api);
router.get("/", (req, res) => {
  res.send("team project");
});

router.use("/login", login);

router.use("/signup", signup);

router.use("/logout", signup);

export default router;
