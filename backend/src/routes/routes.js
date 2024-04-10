import express from "express";

const router = express.Router();

// Adds both the /products and /orders routes.
import api from "./api/index.js";
router.use("/api", api);
router.get("/", (req, res) => {
  res.send("team project");
});

export default router;
