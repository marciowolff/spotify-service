import { createClient, objectToQueryString } from "./commons/http";
import { spotifyServiceFactory } from "./resources/spotify";

export { default as auth } from "./commons/auth";

export default function anbimaAPI(baseURL = "") {
  const httpClient = createClient(baseURL);
  const dependencies = { httpClient, objectToQueryString };

  return {
    spotify: spotifyServiceFactory(dependencies)
  };
}
