import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

export const isAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(403).json({ message: "Authorization header missing" });
        }

        const token = authHeader.split(" ")[1];
        console.log("Received Token:", token); // Log the token

        if (!token || token.split('.').length !== 3) {
            return res.status(403).json({ message: "Invalid Token Structure" });
        }

        const decodedData = jwt.verify(token, process.env.Jwt_Sec);
        req.user = await User.findById(decodedData._id);

        if (!req.user) {
            return res.status(403).json({ message: "Invalid Token - User Not Found" });
        }

        next();
    } catch (error) {
        console.error("Token Error:", error.message);
        res.status(500).json({ message: "Invalid or Expired Token" });
    }
};



// export const isAuth = async (req, res, next) => {
//     try {
//         // const token = req.cookies;

//         const token = req.headers.authorization?.split(" ")[1];

//         if (!token) {
//             return res.status(403).json({ message: "Please Login" });
//         }

//         const decodedData = jwt.verify(token, process.env.Jwt_Sec);

//         req.user = await User.findById(decodedData._id);

//         if (!req.user) {
//             return res.status(403).json({ message: "Please Login" });
//         }

//         next();
//     } catch (error) {
//         console.error("Error:", error.message);
//         res.status(500).json({ message: "Login First" });
//     }
// };

export const isAdmin = (req, res, next) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "You are not admin" });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
