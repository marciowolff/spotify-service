import axios from 'axios'
import * as http from './http'

describe('commons: http', () => {
  describe('#createClient', () => {

    const fakeClient = { interceptors: { request: { use: jest.fn() }, response: { use: jest.fn() } } }
    const fakeRequester = { create: jest.fn().mockImplementation(() => fakeClient) }

    beforeEach(() => {
      fakeClient.interceptors.request.use.mockClear()
      fakeClient.interceptors.response.use.mockClear()
      fakeRequester.create.mockClear()
    })

    it('shoud be a function', () => {
      expect(typeof http.createClient).toBe('function')
    })

    it('should create a client with requester lib', () => {
      http.createClient('base/url', fakeRequester)
      expect(fakeRequester.create).toHaveBeenCalledTimes(1)
      expect(fakeRequester.create).toBeCalledWith({ baseURL: 'base/url' })
    })

    it('should use empty string as default base URL', () => {
      http.createClient(undefined, fakeRequester)
      expect(fakeRequester.create).toBeCalledWith({ baseURL: '' })
    })

    it('should use axios as default request lib', () => {
      const client = http.createClient('url')
      expect(client.prototype).toEqual(axios.create().prototype)
    })
  })

  describe('#objectToQueryString', () => {
    it('should be a function', () => {
      expect(typeof http.objectToQueryString).toBe('function')
    })

    it('should return a query string with object props', () => {
      const actual = http.objectToQueryString(http.DEFAULT_QUERY_STRING)
      expect(actual).toBe('?page=0&size=20')
    })

    it('should use empty object as default parameter', () => {
      const actual = http.objectToQueryString()
      expect(actual).toBe('?')
    })
  })

  describe('#responseInterceptor', () => {
    it('should be a function', () => {
      expect(typeof http.responseInterceptor).toBe('function')
    })

    it('should return a promise', () => {
      expect(http.responseInterceptor({})).toBeInstanceOf(Promise)
    })

    describe('returned promise', () => {
      it('should resolve with response when exist', () => {
        const fake = { response: { data: { value: 'test' } } }
        expect(http.responseInterceptor(fake)).resolves.toBe(fake.response)
      })

      it('should reject with original parameter when response not exist', () => {
        const fake = new Error('fake')
        expect(http.responseInterceptor(fake)).rejects.toBe(fake)
      })
    })
  })
})
