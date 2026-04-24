const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log("HEADER:", authHeader); // debug

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token missing or malformed" });
  }

  try {
    const token = authHeader.split(" ")[1]; // ✅ extract actual token

    console.log("TOKEN:", token);

    const decoded = jwt.verify(token, process.env.SCREATE_KEY);

    console.log("DECODED:", decoded);

    req.user = decoded;
    next();
  } catch (error) {
    console.log("JWT ERROR:", error.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = verifyToken;