import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.get('/', (req, res) => res.json({ api: 'snak-ultimate', version: 1 }))

app.get('*', (req, res) => res.status(404).json({ error: 'Not Found', code: 404 }))

export default app
