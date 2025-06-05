import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (userId, res) => {
    const secretKey = process.env.JWT_SECRET
    if (secretKey) {
        const token = jwt.sign({ userId }, secretKey, { expiresIn: '10d' })
        res.cookie("jwt", token,
            {
                maxAge: 10 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: 'strict',
                secure: process.env.NODE_ENV !== 'development'
            }
        )
    }
}