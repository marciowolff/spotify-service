import { spotifyServiceFactory } from "./spotify";

const mockDependencies = {
  httpClient: {
    get: jest.fn().mockReturnValue(Promise.resolve({ data: [] }))
  }
};

beforeEach(() => {
  mockDependencies.httpClient.get.mockClear();
});

describe("resource: spotify", () => {
  describe("#factory", () => {
    it("should be a function", () => {
      expect(typeof spotifyServiceFactory).toBe("function");
    });

    it("should return an object", () => {
      expect(typeof spotifyServiceFactory(mockDependencies)).toBe("object");
    });
  });

  describe("spotifyService", () => {
    const spotifyService = spotifyServiceFactory(mockDependencies);

    describe("#search", () => {
      it("should be a function", () => {
        expect(typeof spotifyService.search).toBe("function");
      });

      it("should call httpClient.get", () => {
        spotifyService.search(1);
        expect(mockDependencies.httpClient.get).toHaveBeenCalledTimes(1);
      });

      it("should call httpClient.get with path /search?q={param}&type=artist,album,track", () => {
        spotifyService.search(1);
        expect(mockDependencies.httpClient.get.mock.calls[0][0]).toBe(
          "/search?q=1&type=artist,album,track"
        );
      });
    });

    describe("#albums", () => {
      it("should be a function", () => {
        expect(typeof spotifyService.albums).toBe("function");
      });

      it("should call httpClient.get", () => {
        spotifyService.albums(1);
        expect(mockDependencies.httpClient.get).toHaveBeenCalledTimes(1);
      });

      it("should call httpClient.get with path /albums/1", () => {
        spotifyService.albums(1);
        expect(mockDependencies.httpClient.get.mock.calls[0][0]).toBe(
          "/albums/1"
        );
      });
    });
  });
});
