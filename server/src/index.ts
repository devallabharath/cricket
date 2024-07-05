import express from 'express'
import { createHandler } from 'graphql-http/lib/use/express'
import cors from 'cors'
import { DataSource } from 'typeorm'
import schema from './schema'
import entities from './entities'
var { ruruHTML } = require('ruru/server')

const DB = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: 3306,
  database: process.env.DATABASE_NAME,
  username: 'root',
  password: process.env.DATABASE_PASSWORD,
  logging: true,
  synchronize: true,
  entities,
})

const main = async () => {
  await DB.initialize()
  const app = express()
  app.use(cors())
  app.use(express.json())
  app.all('/', createHandler({ schema }))

  // Serve the GraphiQL IDE.
  app.get('/test', (_req, res) => {
    res.type('html')
    res.end(ruruHTML({ endpoint: '/' }))
  })
  app.listen(8000, () => {
    console.log('listening on 8000...')
  })
}

main().catch(err => {
  console.log(err)
})
