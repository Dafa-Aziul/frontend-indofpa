// fileName: services.ts

import api from "@/lib/axios";
import { apiClient } from "@/lib/apiClient";
import { kuesionerDetailApi } from "./api";
import { VariabelFormValues, IndikatorFormValues } from "./schemas";
import {
    Variabel,
    KuesionerDetailResponse,
    Indikator,
    Pertanyaan,
} from "./types";

/* ======================================================
   TYPE PAYLOAD PERTANYAAN (Format API yang diterima setelah Transformasi)
====================================================== */
export type PertanyaanApiPayload = {
    teksPertanyaan: string;
    urutan: number;
    // labelSkala adalah objek string-to-string yang sudah ditransformasi dari form array
    labelSkala: Record<string, string>;
};

/* ================= DETAIL ================= */

export async function getKuesionerDetail(id: number) {
    const res = await api.get(kuesionerDetailApi.detail(id));
    return res.data.data as KuesionerDetailResponse;
}

/* ================= VARIABEL ================= */

export function createVariabel(
    kuesionerId: number,
    payload: VariabelFormValues
) {
    return apiClient<Variabel>(() =>
        api.post(kuesionerDetailApi.variabel.create(kuesionerId), payload)
    );
}

export function updateVariabel(
    variabelId: number,
    payload: Partial<VariabelFormValues>
) {
    return apiClient<Variabel>(() =>
        api.patch(kuesionerDetailApi.variabel.update(variabelId), payload)
    );
}

export function deleteVariabel(variabelId: number) {
    return apiClient<void>(() =>
        api.delete(kuesionerDetailApi.variabel.delete(variabelId))
    );
}

/* ================= INDIKATOR ================= */

export async function getIndikatorList(kuesionerId: number) {
    const res = await api.get(kuesionerDetailApi.indikator.list(kuesionerId));
    return res.data.data as Indikator[];
}

export function createIndikator(
    variabelId: number,
    payload: IndikatorFormValues
) {
    return apiClient<Indikator>(() =>
        api.post(kuesionerDetailApi.indikator.create(variabelId), payload)
    );
}

export function updateIndikator(
    indikatorId: number,
    payload: Partial<IndikatorFormValues>
) {
    return apiClient<Indikator>(() =>
        api.patch(kuesionerDetailApi.indikator.update(indikatorId), payload)
    );
}

export function deleteIndikator(indikatorId: number) {
    return apiClient<void>(() =>
        api.delete(kuesionerDetailApi.indikator.delete(indikatorId))
    );
}

/* ================= PERTANYAAN ================= */

export function createPertanyaan(
    indikatorId: number,
    payload: PertanyaanApiPayload
) {
    return apiClient<Pertanyaan>(() =>
        api.post(kuesionerDetailApi.pertanyaan.create(indikatorId), payload)
    );
}

export function updatePertanyaan(
    pertanyaanId: number,
    payload: Partial<PertanyaanApiPayload>
) {
    return apiClient<Pertanyaan>(() =>
        api.patch(kuesionerDetailApi.pertanyaan.update(pertanyaanId), payload)
    );
}

export function deletePertanyaan(pertanyaanId: number) {
    return apiClient<void>(() =>
        api.delete(kuesionerDetailApi.pertanyaan.delete(pertanyaanId))
    );
}