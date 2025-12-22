// src/features/analisis/detail/components/PrintAnalysisModal.tsx
import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle,
    DialogDescription 
} from "@/components/ui/dialog";
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import { AnalysisPDFDocument } from "./AnalysisPDFDocument";
import { AnalisisDetailData, FilterPayload } from "../types";
import { Button } from "@/components/ui/button";
import { FileText, Download, Loader2 } from "lucide-react";

interface Props {
    open: boolean;
    onClose: () => void;
    data: AnalisisDetailData;
    filters: FilterPayload;
}

export function PrintAnalysisModal({ open, onClose, data, filters }: Props) {
    if (!data) return null;

    return (
        <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
            <DialogContent className="max-w-5xl w-[95vw] sm:w-full h-[90vh] sm:h-[95vh] p-0 overflow-hidden flex flex-col gap-0 border-none sm:border shadow-2xl">
                {/* --- HEADER --- */}
                <DialogHeader className="p-4 border-b bg-white shrink-0 flex flex-row items-center justify-between">
                    <div className="space-y-1">
                        <DialogTitle className="text-base sm:text-lg flex items-center gap-2">
                            <FileText className="h-5 w-5 text-primary" />
                            Laporan Analisis
                        </DialogTitle>
                        <DialogDescription className="text-[10px] sm:text-xs truncate max-w-[200px] sm:max-w-md">
                            {data.kuesioner.judul}
                        </DialogDescription>
                    </div>
                    {/* Tombol Close Tambahan untuk Mobile agar lebih mudah dijangkau */}
                </DialogHeader>

                <div className="flex-1 bg-slate-100 overflow-hidden flex flex-col">
                    {open && (
                        <>
                            {/* --- TAMPILAN DESKTOP (Preview Langsung) --- */}
                            <div className="hidden md:block flex-1">
                                <PDFViewer width="100%" height="100%" className="border-none">
                                    <AnalysisPDFDocument data={data} filters={filters} />
                                </PDFViewer>
                            </div>

                            {/* --- TAMPILAN MOBILE (Card & Download Button) --- */}
                            <div className="md:hidden flex-1 flex flex-col items-center justify-center p-6 text-center space-y-6">
                                <div className="w-24 h-24 bg-white rounded-2xl shadow-sm flex items-center justify-center">
                                    <FileText className="h-12 w-12 text-red-500" />
                                </div>
                                
                                <div className="space-y-2">
                                    <h3 className="font-bold text-slate-800">Pratinjau tidak tersedia di mobile</h3>
                                    <p className="text-xs text-slate-500 px-4">
                                        Untuk melihat laporan, silakan unduh atau buka dokumen melalui tombol di bawah ini.
                                    </p>
                                </div>

                                <div className="w-full space-y-3 px-4">
                                    <PDFDownloadLink
                                        document={<AnalysisPDFDocument data={data} filters={filters} />}
                                        fileName={`Laporan_${data.kuesioner.judul.replace(/\s+/g, '_')}.pdf`}
                                    >
                                        {({ loading }) => (
                                            <Button 
                                                disabled={loading}
                                                className="w-full h-12 text-base font-bold bg-green-600 hover:bg-green-700 shadow-lg"
                                            >
                                                {loading ? (
                                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                                ) : (
                                                    <Download className="mr-2 h-5 w-5" />
                                                )}
                                                {loading ? "Menyiapkan..." : "Unduh Laporan PDF"}
                                            </Button>
                                        )}
                                    </PDFDownloadLink>

                                    <Button 
                                        variant="outline" 
                                        className="w-full h-12 bg-white text-slate-600 border-slate-200"
                                        onClick={onClose}
                                    >
                                        Kembali
                                    </Button>
                                </div>

                                <p className="text-[10px] text-slate-400">
                                    Format: PDF • Ukuran: A4
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}