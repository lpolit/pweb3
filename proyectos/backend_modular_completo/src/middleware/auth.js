const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) return res.status(403).json({ message: "Token Requerido" });

    jwt.verify(token.split(" ")[1], "123456", (err, decoded) => {
        if (err) return res.status(401).json({ message: "Token Invalido" });
        req.user = decoded;
        next();
    });
};
