import { readdirSync } from "fs"
import Procedure from "../factory/Procedure"
import { join } from "path"

export default class ProceduresServer {
  async run () {
    const defaultClasses = await this.getDefaultClassesOfFiles()

    this.runProcedures(defaultClasses)
  }

  async getDefaultClassesOfFiles (): Promise<Array<Procedure>> {
    return await Promise.all(readdirSync(join(__dirname, '../procedures'))
      .map(async file => (await import(`../procedures/${file}`)).default))
  }

  async runProcedures (procedures: Array<Procedure>): Promise<void> {
    for (const procedure of procedures) {
      console.info(`${procedure.constructor.name} RUNNING...`)

      await procedure.run()
    }
  }
}