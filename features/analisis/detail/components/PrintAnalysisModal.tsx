// src/features/analisis/detail/components/PrintAnalysisModal.tsx
import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle,
    DialogDescription,
    DialogFooter // 1. Tambah import Footer
} from "@/components/ui/dialog";
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import { AnalysisPDFDocument } from "./AnalysisPDFDocument";
import { AnalisisDetailData, FilterPayload } from "../types";
import { Button } from "@/components/ui/button";
import { FileText, Download, Loader2, X } from "lucide-react";

interface Props {
    open: boolean;
    onClose: () => void;
    data: AnalisisDetailData;
    filters: FilterPayload;
}

export function PrintAnalysisModal({ open, onClose, data, filters }: Props) {
    if (!data) return null;

    // Sanitasi nama file agar rapi
    const fileName = `Laporan Analisis (${data.kuesioner.judul.replace(/[/\\?%*:|"<>]/g, '-')}).pdf`;

    return (
        <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
            <DialogContent className="max-w-5xl w-[95vw] sm:w-full h-[90vh] sm:h-[95vh] p-0 overflow-hidden flex flex-col gap-0 border-none sm:border shadow-2xl">
                
                {/* --- HEADER --- */}
                <DialogHeader className="p-4 border-b bg-white shrink-0 flex flex-row items-center justify-between">
                    <div className="space-y-1">
                        <DialogTitle className="text-base sm:text-lg flex items-center gap-2">
                            <FileText className="h-5 w-5 text-red-600" />
                            Laporan Analisis PDF
                        </DialogTitle>
                        <DialogDescription className="text-[10px] sm:text-xs truncate max-w-[200px] sm:max-w-md">
                            {data.kuesioner.judul}
                        </DialogDescription>
                    </div>
                </DialogHeader>

                {/* --- BODY (PREVIEW) --- */}
                <div className="flex-1 bg-slate-100 overflow-hidden flex flex-col">
                    {open && (
                        <>
                            {/* Desktop Preview */}
                            <div className="hidden md:block flex-1">
                                <PDFViewer width="100%" height="100%" className="border-none">
                                    <AnalysisPDFDocument data={data} filters={filters} />
                                </PDFViewer>
                            </div>

                            {/* Mobile View Placeholder */}
                            <div className="md:hidden flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4">
                                <div className="w-20 h-20 bg-white rounded-2xl shadow-sm flex items-center justify-center">
                                    <FileText className="h-10 w-10 text-red-500" />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="font-bold text-slate-800 text-sm">Pratinjau terbatas di mobile</h3>
                                    <p className="text-[11px] text-slate-500">
                                        Gunakan tombol unduh di bawah untuk melihat dokumen.
                                    </p>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* --- DIALOG FOOTER (ACTION BUTTONS) --- */}
                <DialogFooter className="p-3 border-t bg-white flex flex-row items-center justify-end gap-3 shrink-0">
                    <Button 
                        variant="ghost" 
                        onClick={onClose}
                        className="text-slate-500  text-xs sm:text-sm"
                    >
                        Tutup
                    </Button>

                    <PDFDownloadLink
                        document={<AnalysisPDFDocument data={data} filters={filters} />}
                        fileName={fileName}
                    >
                        {({ loading }) => (
                            <Button 
                                disabled={loading}
                                className="bg-green-600 hover:bg-green-700 text-white gap-2 h-9 sm:h-10 px-4 sm:px-6 shadow-sm active:scale-95 transition-all"
                            >
                                {loading ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <Download className="h-4 w-4" />
                                )}
                                <span className="text-xs sm:text-sm font-semibold">
                                    {loading ? "Menyiapkan..." : "Unduh Laporan PDF"}
                                </span>
                            </Button>
                        )}
                    </PDFDownloadLink>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}