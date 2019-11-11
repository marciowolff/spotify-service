import services from "./index";

let service;
describe("services factory", () => {
  beforeEach(() => {
    service = services("/teste");
  });

  it("should be a function", () => {
    expect(typeof services).toBe("function");
  });

  it("Should create object spotify", () => {
    service = services();
    expect(typeof service.spotify).toBe("object");
  });

  it("Should create object spotify with search and album", () => {
    expect(typeof service.spotify.albums).toBe("function");
    expect(typeof service.spotify.search).toBe("function");
  });
});
