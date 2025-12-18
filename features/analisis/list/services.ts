import api from "@/lib/axios"; // Asumsi ini adalah API client Anda (Axios wrapper)
import { analisisApi } from "./api";
import { AnalisisListResponse, AnalisisListResponseSchema } from "./schemas";

type GetAnalisisListParams = {
  page: number;
  limit: number;
  search: string;
};

/**
 * Mengambil daftar kuesioner yang siap dianalisis dari backend API Anda.
 */
export async function getAnalisisList({
  page,
  limit,
  search,
}: GetAnalisisListParams): Promise<AnalisisListResponse> {
  const response = await api
    .get(analisisApi.list, {
      params: {
        page,
        limit,
        search,
      },
    })
    .then((res) => res.data);

  const validationResult = AnalisisListResponseSchema.safeParse(response);

  if (!validationResult.success) {
    console.error("Validation Error:", validationResult.error.issues);
    throw new Error(
      "Format data analisis dari backend tidak valid. Periksa skema Zod."
    );
  }

  return validationResult.data;
}
