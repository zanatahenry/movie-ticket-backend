export default abstract class Procedure {
  abstract run (): Promise<void>
}