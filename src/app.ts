import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { config } from 'dotenv'

import routes from './routes'

import mongoose from 'mongoose'

class App {
    public express: express.Application

    public constructor () {
      this.express = express()

      config()

      this.middlewares()
      this.database()
      this.routes()
    }

    private middlewares (): void {
      this.express.use(express.json())
      this.express.use(morgan(`${process.env.MORGAN_TYPE}`))
      this.express.use(cors())
    }

    private database (): void {
      mongoose.connect(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB_NAME}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
    }

    private routes (): void {
      this.express.use(routes)
    }
}

export default new App().express
