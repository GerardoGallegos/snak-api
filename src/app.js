// Load environment variables
import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import routes from './routes'

dotenv.config()

require('./connections/mongoDB')

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

export default app
