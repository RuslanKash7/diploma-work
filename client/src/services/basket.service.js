import httpService from "./http.service";

const basketEndpoint = "basket/";

const basketService = {
  get: async () => {
    const req = await httpService.get(basketEndpoint);
    return req.data;
  },
  getOnlyUsers: async (userId) => {
    const { data } = await httpService.get(
      basketEndpoint + userId
    );
    return data;
  },
  createBasket: async (payload) => {
    const { data } = await httpService.post(basketEndpoint, payload);
    console.log(data);
    return data;
  },
  removeBasket: async (basketId) => {
    const { data } = await httpService.delete(basketEndpoint + basketId);
    return data;
},
update: async (payload) => {
  const { data } = await httpService.patch(
    basketEndpoint + payload._id,
      payload
  );
  return data;
}
};
export default basketService;
