export default abstract class Server {
  public port: number
  public ip: number

  constructor (port: number) {
    this.port = isNaN(port) ? Number(process.env.PORT) : port

    if (!this.port) {
      throw Error(`A porta não foi configurada: PORT<${this.port}>`)
    }

    if (isNaN(Number(this.port))) {
      throw Error(
        `A porta é inválida: PORT=<${this.port}>`
      )
    }
  }

  public listener = () => {
    console.warn(`Successfully listening at ${this.port}`)
  }
}