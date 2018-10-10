import mongoose from 'mongoose'

// Use native promises
mongoose.Promise = global.Promise

const env = process.env.NODE_ENV

let URI

if (env === 'development') URI = process.env.DB_URI_DEV
if (env === 'test') URI = process.env.DB_URI_TEST
if (env === 'production') URI = process.env.DB_URI_PRODUCCION

export default mongoose.connect(URI, { useNewUrlParser: true }, (err) => {
  if (err) {
    return console.log(err)
  }

  console.log('MONGODB OK')
})
