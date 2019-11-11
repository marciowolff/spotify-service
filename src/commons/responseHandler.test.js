import { responseHandler } from './responseHandler'

describe('#responseHandler', () => {
  it('should be a function', () => {
    expect(typeof responseHandler).toBe('function')
  })

  it('should return an empty array when response status is 404', () => {
    expect(responseHandler({ status: 404 })).toEqual([])
  })

  it('should return an empty array when has no data property', () => {
    expect(responseHandler({ status: 200 })).toEqual([])
  })

  it('should return an error with response when response status is greater than or equal to 300', () => {
    const response300 = { status: 300, data: {} }
    const handled300 = responseHandler(response300)
    expect(handled300.response).toBe(response300)

    const response400 = { status: 400, data: {} }
    const handled400 = responseHandler(response400)
    expect(handled400.response).toBe(response400)

    const response500 = { status: 500, data: {} }
    const handled500 = responseHandler(response500)
    expect(handled500.response).toBe(response500)
  })

  it('should return an error named "Internal" when response data has no error property', () => {
    const noNameError = responseHandler({ status: 500, data: {} })
    expect(noNameError.message).toBe('Internal')

    const namedError = responseHandler({ status: 500, data: { error: 'test' } })
    expect(namedError.message).toBe('test')
  })

  it('should return response data when request has no issues', () => {
    const fake = { status: 200, data: [{ test: true }] }
    expect(responseHandler(fake)).toBe(fake.data)
  })
})
