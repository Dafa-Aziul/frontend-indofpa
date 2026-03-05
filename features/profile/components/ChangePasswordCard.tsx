"use client";

import { useState } from "react";
import { useChangePassword } from "../hooks";
import { Eye, EyeOff } from "lucide-react";

export default function ChangePasswordCard() {
    const { submit, isLoading } = useChangePassword();

    const [currentPassword, setCurrent] = useState("");
    const [newPassword, setNew] = useState("");
    const [confirmPassword, setConfirm] = useState("");

    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [errorCurrent, setErrorCurrent] = useState("");
    const [errorConfirm, setErrorConfirm] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setErrorCurrent("");
        setErrorConfirm("");

        // cek konfirmasi password
        if (newPassword !== confirmPassword) {
            setErrorConfirm("Konfirmasi password tidak sama");
            return;
        }

        const success = await submit({
            currentPassword,
            newPassword,
            confirmPassword,
        });

        if (!success) {
            // password lama salah
            setErrorCurrent("Password lama salah");

            // reset password baru
            setNew("");
            setConfirm("");
            return;
        }

        // jika berhasil
        setCurrent("");
        setNew("");
        setConfirm("");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white border rounded-xl p-6 space-y-4"
        >
            <h2 className="text-lg font-bold">Ganti Password</h2>

            <div className="space-y-3">

                {/* PASSWORD LAMA */}
                <div className="space-y-1">
                    <div className="relative">
                        <input
                            type={showCurrent ? "text" : "password"}
                            placeholder="Password Lama"
                            value={currentPassword}
                            onChange={(e) => {
                                setCurrent(e.target.value);
                                setErrorCurrent("");
                            }}
                            className={`w-full rounded-lg px-3 py-2 pr-10 border ${errorCurrent ? "border-red-500" : "border-gray-300"
                                }`}
                        />

                        <button
                            type="button"
                            onClick={() => setShowCurrent(!showCurrent)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                        >
                            {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    {errorCurrent && (
                        <p className="text-sm text-red-500">{errorCurrent}</p>
                    )}
                </div>

                {/* PASSWORD BARU */}
                <div className="relative">
                    <input
                        type={showNew ? "text" : "password"}
                        placeholder="Password Baru"
                        value={newPassword}
                        onChange={(e) => {
                            setNew(e.target.value);
                            setErrorConfirm("");
                        }}
                        className={`w-full rounded-lg px-3 py-2 pr-10 border ${errorConfirm ? "border-red-500" : "border-gray-300"
                            }`}
                    />

                    <button
                        type="button"
                        onClick={() => setShowNew(!showNew)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                        {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>

                {/* KONFIRMASI PASSWORD */}
                <div className="space-y-1">
                    <div className="relative">
                        <input
                            type={showConfirm ? "text" : "password"}
                            placeholder="Konfirmasi Password"
                            value={confirmPassword}
                            onChange={(e) => {
                                setConfirm(e.target.value);
                                setErrorConfirm("");
                            }}
                            className={`w-full rounded-lg px-3 py-2 pr-10 border ${errorConfirm ? "border-red-500" : "border-gray-300"
                                }`}
                        />

                        <button
                            type="button"
                            onClick={() => setShowConfirm(!showConfirm)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                        >
                            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    {errorConfirm && (
                        <p className="text-sm text-red-500">{errorConfirm}</p>
                    )}
                </div>
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg"
            >
                {isLoading ? "Menyimpan..." : "Update Password"}
            </button>
        </form>
    );
}