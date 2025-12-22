// fileName: src/components/LoginForm.tsx (Optimasi Responsif Mobile)
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm, useWatch, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchema } from "./login.schema";

import {
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    InputGroupInput
} from "@/components/ui/input-group";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import {
    Alert,
    AlertTitle,
    AlertDescription
} from "@/components/ui/alert";

import { Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { useRouter } from "next/navigation";

export function LoginForm() {
    const router = useRouter();
    const { login } = useAuth();

    const [serverError, setServerError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        control,
        formState: { errors, isSubmitting },
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: "", password: "", remember: false },
    });

    const rememberValue = useWatch({ control, name: "remember" });

    useEffect(() => {
        const savedEmail = localStorage.getItem("remember_email");
        if (savedEmail) {
            setValue("email", savedEmail);
            setValue("remember", true);
        }
    }, [setValue]);

    const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
        setServerError(null);

        if (data.remember) localStorage.setItem("remember_email", data.email);
        else localStorage.removeItem("remember_email");

        const res = await login(data.email, data.password, data.remember ?? false);

        if (!res.success) {
            setServerError(res.error ?? "Terjadi kesalahan");
            return;
        }

        router.push("/admin/dashboard");
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-sm px-4 py-6 sm:p-8 bg-white space-y-5 mx-auto"
        >
            {/* HEADER */}
            <div className="space-y-1 text-center">
                <h1 className="text-2xl font-bold">Login</h1>
                <p className="text-sm text-gray-600">
                    Masukkan email dan kata sandi Anda untuk mengakses akun.
                </p>
            </div>

            {/* ALERT ERROR */}
            {serverError && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Login gagal</AlertTitle>
                    <AlertDescription>{serverError}</AlertDescription>
                </Alert>
            )}

            {/* EMAIL */}
            <div className="space-y-2"> {/* Menambah space-y untuk jarak Label */}
                {/* ✅ PERBAIKAN: Menggunakan 'block' pada Label agar input berada di baris baru */}
                <Label htmlFor="email" className="block">Email</Label>
                <InputGroup className={errors.email ? "border-red-500" : ""}>
                    <InputGroupAddon>
                        <InputGroupText>
                            <Mail className="w-4 h-4 text-gray-500" />
                        </InputGroupText>
                    </InputGroupAddon>

                    <InputGroupInput
                        id="email"
                        placeholder="Masukkan email..."
                        {...register("email")}
                    />
                </InputGroup>

                {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
            </div>

            {/* PASSWORD */}
            <div className="space-y-2"> {/* Menambah space-y untuk jarak Label */}
                {/* ✅ PERBAIKAN: Menggunakan 'block' pada Label */}
                <Label htmlFor="password" className="block">Password</Label>

                <InputGroup className={errors.password ? "border-red-500" : ""}>

                    {/* Ikon Lock → kiri */}
                    <InputGroupAddon>
                        <InputGroupText>
                            <Lock className="w-4 h-4 text-gray-500" />
                        </InputGroupText>
                    </InputGroupAddon>

                    {/* Input */}
                    <InputGroupInput
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Masukkan password..."
                        {...register("password")}
                    />

                    {/* Ikon Mata → kanan */}
                    <InputGroupAddon align="inline-end">
                        <InputGroupText
                            className="cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <EyeOff className="w-4 h-4 text-gray-600" />
                            ) : (
                                <Eye className="w-4 h-4 text-gray-600" />
                            )}
                        </InputGroupText>
                    </InputGroupAddon>

                </InputGroup>

                {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
            </div>


            {/* REMEMBER + FORGOT PASSWORD */}
            {/* Flex items-center justify-between sudah responsif untuk layar kecil */}
            <div className="flex items-center justify-between"> 

                {/* Remember Me */}
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="remember"
                        {...register("remember")}
                        checked={!!rememberValue}
                        onCheckedChange={(v) => setValue("remember", !!v)}
                    />
                    <Label htmlFor="remember">Remember Me</Label>
                </div>

                {/* Forgot Password */}
                <Link
                    href="/forgot-password"
                    className="text-sm text-blue-600 hover:underline"
                >
                    Forgot Password?
                </Link>

            </div>


            {/* BUTTON */}
            {/* Tombol sudah w-full, yang ideal untuk mobile */}
            <Button
                type="submit"
                disabled={isSubmitting}
                className="
                    w-full
                    bg-border
                    text-primary-foreground
                    hover:bg-ring
                    active:bg-accent
                    disabled:opacity-50 disabled:cursor-not-allowed
                ">
                {isSubmitting ? "Logging in..." : "Sign In"}
            </Button>

        </form>
    );
}