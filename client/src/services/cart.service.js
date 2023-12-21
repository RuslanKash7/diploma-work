import httpService from "./http.service";

const cartEndpoint = "cart/";
const purchaseEndpoint = "purchase/";

const cartService = {
  createCart: async (payload) => {
    const { data } = await httpService.post(cartEndpoint, payload);
    return data;
  },
  removeProduct: async (payload) => {
    const { data } = await httpService.patch(cartEndpoint, payload);
    return data;
  },
  changeCart: async (payload) => {
    const { data } = await httpService.patch(cartEndpoint, payload);
    return data;
  },
  makePurchase: async (payload) => {
    const { data } = await httpService.post(purchaseEndpoint, payload);
    return data;
  },
};
export default cartService;
