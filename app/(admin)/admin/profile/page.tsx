// app/(admin)/admin/profile/page.tsx
import { cookies } from "next/headers";
import ProfileCard from "@/features/profile/components/ProfileCard";
import ChangePasswordCard from "@/features/profile/components/ChangePasswordCard";
import PageHeader from "@/components/common/page-header";

export default async function ProfilePage() {
    // 1. Ambil cookie di Server
    const cookieStore = await cookies();
    const userCookie = cookieStore.get("user")?.value;

    let userData = null;
    if (userCookie) {
        try {
            // Decode dan parse JSON di server
            userData = JSON.parse(decodeURIComponent(userCookie));
        } catch (e) {
            console.error("Gagal parse cookie di ProfilePage Server:", e);
        }
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <PageHeader title="Profil Pengguna" />

            {/* 2. Oper data ke ProfileCard sebagai initialData */}
            <ProfileCard initialData={userData} />

            <ChangePasswordCard />
        </div>
    );
}