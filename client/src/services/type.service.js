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

  removeType: async (typeId) => {
    const { data } = await httpService.delete(typesEndpoint + typeId);
    return data;
  },

  update: async (payload) => {
    const { data } = await httpService.patch(
      typesEndpoint + payload.typeId,
      payload
    );
    return data;
  },
};
export default typesService;
