import http from 'http'
import responser from 'responser'
import Responserror from 'responserror'

import express, { Request, Response } from "express"
import Server from "./Server";
import applicationRouter from '../routes/applicationRouter';

export default class ApplicationServer extends Server {
  constructor () {
    super (Number(process.env.PORT))
  }

  public run = () => {
    const { errorHandler } = new Responserror()

    const applicationServer = express()
    const server = http.createServer(applicationServer)

    applicationServer.use(express.json())
    applicationServer.use(express.urlencoded({ extended: false }))

    applicationServer.use(responser);

    applicationServer.use(applicationRouter)

    applicationServer.use(errorHandler)

    server.listen(this.port, "127.0.0.1", this.listener)
  }
}