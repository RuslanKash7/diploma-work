import httpService from "./http.service";

const brandsEndpoint = "brand/";

const brandsService = {
  get: async () => {
    const req = await httpService.get(brandsEndpoint);
    return req.data;
  },
  createBrand: async (payload) => {
    const { data } = await httpService.post(brandsEndpoint, payload);
    return data;
  },
  removeBrand: async (brandId) => {
    const { data } = await httpService.delete(brandsEndpoint + brandId);
    return data;
  },

  update: async (payload) => {
    const { data } = await httpService.patch(
      brandsEndpoint + payload.brandId,
      payload
    );
    return data;
  },
};
export default brandsService;
