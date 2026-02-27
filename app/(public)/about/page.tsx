// src/app/about/page.tsx
import Image from "next/image";
import { ShieldCheck, Users, Globe2, Target, Heart } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Tentang Kami | IndoFPA",
    description: "Mengenal lebih dekat IndoFPA, platform aspirasi publik untuk kebijakan luar negeri Indonesia.",
};

export default function AboutPage() {
    return (
        <div className="bg-white min-h-screen relative overflow-hidden">

            {/* Background Decor - Disesuaikan agar tidak mengganggu scroll mobile */}
            <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-emerald-50 rounded-full blur-3xl opacity-60 -z-10" />

            <div className="container mx-auto px-6 pt-20 pb-12 md:pt-40 md:pb-24">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">

                    <div className="md:col-span-5 order-1 md:order-2">
                        <div className="relative w-full aspect-square max-w-[320px] md:max-w-none mx-auto">

                            <div className="absolute -top-4 -left-4 w-full h-full border-2 border-emerald-100 rounded-[2.5rem] -z-10 hidden md:block" />

                            <div className="absolute -bottom-10 -right-6 bg-white/95 backdrop-blur-md p-6 rounded-4xl shadow-2xl z-20 max-w-[260px] hidden lg:block border border-emerald-50">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2.5 bg-emerald-600 rounded-2xl shadow-lg shadow-emerald-200">
                                        <Target className="h-5 w-5 text-white" />
                                    </div>
                                    <h5 className="font-bold text-slate-900">Misi Kami</h5>
                                </div>
                                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                                    Mewujudkan pengambilan kebijakan yang demokratis berbasis data publik yang terverifikasi.
                                </p>
                            </div>

                            <div className="relative w-full h-full">
                                <Image
                                    src="/images/image_contact.png"
                                    alt="Tentang IndoFPA"
                                    fill
                                    className="object-contain drop-shadow-2xl"
                                    priority
                                />
                            </div>
                        </div>
                    </div>

                    {/* BAGIAN TEKS */}
                    <div className="md:col-span-7 flex flex-col gap-6 md:gap-8 order-2 md:order-1 text-center md:text-left">
                        <div>
                            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full mb-4 md:mb-6">
                                <Users className="h-4 w-4" />
                                <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest">Mengenal IndoFPA</span>
                            </div>

                            <h2 className="text-3xl md:text-6xl font-black text-slate-900 leading-[1.2] md:leading-[1.1] tracking-tight">
                                Menjadi Jembatan <br className="hidden md:block" />
                                <span className="text-emerald-600">Aspirasi Rakyat.</span>
                            </h2>
                        </div>

                        <div className="space-y-4 md:space-y-6 text-slate-600 leading-relaxed text-base md:text-xl">
                            <p>
                                <span className="font-bold text-slate-900">IndoFPA</span> hadir sebagai platform kuesioner inovatif yang didedikasikan untuk menggali pandangan masyarakat tentang arah kebijakan luar negeri Indonesia.
                            </p>
                            <p className="hidden md:block">
                                Kami percaya kebijakan yang kuat lahir dari pemahaman mendalam terhadap aspirasi publik. Kami menghadirkan teknologi transparan agar suara Anda diperhitungkan secara akurat.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 pt-4">
                            <div className="group flex items-start gap-4 p-4 md:p-5 rounded-2xl md:rounded-3xl bg-slate-50 border border-slate-100 text-left transition-all hover:bg-white hover:shadow-xl hover:border-emerald-200">
                                <div className="p-3 bg-white shadow-sm rounded-xl md:rounded-2xl h-fit group-hover:bg-emerald-600 transition-colors">
                                    <ShieldCheck className="h-5 w-5 md:h-6 md:w-6 text-emerald-600 group-hover:text-white" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-sm md:text-base">Data Aman</h4>
                                    <p className="text-xs md:text-sm text-slate-500">Privasi responden adalah prioritas utama.</p>
                                </div>
                            </div>

                            <div className="group flex items-start gap-4 p-4 md:p-5 rounded-2xl md:rounded-3xl bg-slate-50 border border-slate-100 text-left transition-all hover:bg-white hover:shadow-xl hover:border-emerald-200">
                                <div className="p-3 bg-white shadow-sm rounded-xl md:rounded-2xl h-fit group-hover:bg-emerald-600 transition-colors">
                                    <Globe2 className="h-5 w-5 md:h-6 md:w-6 text-emerald-600 group-hover:text-white" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-sm md:text-base">Inklusivitas</h4>
                                    <p className="text-xs md:text-sm text-slate-500">Menjangkau suara seluruh pelosok negeri.</p>
                                </div>
                            </div>
                        </div>

                        {/* Quote */}
                        <div className="flex items-center gap-4 mt-2 p-4 border-l-4 border-emerald-500 bg-emerald-50/40 rounded-r-2xl text-left">
                            <Heart className="h-5 w-5 text-emerald-600 shrink-0" />
                            <p className="text-xs md:text-base font-medium text-emerald-900 italic">
                                Tempat di mana setiap suara memiliki makna bagi masa depan bangsa.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}