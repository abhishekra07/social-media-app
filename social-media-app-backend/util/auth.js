import jwt from "jsonwebtoken";

export const generateToken = (payload, secretKey, expiresIn) => {
  return jwt.sign(payload, secretKey, { expiresIn });
};

export const verifyToken = (req, res, next) => {
  const excludedPaths = [
    "/api/users/register",
    "/api/users/login",
    "/api/users/logout",
  ]; // Define paths to exclude from verification

  if (excludedPaths.includes(req.path)) {
    return next();
  }

  console.log("req.cookies ", req.cookies);

  const token = req.cookies && req.cookies["authToken"];

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).json({ success: false, message: "Invalid token." });
  }
};
