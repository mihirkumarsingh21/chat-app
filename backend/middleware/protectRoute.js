import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
    try {
        // Check if req.cookies exists and jwt-token exists
        if (!req.cookies || !req.cookies['jwt-token']) {
            return res.status(401).json({ error: "Unauthorized - No Token Provided" });
        }

        const token = req.cookies['jwt-token'];
        console.log(`TOKEN IN PROTECT ROUTE: ${token}`);

        const decoded = jwt.verify(token, process.env.SECRECT_KEY);

        if (!decoded) {
            return res.status(401).json({ error: "Unauthorized - Invalid Token" });
        }

        console.log(`DECODED IN PROTECT ROUTE:${JSON.stringify(decoded,null,2)}`);

      const user = await User.findById(decoded.userId);

      if(!user) {
        res.status(400).json({error: "User not found."})
      }

      req.user = user;

        next();
    } catch (error) {
        console.log(`Error in protect routes: ${error.message}`);
       return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};


