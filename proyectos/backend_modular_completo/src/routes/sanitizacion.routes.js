const express = require("express");
const { body, validationResult } = require("express-validator");
const sanitizeHtml = require("sanitize-html");

const router = express.Router();

router.post("/sanitizado", body("comment").isString().trim(), (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

    const limpio = sanitizeHtml(req.body.comment);
    res.json({ message: "comentario seguro", limpio });
});

router.post("/sinsanitizar", body("comment"), (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

    res.json({ comment: req.body.comment });
});

router.post("/validarcaracteres", (req, res) => {
    const message = req.body.message;

    if (!/^[a-zA-Z0-9\s]+$/.test(message)) {
        return res.status(400).send("mensaje con caracteres invalidos");
    }

    res.json({ message });
});

module.exports = router;
