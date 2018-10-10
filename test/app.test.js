/* global describe, it */
import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../src'

chai.use(chaiHttp)

/* eslint-disable-next-line */
const expect = require('chai').expect

describe('/', () => {
  it('Get API version in root', (done) => {
    chai.request(app)
      .get('/')
      .end((e, res) => {
        expect(res.body.api).be.equal('snak-ultimate')
        expect(res.body.version).be.equal(1)
        expect(res.status).be.equal(200)
        done()
      })
  })
})
