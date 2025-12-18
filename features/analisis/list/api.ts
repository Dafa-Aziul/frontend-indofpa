export const analisisApi = {
    // Endpoint untuk mengambil daftar kuesioner yang siap dianalisis (GET)
    list: "/api/analisis",
    
    // Endpoint untuk melihat detail analisis (GET)
    detail: (id: number) => `/api/analisis/${id}`,
};