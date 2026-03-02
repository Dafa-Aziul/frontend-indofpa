"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Upload, Loader2, FileSpreadsheet, X } from "lucide-react";
import clsx from "clsx";
import { toast } from "sonner";
import { importRespondenExcel } from "../services";
import { useState } from "react";

type Props = {
    kuesionerId: number;
    open: boolean;
    onOpenChange: (v: boolean) => void;
    onSuccess?: () => void;
};

export default function ImportRespondenModal({
    kuesionerId,
    open,
    onOpenChange,
    onSuccess,
}: Props) {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);

        const dropped = e.dataTransfer.files?.[0];
        if (!dropped) return;

        if (!dropped.name.endsWith(".xlsx")) {
            toast.error("File harus berformat .xlsx");
            return;
        }

        setFile(dropped);
    };

    const handleSubmit = async () => {
        if (!file) {
            toast.error("Silakan pilih file terlebih dahulu");
            return;
        }

        try {
            setLoading(true);

            const result = await importRespondenExcel(kuesionerId, file);

            toast.success(result.message);
            setFile(null);
            onOpenChange(false);
            onSuccess?.();
        } catch (err) {
            const msg = err instanceof Error ? err.message : "Import gagal";
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog
            open={open}
            onOpenChange={(v) => {
                if (!v) setFile(null);
                onOpenChange(v);
            }}
        >
            <DialogContent className="max-w-md w-[95%] animate-fadeIn">
                <DialogHeader>
                    <DialogTitle>Import Responden</DialogTitle>
                    <DialogDescription>
                        Upload file Excel (.xlsx) berisi data responden & jawaban sesuai template IndoFPA.
                    </DialogDescription>
                </DialogHeader>

                {/* DRAG & DROP AREA */}
                <div
                    className={clsx(
                        "mt-3 border-2 border-dashed rounded-lg text-center transition-all cursor-pointer bg-card relative",
                        "p-4 sm:p-6",
                        isDragging
                            ? "border-primary bg-secondary"
                            : "border-border"
                    )}
                    onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                >
                    <Upload className="mx-auto h-6 w-6 sm:h-8 sm:w-8 text-primary mb-2" />

                    <p className="text-sm text-muted-foreground">
                        {file ? "File siap diupload" : "Drag & drop file Excel di sini"}
                    </p>

                    <p className="text-xs text-muted-foreground mt-1">
                        atau klik untuk memilih file .xlsx
                    </p>

                    <input
                        type="file"
                        accept=".xlsx"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                        className="absolute left-0 top-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                </div>

                {/* FILE PREVIEW */}
                {file && (
                    <div className="mt-4 flex items-center justify-between p-3 rounded-md border bg-secondary overflow-hidden">
                        <div className="flex items-center gap-3 min-w-0">
                            <FileSpreadsheet className="h-6 w-6 text-primary shrink-0" />
                            <span className="text-sm font-medium truncate max-w-[180px] sm:max-w-xs">
                                {file.name}
                            </span>
                        </div>

                        <button
                            onClick={() => setFile(null)}
                            className="text-red-500 hover:text-red-600 transition"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                )}

                <DialogFooter className="mt-2 flex flex-col sm:flex-row gap-2">
                    <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => {
                            setFile(null);
                            onOpenChange(false);
                        }}
                    >
                        Batal
                    </Button>

                    <Button
                        className="bg-primary hover:bg-accent text-primary-foreground flex-1"
                        disabled={loading || !file}
                        onClick={handleSubmit}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" /> Mengupload...
                            </>
                        ) : (
                            <>
                                <Upload className="h-4 w-4" /> Upload
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}