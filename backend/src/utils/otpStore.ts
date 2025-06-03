interface OTPEntry {
    otp: string;
    expiresAt: number;
}

const otpStore = new Map<string, OTPEntry>();

export const setOTP = (email: string, otp: string) => {
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes
    otpStore.set(email, { otp, expiresAt });
};

export const verifyOTP = (email: string, otp: string): boolean => {
    const entry = otpStore.get(email);
    if (!entry) return false;
    if (Date.now() > entry.expiresAt) {
        otpStore.delete(email);
        return false;
    }
    const isValid = entry.otp === otp;
    if (isValid) otpStore.delete(email);
    return isValid;
};
  