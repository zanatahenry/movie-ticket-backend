import http from 'http'

import express, { Request, Response } from "express"
import Server from "./Server";
import applicationRouter from '../routes/applicationRouter';

export default class ApplicationServer extends Server {
  constructor () {
    super (Number(process.env.PORT))
  }

  public run = () => {
    const applicationServer = express()
    const server = http.createServer(applicationServer)

    applicationServer.use(express.json())
    applicationServer.use(express.urlencoded({ extended: false }))

    applicationServer.use(applicationRouter)

    server.listen(this.port, this.listener)
  }
}