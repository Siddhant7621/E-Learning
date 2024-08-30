import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import sendMail from "../middlewares/sendMail.js";
import TryCatch from "../middlewares/TryCatch.js";

const cookieOptions = {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
    secure: true
};

export const register = TryCatch(async (req, res) => {
    const { email, name, password } = req.body;

    let user =  await User.findOne({ email });

    if (user) {
        return res.status(400).json({ message: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    user = { name, email, password: hashPassword };

    const otp = Math.floor(Math.random() * 1000000);
    const activationToken = jwt.sign({ user, otp }, process.env.Activation_Secret, { expiresIn: "5m" });

    const data = { name, otp };

    await sendMail(email, "E-Learning", data);

    res.status(200).json({ message: "Otp sent to your mail", activationToken });
});

export const verifyUser = TryCatch(async (req, res) => {
    const { otp, activationToken } = req.body;

    const verify = jwt.verify(activationToken, process.env.Activation_Secret);

    if (!verify) {
        return res.status(400).json({ message: "OTP expired" });
    }
    if (verify.otp !== otp) {
        return res.status(400).json({ message: "Incorrect OTP" });
    }

    await User.create({
        name: verify.user.name,
        email: verify.user.email,
        password: verify.user.password
    });

    res.json({ message: "User created successfully" });
});

export const loginUser = TryCatch(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({ message: "Invalid User" });
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
        return res.status(400).json({ message: "Incorrect Password" });
    }

    // Generate JWT token
    const token = jwt.sign({ _id: user._id }, process.env.Jwt_Sec, { expiresIn: "15d" });

    console.log("Generated Token:", token); // Ensure this is a single valid token

    res.json({ message: `Welcome back ${user.name}`, token, user });
});

export const myProfile = TryCatch(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.json({ user });
});
