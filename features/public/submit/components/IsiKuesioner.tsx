"use client";

import React from 'react';
import { useFillKuesioner } from '../hooks';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2, Send, ChevronRight, ChevronLeft } from 'lucide-react';

export const IsiKuesionerView = ({ kodeAkses }: { kodeAkses: string }) => {
    // Destructuring semua yang dibutuhkan dari hook
    const { 
        data, 
        isLoading, 
        step, 
        setStep, 
        profile, 
        setProfile, 
        answers, 
        setAnswers, 
        handleNextStep, 
        handleSubmit, 
        isSubmitting 
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
            <div className="flex items-center justify-center mb-10 gap-4">
                <div className={`flex items-center gap-2 ${step === 1 ? "text-emerald-600 font-bold" : "text-gray-400"}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step === 1 ? "border-emerald-600 bg-emerald-50 shadow-sm" : "border-gray-200"}`}>1</div>
                    <span className="text-sm">Profil</span>
                </div>
                <div className="w-16 h-[2px] bg-gray-100"></div>
                <div className={`flex items-center gap-2 ${step === 2 ? "text-emerald-600 font-bold" : "text-gray-400"}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step === 2 ? "border-emerald-600 bg-emerald-50 shadow-sm" : "border-gray-200"}`}>2</div>
                    <span className="text-sm">Kuesioner</span>
                </div>
            </div>

            {step === 1 ? (
                <Card className="border-emerald-100 shadow-2xl shadow-emerald-900/5 rounded-[2rem]">
                    <CardHeader>
                        <CardTitle className="text-2xl font-black text-gray-900 uppercase">Profil Responden</CardTitle>
                        <CardDescription>Lengkapi data diri sesuai kriteria penelitian ini.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-5">
                        <div className="space-y-2">
                            <Label>Nama Lengkap</Label>
                            <Input placeholder="Suparman" value={profile.nama} onChange={e => setProfile({ ...profile, nama: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                            <Label>Email</Label>
                            <Input type="email" placeholder="suparman@example.com" value={profile.email} onChange={e => setProfile({ ...profile, email: e.target.value })} />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Kategori Usia</Label>
                                <Select onValueChange={v => setProfile({ ...profile, usiaKategori: v })}>
                                    <SelectTrigger><SelectValue placeholder="Pilih Usia" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="USIA_18_24">18-24</SelectItem>
                                        <SelectItem value="USIA_25_34">25-34</SelectItem>
                                        <SelectItem value="USIA_35_44">35-44</SelectItem>
                                        <SelectItem value="USIA_45_54">45-54</SelectItem>
                                        <SelectItem value="USIA_55_64">55-64</SelectItem>
                                        <SelectItem value="USIA_65_PLUS">65+</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Jenis Kelamin</Label>
                                <RadioGroup className="flex pt-3 gap-6" onValueChange={v => setProfile({ ...profile, jenisKelamin: v as any })}>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="L" id="L" /><Label htmlFor="L">Laki-laki</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="P" id="P" /><Label htmlFor="P">Perempuan</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Pendidikan</Label>
                                <Select onValueChange={v => setProfile({ ...profile, tingkatPendidikan: v })}>
                                    <SelectTrigger><SelectValue placeholder="Pilih" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="TidakTamatSD">Tidak Tamat SD</SelectItem>
                                        <SelectItem value="SD">SD</SelectItem>
                                        <SelectItem value="SMP">SMP</SelectItem>
                                        <SelectItem value="SMA">SMA</SelectItem>
                                        <SelectItem value="Diploma">Diploma</SelectItem>
                                        <SelectItem value="S1">S1</SelectItem>
                                        <SelectItem value="S2">S2</SelectItem>
                                        <SelectItem value="S3">S3</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Agama</Label>
                                <Select onValueChange={v => setProfile({ ...profile, agama: v })}>
                                    <SelectTrigger><SelectValue placeholder="Pilih" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Islam">Islam</SelectItem>
                                        <SelectItem value="KristenProtestan">Kristen Protestan</SelectItem>
                                        <SelectItem value="Katolik">Katolik</SelectItem>
                                        <SelectItem value="Hindu">Hindu</SelectItem>
                                        <SelectItem value="Buddha">Buddha</SelectItem>
                                        <SelectItem value="Konghucu">Konghucu</SelectItem>
                                        <SelectItem value="Kepercayaan">Kepercayaan</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Pekerjaan</Label>
                            <Input placeholder="Pensiunan / Swasta / Mahasiswa" value={profile.pekerjaan} onChange={e => setProfile({ ...profile, pekerjaan: e.target.value })} />
                        </div>
                    </CardContent>
                    <CardFooter>
                        {/* Memanggil handleNextStep dari hook */}
                        <Button onClick={handleNextStep} className="w-full bg-emerald-600 hover:bg-emerald-700 h-14 rounded-2xl font-bold text-lg">
                            Lanjut ke Pertanyaan <ChevronRight className="ml-2" />
                        </Button>
                    </CardFooter>
                </Card>
            ) : (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="bg-white p-6 rounded-[2rem] border border-emerald-100">
                        <h2 className="text-xl font-black text-emerald-900 uppercase leading-tight">{kuesioner?.judul}</h2>
                        <p className="text-sm text-gray-500 mt-1">Responden: {profile.nama} ({profile.pekerjaan})</p>
                    </div>

                    {pertanyaanList.map((q: any, idx: number) => (
                        <Card key={q.pertanyaanId} className="border-emerald-50 rounded-[2rem] overflow-hidden">
                            <CardHeader className="bg-emerald-50/30">
                                <CardTitle className="text-lg">
                                    <span className="text-emerald-600 mr-2 font-black">{idx + 1}.</span>
                                    {q.teksPertanyaan}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <div className="grid grid-cols-5 gap-3">
                                    {[1, 2, 3, 4, 5].map(val => (
                                        <Button
                                            key={val}
                                            variant={answers[q.pertanyaanId] === val ? "default" : "outline"}
                                            className={`h-16 rounded-2xl font-black text-2xl transition-all ${answers[q.pertanyaanId] === val ? "bg-emerald-600 scale-105 shadow-lg shadow-emerald-200" : "hover:border-emerald-200"}`}
                                            onClick={() => setAnswers({ ...answers, [q.pertanyaanId]: val })}
                                        >
                                            {val}
                                        </Button>
                                    ))}
                                </div>
                                <div className="flex justify-between mt-4 px-2 text-[9px] font-black text-gray-400 uppercase tracking-widest leading-tight">
                                    <span className="max-w-[80px] text-left">{q.labelSkala["1"]}</span>
                                    <span className="max-w-[80px] text-right">{q.labelSkala["5"]}</span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    <div className="flex gap-4 pt-6">
                        <Button variant="ghost" onClick={() => setStep(1)} className="h-14 px-8 text-emerald-600 font-bold">
                            <ChevronLeft className="mr-2" /> Kembali
                        </Button>
                        {/* Memanggil handleSubmit dari hook */}
                        <Button 
                            onClick={handleSubmit} 
                            disabled={isSubmitting}
                            className="flex-1 bg-emerald-600 hover:bg-emerald-700 h-14 rounded-2xl text-xl font-black shadow-xl shadow-emerald-100"
                        >
                            {isSubmitting ? <Loader2 className="animate-spin" /> : (
                                <>KIRIM JAWABAN <Send className="ml-2" size={20} /></>
                            )}
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};