import { Request, Response } from 'express'

import User from '../schemas/user'

class UserController {
  public async index (req: Request, res: Response): Promise<Response> {
    const users = await User.find()
    return res.json(users)
  }

  public async store (req: Request, res: Response): Promise<Response> {
    const users = await User.create(req.body)
    return res.json(users)
  }
}

export default new UserController()
