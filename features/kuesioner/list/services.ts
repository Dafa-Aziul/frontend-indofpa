import api from "@/lib/axios";
import { apiClient } from "@/lib/apiClient";
import { kuesionerApi } from "./api";
import { kategoriApi } from "../../kategori/api";
import { KuesionerFormValues, KuesionerDistribusiValues } from "./schemas";

export function getKuesioner(params: {
  page: number;
  limit: number;
  search?: string;
}) {
  return api.get(kuesionerApi.list, { params }).then((res) => res.data);
}

export function createKuesioner(payload: KuesionerFormValues) {
  return apiClient(() => api.post(kuesionerApi.create, payload));
}

export function updateKuesioner(
  id: number,
  payload: Partial<KuesionerFormValues>
) {
  return apiClient(() =>
    api.patch(kuesionerApi.update(id), payload)
  );
}

export function deleteKuesioner(id: number) {
  return apiClient(() => api.delete(kuesionerApi.delete(id)));
}

export function getKategori() {
  return api.get(kategoriApi.list).then((res) => res.data.data);
}

export function createDistribusi(
  kuesionerId: number,
  payload: KuesionerDistribusiValues
) {
  return apiClient(() =>
    api.post(kuesionerApi.distribution(kuesionerId), payload)
  );
}

// PATCH
export function patchDistribusi(
  distribusiId: number,
  payload: Partial<KuesionerDistribusiValues>
) {
  return apiClient(() =>
    api.patch(kuesionerApi.distributionUpdate(distribusiId), payload)
  );
}