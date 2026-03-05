// fileName: src/app/login/page.tsx (Lokasi Asumsi)
import { LoginForm } from "./LoginForm";
import Image from "next/image";


export default function LoginPage() {
    return (
        // Wrapper luar
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-6">

            {/* Kontainer Utama: 1 kolom di mobile, 2 kolom di desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl w-full max-w-4xl">

                {/* KOLOM KIRI (FORM LOGIN) */}
                <div className="bg-white p-6 sm:p-10 flex items-center justify-center">
                    {/* LoginForm sudah max-w-sm dan di-center di dalamnya */}
                    <LoginForm />
                </div>

                <div className="hidden md:flex bg-accent p-4 items-center justify-center">
                    <Image
                        src="/images/image_login.png"

                        width={300}
                        height={300}
                        alt="Login Illustration"

                    />
                </div>
            </div>
        </div>
    );
}