import api from "@/lib/axios";
import { publicApi } from "./api";
import { PublicListResponse, PublicDetailResponse } from "./types";

export async function getPublicKuesionerList(): Promise<PublicListResponse> {
  const res = await api.get<PublicListResponse>(publicApi.kuesionerList);
  return res.data;
}

export async function getPublicKuesionerDetail(
  id: string | number
): Promise<PublicDetailResponse> {
  const res = await api.get<PublicDetailResponse>(
    publicApi.kuesionerDetail(`${id}`)
  );
  return res.data;
}
