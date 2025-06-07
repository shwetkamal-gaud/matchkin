import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (userId, res) => {
    const secretKey = process.env.JWT_SECRET
    if (secretKey) {
        const token = jwt.sign({ userId }, secretKey, { expiresIn: '10d' })
        res.cookie("jwt", token,
            {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production", 
                sameSite: "None", 
                maxAge: 10 * 24 * 60 * 60 * 1000, 
            }
        )
    }
}