"use client";

import React from 'react';
import { useFillKuesioner } from '../hooks';
import {
    USIA_KATEGORI,
    JENIS_KELAMIN,
    TINGKAT_PENDIDIKAN,
    AGAMA
} from '../schemas';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2, Send, ChevronRight, ChevronLeft, User, ClipboardList } from 'lucide-react';

const labelMapping: Record<string, string> = {
    USIA_18_24: "18-24 Tahun", USIA_25_34: "25-34 Tahun", USIA_35_44: "35-44 Tahun",
    USIA_45_54: "45-54 Tahun", USIA_55_64: "55-64 Tahun", USIA_65_PLUS: "65+ Tahun",
    TidakTamatSD: "Tidak Tamat SD", KristenProtestan: "Kristen Protestan"
};

export const IsiKuesionerView = ({ kodeAkses }: { kodeAkses: string }) => {
    const {
        data,
        isLoading,
        isValidatingEmail,
        step,
        setStep,
        profile,
        updateProfile,
        answers,
        setAnswers,
        handleNextStep,
        handleSubmit,
        isSubmitting,
        errors
    } = useFillKuesioner(kodeAkses);

    if (isLoading) return (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
            <Loader2 className="animate-spin text-emerald-600 mb-4" size={40} />
            <p className="text-gray-500 font-medium">Menyiapkan kuesioner...</p>
        </div>
    );

    const kuesioner = data?.kuesioner;
    const pertanyaanList = data?.pertanyaan || [];

    return (
        <div className="max-w-2xl mx-auto p-4 py-10">
            {/* Step Indicator */}
            <div className="flex items-center justify-center mb-12 gap-4">
                <div className={`flex items-center gap-3 ${step === 1 ? "text-emerald-600 scale-105" : "text-gray-300"}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step === 1 ? "border-emerald-600 bg-emerald-50 font-black shadow-lg shadow-emerald-100" : "border-gray-200"}`}>1</div>
                    <span className="text-sm font-bold">Profil</span>
                </div>
                <div className="w-12 h-0.5 bg-gray-100"></div>
                <div className={`flex items-center gap-3 ${step === 2 ? "text-emerald-600 scale-105" : "text-gray-300"}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step === 2 ? "border-emerald-600 bg-emerald-50 font-black shadow-lg shadow-emerald-100" : "border-gray-200"}`}>2</div>
                    <span className="text-sm font-bold">Kuesioner</span>
                </div>
            </div>

            {step === 1 ? (
                /* --- STEP 1: PROFIL (Sama seperti sebelumnya) --- */
                <Card className="border-emerald-100 shadow-2xl shadow-emerald-900/5 rounded-[2.5rem] overflow-hidden">
                    <CardHeader className="bg-emerald-600 text-white p-8">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-white/20 rounded-2xl"><User size={24} /></div>
                            <CardTitle className="text-2xl font-black uppercase tracking-tight">Profil Responden</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="p-8 space-y-6">
                        <div className="space-y-2">
                            <Label className="font-bold">Nama Lengkap</Label>
                            <Input
                                className={`h-12 rounded-xl ${errors.nama ? "border-red-500 bg-red-50/20" : "border-emerald-100"}`}
                                placeholder="Contoh: Suparman"
                                value={profile.nama}
                                onChange={e => updateProfile('nama', e.target.value)}
                            />
                            {errors.nama && <p className="text-red-500 text-[10px] font-bold italic">{errors.nama}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label className="font-bold">Alamat Email</Label>
                            <Input
                                className={`h-12 rounded-xl ${errors.email ? "border-red-500 bg-red-50/20" : "border-emerald-100"}`}
                                placeholder="suparman@example.com"
                                value={profile.email}
                                onChange={e => updateProfile('email', e.target.value)}
                            />
                            {errors.email && <p className="text-red-500 text-[10px] font-bold italic">{errors.email}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="font-bold">Kategori Usia</Label>
                                <Select value={profile.usiaKategori} onValueChange={v => updateProfile('usiaKategori', v)}>
                                    <SelectTrigger className={`h-12 rounded-xl ${errors.usiaKategori ? "border-red-500 bg-red-50/20" : "border-emerald-100"}`}>
                                        <SelectValue placeholder="Pilih Usia" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {USIA_KATEGORI.map(val => <SelectItem key={val} value={val}>{labelMapping[val] || val}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                                {errors.usiaKategori && <p className="text-red-500 text-[10px] font-bold ">{errors.usiaKategori}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label className="font-bold">Jenis Kelamin</Label>
                                <RadioGroup className="flex pt-3 gap-6" value={profile.jenisKelamin} onValueChange={v => updateProfile('jenisKelamin', v)}>
                                    {JENIS_KELAMIN.map(val => (
                                        <div key={val} className="flex items-center space-x-2">
                                            <RadioGroupItem value={val} id={val} />
                                            <Label htmlFor={val} className="cursor-pointer">{val === 'L' ? 'Laki-laki' : 'Perempuan'}</Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                                {errors.jenisKelamin && <p className="text-red-500 text-[10px] font-bold italic">{errors.jenisKelamin}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="font-bold">Pendidikan Terakhir</Label>
                                <Select value={profile.tingkatPendidikan} onValueChange={v => updateProfile('tingkatPendidikan', v)}>
                                    <SelectTrigger className={`h-12 rounded-xl ${errors.tingkatPendidikan ? "border-red-500 bg-red-50/20" : "border-emerald-100"}`}>
                                        <SelectValue placeholder="Pilih" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {TINGKAT_PENDIDIKAN.map(val => <SelectItem key={val} value={val}>{labelMapping[val] || val}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                                {errors.tingkatPendidikan && <p className="text-red-500 text-[10px] font-bold italic">{errors.tingkatPendidikan}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label className="font-bold">Agama</Label>
                                <Select value={profile.agama} onValueChange={v => updateProfile('agama', v)}>
                                    <SelectTrigger className={`h-12 rounded-xl ${errors.agama ? "border-red-500 bg-red-50/20" : "border-emerald-100"}`}>
                                        <SelectValue placeholder="Pilih" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {AGAMA.map(val => <SelectItem key={val} value={val}>{labelMapping[val] || val}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                                {errors.agama && <p className="text-red-500 text-[10px] font-bold italic">{errors.agama}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="font-bold">Pekerjaan</Label>
                            <Input
                                className={`h-12 rounded-xl ${errors.pekerjaan ? "border-red-500 bg-red-50/20" : "border-emerald-100"}`}
                                placeholder="Contoh: Mahasiswa"
                                value={profile.pekerjaan}
                                onChange={e => updateProfile('pekerjaan', e.target.value)}
                            />
                            {errors.pekerjaan && <p className="text-red-500 text-[10px] font-bold italic">{errors.pekerjaan}</p>}
                        </div>
                    </CardContent>
                    <CardFooter className="p-8 border-t border-emerald-50">
                        <Button onClick={handleNextStep} disabled={isValidatingEmail} className="w-full bg-emerald-600 hover:bg-emerald-700 h-16 rounded-3xl font-black text-xl shadow-xl shadow-emerald-200">
                            {isValidatingEmail ? <Loader2 className="mr-2 animate-spin" /> : <>LANJUT <ChevronRight className="ml-2" /></>}
                        </Button>
                    </CardFooter>
                </Card>
            ) : (
                /* --- STEP 2: KUESIONER (DENGAN LABEL SKALA DINAMIS) --- */
                <div className="space-y-8 animate-in fade-in duration-500">
                    {/* Header Card Nama Kuesioner tetap sama */}
                    <div className="bg-white p-8 rounded-[2.5rem] border border-emerald-100 shadow-xl relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-2 h-full bg-emerald-600"></div>
                        <h2 className="text-2xl font-black text-emerald-900 uppercase leading-tight">{kuesioner?.judul}</h2>
                        <p className="text-xs font-bold text-emerald-700 mt-2 uppercase tracking-widest">{profile.nama} • {profile.pekerjaan}</p>
                    </div>

                    {pertanyaanList.map((q: any, idx: number) => {
                        // ✅ 1. Ambil kunci dari labelSkala dan urutkan (biar 1, 2, 3... dst)
                        const skalaKeys = Object.keys(q.labelSkala || {}).sort((a, b) => Number(a) - Number(b));
                        const jumlahKolom = skalaKeys.length;

                        return (
                            <Card key={q.pertanyaanId} className="border-none shadow-xl shadow-emerald-900/5 rounded-[2.5rem] overflow-hidden">
                                <CardHeader className="bg-emerald-50/30 p-8 border-b border-emerald-50">
                                    <CardTitle className="text-xl flex gap-5 italic font-bold">
                                        <span className="w-12 h-12 bg-emerald-600 text-white rounded-2xl flex items-center justify-center font-black shrink-0 shadow-lg shadow-emerald-200">
                                            {idx + 1}
                                        </span>
                                        <span className="text-gray-800 pt-1 leading-relaxed">{q.teksPertanyaan}</span>
                                    </CardTitle>
                                </CardHeader>

                                <CardContent className="p-8">
                                    {/* ✅ 2. Gunakan style inline untuk grid-cols dinamis agar pas dengan jumlah pilihan */}
                                    <div
                                        className="grid gap-2 md:gap-4"
                                        style={{
                                            gridTemplateColumns: `repeat(${jumlahKolom}, minmax(0, 1fr))`
                                        }}
                                    >
                                        {skalaKeys.map((key) => {
                                            const val = Number(key);
                                            const labelText = q.labelSkala[key];
                                            const isSelected = answers[q.pertanyaanId] === val;

                                            return (
                                                <div key={key} className="flex flex-col items-center gap-3">
                                                    <Button
                                                        variant={isSelected ? "default" : "outline"}
                                                        className={`w-full h-14 md:h-16 rounded-2xl font-black text-xl md:text-2xl transition-all duration-300 ${isSelected
                                                            ? "bg-emerald-600 scale-105 shadow-2xl shadow-emerald-300 ring-4 ring-emerald-50"
                                                            : "border-emerald-100 hover:border-emerald-400 text-gray-400 hover:text-emerald-600"
                                                            }`}
                                                        onClick={() => setAnswers({ ...answers, [q.pertanyaanId]: val })}
                                                    >
                                                        {val}
                                                    </Button>

                                                    {/* ✅ 3. Label di bawah angka (Sangat Tidak Setuju, dsb) */}
                                                    <span className={`text-[8px] md:text-[10px] text-center font-bold uppercase leading-tight px-0.5 transition-colors ${isSelected ? "text-emerald-600" : "text-gray-400"
                                                        }`}>
                                                        {labelText}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}

                    <div className="flex gap-4 pt-8">
                        <Button variant="ghost" onClick={() => setStep(1)} className="h-16 px-8 text-emerald-600 font-bold hover:bg-emerald-50 rounded-2xl">
                            <ChevronLeft className="mr-2" /> Kembali
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="flex-1 bg-emerald-600 hover:bg-emerald-700 h-16 rounded-3xl text-2xl font-black shadow-2xl shadow-emerald-200 transition-all active:scale-95"
                        >
                            {isSubmitting ? <Loader2 className="animate-spin" /> : <>KIRIM JAWABAN <Send className="ml-3" size={24} /></>}
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};