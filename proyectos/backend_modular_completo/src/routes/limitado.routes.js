const express = require("express");
const limiter = require("../middleware/rateLimit");

const router = express.Router();

router.get("/limitado", limiter, (req, res) => {
    res.json({ message: "Soy un endpoint limitado" });
});

module.exports = router;
