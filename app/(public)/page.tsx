import Image from "next/image";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Platform Kuisioner Online yang Mudah & Cepat",
};

export default function Home() {
  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 py-10 items-center">

      {/* TEKS */}
      <div className="md:col-span-7 p-4 flex flex-col justify-center gap-4 order-2 md:order-1">
        <h1 className="text-xl md:text-2xl font-large font-bold text-green-500">
          Selamat Datang di IndoFPA
        </h1>

        <h2 className="text-3xl md:text-5xl font-bold leading-tight">
          Platform Kuisioner Online yang Mudah & Cepat
        </h2>

        <p className="text-base md:text-xl text-gray-700">
          Bantu penelitian dengan mengisi kuisioner secara online, cepat, dan aman.
        </p>

        <Button className="bg-green-600 hover:bg-green-700 text-white rounded-full px-8 py-6 md:px-6 md:py-4 text-lg md:text-base w-fit shadow-md mt-2">
          Coba test
        </Button>
      </div>

      {/* GAMBAR */}
      <div className="md:col-span-5 p-4 order-1 md:order-2 flex justify-center">
        <div className="relative w-full max-w-[380px] md:max-w-none h-[300px] md:h-[550px]">
          <Image
            src="/images/image_home.png"
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
