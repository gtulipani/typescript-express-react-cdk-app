import {Request, Response, Router} from 'express'

import {GetCounterUseCase} from '../../domain/interfaces/use-cases'
import {SetCounterUseCase} from '../../domain/interfaces/use-cases'

export function CounterRouter(
  getCounterUseCase: GetCounterUseCase,
  setCounterUseCase: SetCounterUseCase
) {
  const router = Router()

  router.get('/', async (req: Request, res: Response) => {
    try {
      const counter = await getCounterUseCase.execute()
      res.send(counter)
    } catch (err) {
      res.status(500).send({message: "Error fetching data"})
    }
  })

  router.post('/', async (req: Request, res: Response) => {
    try {
      const counter = await getCounterUseCase.execute()

      await setCounterUseCase.execute({
        val: counter.val + 1
      })

      res.statusCode = 200
      res.json({message: "OK"})
    } catch (err: any) {
      console.log(err.message)
      res.status(500).send({message: "Error setting counter"})
    }
  })

  return router
}
