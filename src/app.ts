import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { config } from 'dotenv'

import routes from './routes'
import '@/database'

class App {
    public express: express.Application

    public constructor () {
      this.express = express()
      this.middlewares()
      this.routes()

      config()
    }

    private middlewares (): void {
      this.express.use(express.json())
      this.express.use(morgan(`${process.env.MORGAN_TYPE}`))
      this.express.use(cors())
    }

    private routes (): void {
      this.express.use(routes)
    }
}

export default new App().express
