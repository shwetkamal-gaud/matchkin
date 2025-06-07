'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { Building, ArrowRight } from "lucide-react";
import getBaseUrl from "@/lib/getBaseUrl";
import Link from "next/link";
import ProfilePicUplod from "./ProfilePicUplod";
import { useAuthStore } from '@/store/authStore';
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
const baseUrl = getBaseUrl();

const AuthPage = ({ type }: { type: "login" | "signup" }) => {
    const [useOTP, setUseOTP] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otpRequested, setOtpRequested] = useState(false);
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [profilePicUrl, setProfilePicUrl] = useState("");
    const [profilePicKey, setProfilePicKey] = useState("");
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [role, setRole] = useState("");
    const [profilePic, setProfilePic] = useState<File | null>(null);
    const router = useRouter()
    const login = useAuthStore((state) => state.login)
    const {setAuthUser} = useAuthContext()
    const handleOtpChange = (index: number, value: string) => {
        if (/^\d$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            if (index < 3) document.getElementById(`otp-${index + 1}`)?.focus();
        }
    };
    const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace") {
            e.preventDefault();
            const newOtp = [...otp];

            if (otp[index]) {
               
                newOtp[index] = '';
                setOtp(newOtp);
            } else if (index > 0) {
                document.getElementById(`otp-${index - 1}`)?.focus();
                newOtp[index - 1] = '';
                setOtp(newOtp);
            }
        }
      };

    const handleRequestOTP = async () => {
        const res = await fetch(`${baseUrl}/api/auth/otp/request`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
            credentials: 'include'
        });

        const data = await res.json();
        if (res.ok) {
            setOtpRequested(true);
        } else {
            alert(data?.error || "Failed to send OTP.");
        }
    };

    const handleVerifyOTP = async () => {
        const enteredOTP = otp.join("");
        const res = await fetch(`${baseUrl}/api/auth/otp/verify`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, otp: enteredOTP }),
            credentials:'include'
        });

        const data = await res.json();
        if (res.ok) {
            login({ email: data.email, name: data.name })
            setAuthUser(data)
            localStorage.setItem("user", JSON.stringify(data))
            router.push('/')
        } else {
            alert(data?.error || "Invalid OTP");
        }
    };

    const handleLoginOrSignup = async () => {
        let uploadedImageUrl = profilePicUrl;

        if (type === "signup" && profilePic && !profilePicUrl) {
            try {
                const s3Res = await fetch(`${baseUrl}/api/s3/generate-upload-url`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        fileName: profilePic.name,
                        fileType: profilePic.type,
                    }),
                    
                });

                const { signedUrl, fileUrl } = await s3Res.json();
                await fetch(signedUrl, {
                    method: 'PUT',
                    headers: { 'Content-Type': profilePic.type },
                    body: profilePic,
                });

                uploadedImageUrl = fileUrl;
            } catch (err) {
                console.error('Image upload failed:', err);
                alert('Failed to upload image. Try again.');
                return;
            }
        }
        const url = type === "signup" ? `${baseUrl}/api/auth/signup` : `${baseUrl}/api/auth/login`;
        const payload: any = { email, password };

        if (type === "signup") {
            payload.name = name;
            payload.gender = gender;
            payload.role = role;
            payload.profilePicture = uploadedImageUrl || '';
        }

        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
            credentials: 'include'
        });

        const data = await res.json();
        if (res.ok) {
            login({ email: data.email, name: data.name })
            setAuthUser(data)
            localStorage.setItem("user",JSON.stringify(data))
            router.push('/')
        } else {
            alert(data?.error || "Failed");
        }
    };

    return (
        <div className="flex flex-grow items-center justify-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className=" backdrop-blur-lg shadow-lg dark:shadow-2xl  rounded-lg p-6 w-full max-w-sm"
            >
                <div className="text-orange-500 mb-4 flex justify-center">
                    <Building className="w-12 h-12 text-[#ff691f]" />
                </div>

                <motion.h2 className="text-xl font-semibold mb-2 dark:text-white text-gray-900 text-center">
                    {type === "login" ? "Welcome Back" : "Join Us"}
                </motion.h2>

                <p className="text-gray-600 dark:text-white/70 text-sm mb-4 text-center">
                    {useOTP
                        ? otpRequested
                            ? "Enter the OTP sent to your email."
                            : "Enter your email to receive an OTP."
                        : type === "login"
                            ? "Sign in to your account."
                            : "Create an account to get started."}
                </p>

                <form className="w-full space-y-4 text-gray-600 dark:text-white/70" onSubmit={e => e.preventDefault()}>
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:border-orange-500"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    {!useOTP && (
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-orange-500"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    )}

                    {type === "signup" && !useOTP && (
                        <>
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-orange-500"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                            <select
                                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-orange-500"
                                value={gender}
                                onChange={e => setGender(e.target.value)}
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                            <select
                                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-orange-500"
                                value={role}
                                onChange={e => setRole(e.target.value)}
                            >
                                <option value="">Select Role</option>
                                <option value="client">Client</option>
                                <option value="consultant">Consultant</option>
                            </select>
                            <ProfilePicUplod
                                onChnage={(file) => setProfilePic(file)}
                                onRemove={() => {
                                    setProfilePic(null);
                                    setProfilePicKey("");
                                }}
                            />
                        </>
                    )}

                    {useOTP && otpRequested && (
                        <div className="flex gap-2 justify-center">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    id={`otp-${index}`}
                                    type="text"
                                    maxLength={1}
                                    className="w-12 h-12 text-center text-xl border rounded"
                                    value={digit}
                                    onChange={(e) => handleOtpChange(index, e.target.value)}
                                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                />
                            ))}
                        </div>
                    )}

                    {useOTP ? (
                        otpRequested ? (
                            <button
                                type="button"
                                onClick={handleVerifyOTP}
                                className="bg-orange-500 text-white px-4 py-2 rounded w-full"
                            >
                                Verify OTP <ArrowRight size={18} className="inline ml-1" />
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={handleRequestOTP}
                                className="bg-orange-500 text-white px-4 py-2 rounded w-full"
                            >
                                Request OTP <ArrowRight size={18} className="inline ml-1" />
                            </button>
                        )
                    ) : (
                        <button
                            type="button"
                            onClick={handleLoginOrSignup}
                            className="bg-orange-500 text-white px-4 py-2 rounded w-full"
                        >
                            {type === "login" ? "Login" : "Sign Up"} <ArrowRight size={18} className="inline ml-1" />
                        </button>
                    )}
                </form>

                <button
                    className="mt-4 text-orange-500 font-semibold text-sm hover:underline"
                    onClick={() => {
                        setUseOTP(!useOTP);
                        setOtpRequested(false);
                        setOtp(["", "", "", ""]);
                    }}
                >
                    {useOTP ? "Use Password Login" : "Login with OTP"}
                </button>

                <div className="mt-4 text-center text-gray-600 dark:text-white/70 text-sm">
                    {type === "login" ? (
                        <p>
                            Don't have an account?{" "}
                            <Link href="/signup" className="text-orange-500 hover:underline">Sign Up</Link>
                        </p>
                    ) : (
                        <p>
                            Already have an account?{" "}
                            <Link href="/login" className="text-orange-500 hover:underline">Login</Link>
                        </p>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default AuthPage;
