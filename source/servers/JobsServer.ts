import { CronJob } from 'cron'
import Server from "./Server";
import GenerateGenresJob from '../job/GenerateGenresJob';

export default class JobsServer extends Server {
  constructor () {
    super(Number(process.env.JOB_PORT))
  }

  public run = () => {
    new CronJob('0 2 * * *', GenerateGenresJob).start()
  }
}