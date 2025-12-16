export const kuesionerApi = {
    list: "/api/kuesioner",
    create: "/api/kuesioner",
    update: (id: number) => `/api/kuesioner/${id}`,
    delete: (id: number) => `/api/kuesioner/${id}`,
    distribution : (id: number) => `/api/kuesioner/${id}/distribusi`,
    distributionUpdate: (id:number)  => `/api/distribusi/${id}`
};
