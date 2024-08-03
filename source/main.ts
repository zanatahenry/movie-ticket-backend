import * as dotenv from 'dotenv'
import ApplicationServer from './servers/ApplicationServer'
import ProceduresServer from './servers/ProceduresServer'
import JobsServer from './servers/JobsServer'

dotenv.config()

if (process.env.PORT) {
  const applicationServer = new ApplicationServer()
  applicationServer.run()
}

if (process.env.JOB_PORT) {
  const jobsServer = new JobsServer()
  jobsServer.run()
}

if (process.env.PROCEDURE === 'run') {
  const proceduresServer = new ProceduresServer()
  proceduresServer.run()
}