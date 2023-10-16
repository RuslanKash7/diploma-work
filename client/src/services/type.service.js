import httpService from "./http.service";

const typesEndpoint = "type/";

const typesService = {
  get: async () => {
    const req = await httpService.get(typesEndpoint);
    return req.data;
  },

  createType: async (payload) => {
    const { data } = await httpService.post(typesEndpoint, payload);
    return data;
  },
};
export default typesService;
