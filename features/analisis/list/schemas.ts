// src/features/analisis/schemas.ts
import { z } from 'zod';

// --- Types Dasar ---

export const KategoriSchema = z.object({
    nama: z.string(),
});

export const AnalisisCountSchema = z.object({
    responden: z.number().int().min(0),
    variabel: z.number().int().min(0),
});

// --- Schema Item Analisis ---

export const AnalisisItemSchema = z.object({
    kuesionerId: z.number().int(),
    judul: z.string().min(1, "Judul tidak boleh kosong"),
    kategori: KategoriSchema,
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    _count: AnalisisCountSchema,
});

export type AnalisisItem = z.infer<typeof AnalisisItemSchema>;

// --- Schema Meta Data ---

export const AnalisisMetaSchema = z.object({
    page: z.number().int(),
    limit: z.number().int(),
    total: z.number().int(),
    pages: z.number().int(),
    filtered: z.number().int().optional(),
});

export type AnalisisMeta = z.infer<typeof AnalisisMetaSchema>;

// --- Schema Response Keseluruhan ---

export const AnalisisListResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: z.array(AnalisisItemSchema),
    meta: AnalisisMetaSchema,
});

export type AnalisisListResponse = z.infer<typeof AnalisisListResponseSchema>;