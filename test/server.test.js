/* global describe, test, expect, afterAll, beforeAll */
import axios from 'axios'
import app from '../src/app'

const PORT = app.get('port') || 3030
const HOST = app.get('host') || 'localhost'
const API_HOST = `http://${HOST}:${PORT}`

let server = null

beforeAll((done) => {
  server = app.listen(PORT)
  server.once('listening', () => done())
})

afterAll((done) => {
  server.close(done)
})

describe('Server Works', () => {
  test('Get API version in root', async (done) => {
    const { data } = await axios.get(API_HOST)
    expect(data.api).toEqual('snak-ultimate')
    done()
  })

  test('Get Error 404 in undefined route', async (done) => {
    try {
      await axios.get(API_HOST + '/some/random/route')
    } catch (error) {
      expect(error.response.data.code).toEqual(404)
      done()
    }
  })
})
