import * as dotenv from 'dotenv'
import ApplicationServer from './servers/ApplicationServer'
import ProceduresServer from './servers/ProceduresServer'

dotenv.config()

const applicationServer = new ApplicationServer()
applicationServer.run()

if (process.env.PROCEDURE === 'run') {
  const proceduresServer = new ProceduresServer()
  proceduresServer.run()
}