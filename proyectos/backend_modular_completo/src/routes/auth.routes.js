const express = require("express");
const jwt = require("jsonwebtoken");
const users = require("../data/users");

const router = express.Router();

router.post("/login", (req, res) => {
    const { username, password } = req.body;

    const user = users.find(
        u => u.username === username && u.password === password
    );

    if (!user) {
        return res.status(401).json({ message: "Credenciales Incorrectas" });
    }

    const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        "123456",
        { expiresIn: "1h" }
    );

    res.json({ accessToken: token });
});

module.exports = router;
