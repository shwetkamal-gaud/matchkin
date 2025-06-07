import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { generateTokenAndSetCookie } from "../utils/generateToken";
import { User } from "../models/user.model";
import { deleteOtp, setOtp, verifyOtp } from "../utils/otpStore";
import { sendOtpEmail } from "../utils/mailer";

export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password, role, gender, profilePicture } = req.body;
        const user = await User.findOne({ email })
        if (user) {
            res.status(400).json({ error: 'User email already exists' })
            return;
        }
        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(password, salt);
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${email}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${email}`
        const newUser = await User.create({ name, email, password: hashed, role, gender, profilePicture: profilePicture ? profilePicture : gender === 'male' ? boyProfilePic : girlProfilePic });

        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res)
            res.status(201).json({
                message: "Registered successfully",
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                profilePic: newUser.profilePicture
            });
        }
        else {
            res.status(400).json({ error: 'Invalid user data' })
        }
    }
    catch (e) {
        res.status(500).json({ error: 'Interval server error' })
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        const isMatch = await bcrypt.compare(password, user?.password || '');
        if (!user || !isMatch) {
            res.status(401).json({ message: 'Invalid username or password' });
            return;
        }
        generateTokenAndSetCookie(user?._id, res)

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profilePic: user.profilePicture
        });
    }
    catch (e) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
    try {
        res.cookie("jwt", "", { maxAge: 0 })
        res.status(200).json({ message: "Logged out Successfully" })
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

export const requestOtp = async (req: Request, res: Response) => {
    const { email } = req.body;
    deleteOtp(email)
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    setOtp(email, otp);
    await sendOtpEmail(email, otp);
    res.json({ message: "OTP sent" });
};

export const loginWithOtp = async (req: Request, res: Response) => {
    const { email, otp } = req.body;
    const valid = await verifyOtp(email, otp);
    if (!valid) { res.status(400).json({ error: "Invalid OTP" }); return }

    let user = await User.findOne({ email });
    if (!user) { res.status(400).json({ error: "User not found" }); return }

    generateTokenAndSetCookie(user?._id, res)
    res.status(200).json({
        message: "OTP Login successful",
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePic: user.profilePicture
    });
};