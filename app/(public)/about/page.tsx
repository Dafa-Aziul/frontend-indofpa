import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Home",
    description: "Platform Kuisioner Online yang Mudah & Cepat",
};

export default function AboutPage() {
    return (
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 py-10 items-center">

            {/* TEKS */}
            <div className="md:col-span-7 p-4 flex flex-col justify-center gap-4 order-2 md:order-1">

                <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                    Tentang Kami
                </h2>

                <p className="text-base md:text-xl text-gray-700">
                    IndoFPA adalah aplikasi kuisioner untuk menggali pandangan masyarakat Indonesia tentang kebijakan luar negeri secara mudah, cepat, dan aman.
                    Kami menghadirkan platform transparan dan terpercaya agar suara publik benar-benar diperhitungkan dalam pengambilan keputusan.
                    Dengan IndoFPA, partisipasi masyarakat menjadi lebih inklusif sehingga kebijakan luar negeri dapat mencerminkan kebutuhan dan aspirasi rakyat.
                </p>
                <h1 className="text-xl md:text-2xl font-large font-bold text-green-500">
                    Selamat Datang di IndoFPA
                </h1>

            </div>

            {/* GAMBAR */}
            <div className="md:col-span-5 p-4 order-1 md:order-2 flex justify-center">
                <div className="relative w-full max-w-[380px] md:max-w-none h-[300px] md:h-[550px]">
                    <Image
                        src="/images/image_contact.png"
                        alt="Hero"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
            </div>

        </div>
    );
}
