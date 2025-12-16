// fileName: src/features/monitoring/responden/components/JawabanSection.tsx
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { JawabanItem } from '../types';
import JawabanItemCard from './JawabanItemCard'; // Import komponen anak

interface JawabanSectionProps {
    jawabanList: JawabanItem[];
}

const JawabanSection: React.FC<JawabanSectionProps> = ({ jawabanList }) => (
    <Card>
        <CardHeader className="border-b">
            <h3 className="text-xl font-semibold">Daftar Jawaban Responden ({jawabanList.length} Item)</h3>
        </CardHeader>
        <CardContent className="p-0 divide-y">
            {jawabanList.map((jawaban) => (
                <JawabanItemCard key={jawaban.pertanyaanId} jawaban={jawaban} />
            ))}
        </CardContent>
    </Card>
);

export default JawabanSection;