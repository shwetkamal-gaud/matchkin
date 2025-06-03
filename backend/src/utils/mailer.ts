import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendOTPEmail = async (to: string, otp: string) => {
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}. It expires in 5 minutes.`,
    });
};

export const sendInfo = async (to:string) => {
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject: 'Info',
        text: `Your in waiting list.`,
    });
}
