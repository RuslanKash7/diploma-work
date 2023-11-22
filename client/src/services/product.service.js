import httpService from "./http.service";

const productEndpoint = "product/";

const productService = {
  get: async () => {
    const req = await httpService.get(productEndpoint);
    return req.data;
  },

  createProduct: async (payload) => {
    console.log(payload);
    const { data } = await httpService.post(productEndpoint, payload);
    console.log(data);
    return data;
  },
  removeProduct: async (productId) => {
    const { data } = await httpService.delete(productEndpoint + productId);
    return data;
  },
  update: async (payload) => {
    const { data } = await httpService.patch(
      productEndpoint + payload.productId,
      payload
    );
    return data;
  },
};
export default productService;
