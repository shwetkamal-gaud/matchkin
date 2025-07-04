import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (userId, res) => {
    const secretKey = process.env.JWT_SECRET
    const isLocal = process.env.NODE_ENV !== 'production';
    if (secretKey) {
        const token = jwt.sign({ userId }, secretKey, { expiresIn: '10d' })
        res.cookie("jwt", token,
            {
                httpOnly: true,
                secure: !isLocal, 
                sameSite: isLocal ? 'Lax' : 'None', 
                maxAge: 10 * 24 * 60 * 60 * 1000, 
            }
        )
    }
}