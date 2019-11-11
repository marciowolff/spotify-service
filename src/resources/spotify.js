export const spotifyServiceFactory = ({ httpClient }) => ({
  search(search) {
    return httpClient
      .get(`/search?q=${search}&type=artist,album,track`)
      .then(({ data }) => data);
  },
  albums(id) {
    return httpClient.get(`/albums/${id}`).then(({ data }) => data);
  }
});
