import * as dotenv from 'dotenv'
import ApplicationServer from './servers/ApplicationServer'

dotenv.config()

const applicationServer = new ApplicationServer()
applicationServer.run()