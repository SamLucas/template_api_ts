import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

class App {
    public express: express.Application

    public constructor () {
      this.express = express()
      this.middlewares()
      this.database()
      this.routes()
    }

    private middlewares (): void {
      this.express.use(express.json())
      this.express.use(cors())
      this.express.use(morgan(`${process.env.MORGAN_TYPE}`))
    }

    private database (): void {
    }

    private routes (): void {
    }
}

export default new App().express