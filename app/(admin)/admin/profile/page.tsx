import ProfileCard from "@/features/profile/components/ProfileCard";
import ChangePasswordCard from "@/features/profile/components/ChangePasswordCard";
import PageHeader from "@/components/common/page-header";

export default function ProfilePage() {
    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <PageHeader title="Profil Pengguna" />
            <ProfileCard />

            <ChangePasswordCard />
        </div>
    );
}