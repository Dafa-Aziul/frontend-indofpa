import api from "@/lib/axios";
import qs from "qs";
import { AnalisisDetailResponse, FilterPayload, InterpretasiRange } from "./types";

export function getAnalisisDetail(
  kuesionerId: number,
  filters: FilterPayload = {}
): Promise<AnalisisDetailResponse["data"]> {
  const paramsSerializer = (params: FilterPayload) => {
    return qs.stringify(params, { arrayFormat: "repeat" });
  };

  return api
    .get<AnalisisDetailResponse>(`/api/analisis/${kuesionerId}`, {
      params: filters,
      paramsSerializer: {
        serialize: paramsSerializer,
      },
    })
    .then((res) => res.data.data);
}


export async function createAnalisisConfig(
  kuesionerId: number,
  payload: { interpretasi: InterpretasiRange[] }
): Promise<void> {
  return api.post(`/api/analisis/${kuesionerId}/config`, payload);
}

export async function updateAnalisisConfig(
  kuesionerId: number,
  payload: { interpretasi: InterpretasiRange[] }
): Promise<void> {
  return api.put(`/api/analisis/${kuesionerId}/config`, payload);
}
