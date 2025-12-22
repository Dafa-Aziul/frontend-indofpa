// src/features/analisis/detail/utils/color-utils.ts

/**
 * Palet warna gradient dari Merah ke Hijau sesuai desain.
 */
const INTERPRETATION_PALETTE = [
  "#FF9494", // Sangat Rendah (Pink/Merah)
  "#FFBD44", // Rendah (Oranye/Kuning)
  "#5EE398", // Sedang (Mint)
  "#32CD32", // Tinggi (Hijau Terang)
  "#2D8A4E", // Sangat Tinggi (Hijau Tua)
];

/**
 * Mengambil warna berdasarkan posisi indeks.
 * @param index - Indeks kategori saat ini
 * @param totalSteps - Total kategori yang ada di API
 */
export const getStepColor = (index: number, totalSteps: number): string => {
  if (totalSteps <= 1)
    return INTERPRETATION_PALETTE[INTERPRETATION_PALETTE.length - 1];

  // Melakukan mapping index API ke palet warna agar gradient tetap proporsional
  const factor = (INTERPRETATION_PALETTE.length - 1) / (totalSteps - 1);
  const paletteIndex = Math.round(index * factor);

  return INTERPRETATION_PALETTE[paletteIndex];
};
