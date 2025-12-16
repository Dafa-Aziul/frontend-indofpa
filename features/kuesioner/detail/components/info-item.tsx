import { ReactNode } from "react";

type Props = {
    icon: ReactNode;
    label: string;
    value: ReactNode;
};

export function InfoItem({ icon, label, value }: Props) {
    return (
        <div className="flex items-start gap-3">
            <div className="text-green-600 mt-1">{icon}</div>
            <div className="text-sm">
                <p className="font-medium text-green-700">{label}</p>
                <div className="text-gray-700 wrap-break-words">{value}</div>
            </div>
        </div>
    );
}
