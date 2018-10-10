import express from 'express'
import * as snak from './controllers/snak.controller'
import errorHandler from './midlewares/errorHandler'

const api = express.Router()

api.get('/', (req, res) => res.json({ api: 'snak-ultimate', version: 1 }))

// Snaks
api.get('/snaks', snak.getAll)
api.post('/snaks', snak.create)
api.get('/snaks/:id', snak.get)
api.put('/snaks/:id', snak.update)
api.delete('/snaks/:id', snak.remove)

api.get('*', (req, res) => res.status(404).json({ error: 'Not Found', code: 404 }))

api.use(errorHandler)

export default api
