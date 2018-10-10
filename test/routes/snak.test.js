/* global describe, it */
import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../../src'

chai.use(chaiHttp)

/* eslint-disable-next-line */
const expect = require('chai').expect

describe('/snaks', () => {
  it('Get all snaks', (done) => {
    chai.request(app)
      .get('/snaks')
      .end((e, res) => {
        expect(res.body.items).to.be.an('array')
        expect(res.body.error).to.be.a('null')
        expect(res.body.skip).be.equal(0)
        expect(res.status).be.equal(200)
        done()
      })
  })

  it('Create a snak', (done) => {
    const snak = {
      title: 'example snk',
      description: 'awesome snak'
    }
    chai.request(app)
      .post('/snaks')
      .send({ snak })
      .end((e, res) => {
        expect(res.body.snak.version).be.equal('1')
        expect(res.body.snak.title).be.equal('example snk')
        expect(res.status).be.equal(200)

        // Remove the snak
        chai.request(app)
          .delete(`/snaks/${res.body.snak._id}`)
          .end((e, res) => {
            expect(res.body.snak.version).be.equal('1')
            expect(res.body.snak.title).be.equal('example snk')
            expect(res.status).be.equal(200)
            done()
          })
      })
  })

  it('Get a snak by id', (done) => {
    const snak = {
      title: 'example snk',
      description: 'awesome snak'
    }
    chai.request(app)
      .post('/snaks')
      .send({ snak })
      .end((e, res) => {
        expect(res.body.snak.version).be.equal('1')
        expect(res.body.snak.title).be.equal('example snk')
        expect(res.status).be.equal(200)

        // Get snak by id
        chai.request(app)
          .get(`/snaks/${res.body.snak._id}`)
          .end((e, res) => {
            expect(res.body.snak.version).be.equal('1')
            expect(res.body.snak.title).be.equal('example snk')
            expect(res.status).be.equal(200)
            // Remove the snak
            chai.request(app)
              .delete(`/snaks/${res.body.snak._id}`)
              .end((e, res) => {
                expect(res.body.snak.version).be.equal('1')
                expect(res.body.snak.title).be.equal('example snk')
                expect(res.status).be.equal(200)
                done()
              })
          })
      })
  })

  it('Update a snak by id', (done) => {
    const snak = {
      title: 'example snk',
      description: 'awesome snak'
    }
    chai.request(app)
      .post('/snaks')
      .send({ snak })
      .end((e, res) => {
        expect(res.body.snak.version).be.equal('1')
        expect(res.body.snak.title).be.equal('example snk')
        expect(res.status).be.equal(200)

        // Get snak by id
        chai.request(app)
          .put(`/snaks/${res.body.snak._id}`)
          .send({ snak: { title: 'other title' } })
          .end((e, res) => {
            expect(res.body.snak.version).be.equal('1')
            expect(res.body.snak.title).be.equal('other title')
            expect(res.status).be.equal(200)
            // Remove the snak
            chai.request(app)
              .delete(`/snaks/${res.body.snak._id}`)
              .end((e, res) => {
                expect(res.body.snak.version).be.equal('1')
                expect(res.body.snak.title).be.equal('other title')
                expect(res.status).be.equal(200)
                done()
              })
          })
      })
  })
})
