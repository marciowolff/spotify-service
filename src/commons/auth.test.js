import auth from "./auth";
import { SPOTIFY_ACCESS_TOKEN } from "../constants";

const getItemSpy = jest.spyOn(Storage.prototype, "getItem");
const setItemSpy = jest.spyOn(Storage.prototype, "setItem");
const removeItemSpy = jest.spyOn(Storage.prototype, "removeItem");

describe("auth", () => {
  it("shoud be a object", () => {
    expect(typeof auth).toBe("object");
  });

  describe("auth.isAuthenticated", () => {
    beforeEach(() => {
      getItemSpy.mockClear();
    });

    it("shoud be a function", () => {
      expect(typeof auth.isAuthenticated).toBe("function");
    });

    it("should call localStorage.getItem without ", () => {
      auth.isAuthenticated();
      expect(getItemSpy).toHaveBeenCalledWith(SPOTIFY_ACCESS_TOKEN);
    });

    it("should return true ", () => {
      getItemSpy.mockImplementation(() => true);
      expect(auth.isAuthenticated()).toBeTruthy();
    });

    it("should return false ", () => {
      getItemSpy.mockImplementation(() => null);
      expect(auth.isAuthenticated()).toBeFalsy();
    });
  });

  describe("auth.getToken", () => {
    beforeEach(() => {
      getItemSpy.mockClear();
    });

    it("shoud be a function", () => {
      expect(typeof auth.getToken).toBe("function");
    });

    it("should call localStorage.getItem with SPOTIFY_ACCESS_TOKEN", () => {
      auth.getToken();
      expect(getItemSpy).toHaveBeenCalledWith(SPOTIFY_ACCESS_TOKEN);
    });

    it("should return SPOTIFY_ACCESS_TOKEN ", () => {
      getItemSpy.mockImplementation(() => SPOTIFY_ACCESS_TOKEN);
      expect(auth.getToken()).toBe(SPOTIFY_ACCESS_TOKEN);
    });

    it("should return false ", () => {
      getItemSpy.mockImplementation(() => false);
      expect(auth.getToken()).toBeFalsy();
    });
  });

  describe("auth.setToken", () => {
    beforeEach(() => {
      setItemSpy.mockClear();
    });

    it("shoud be a function", () => {
      expect(typeof auth.setToken).toBe("function");
    });

    it("should call localStorage.setItem with accessToken", () => {
      auth.setToken(123);
      expect(setItemSpy).toHaveBeenCalledWith(SPOTIFY_ACCESS_TOKEN, 123);
    });

    it("should call localStorage.setItem without accessToken", () => {
      auth.setToken();
      expect(setItemSpy).toHaveBeenCalledWith(SPOTIFY_ACCESS_TOKEN, undefined);
    });

    it("should return value SPOTIFY_ACCESS_TOKEN ", () => {
      setItemSpy.mockImplementation(() => 1234);
      expect(auth.setToken()).toBe(1234);
    });

    it("should return false ", () => {
      setItemSpy.mockImplementation(() => false);
      expect(auth.setToken()).toBeFalsy();
    });
  });

  describe("auth.removeToken", () => {
    beforeEach(() => {
      setItemSpy.mockClear();
    });

    it("shoud be a function", () => {
      expect(typeof auth.removeToken).toBe("function");
    });

    it("should call localStorage.removeToken with accessToken", () => {
      auth.removeToken();
      expect(removeItemSpy).toHaveBeenCalledWith(SPOTIFY_ACCESS_TOKEN);
    });
  });
});
