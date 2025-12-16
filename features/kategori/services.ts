import api from "@/lib/axios";
import { apiClient } from "@/lib/apiClient";
import { kategoriApi } from "./api";

export function getKategori(params: {
  page: number;
  limit: number;
  search?: string;
}) {
  return api.get(kategoriApi.list, { params }).then((res) => res.data);
}

export function createKategori(payload: { nama: string }) {
  return apiClient(() => api.post(kategoriApi.create, payload));
}

export function updateKategori(id: number, payload: { nama: string }) {
  return apiClient(() => api.put(kategoriApi.update(id), payload));
}

export function deleteKategori(id: number) {
  return apiClient(() => api.delete(kategoriApi.delete(id)));
}
