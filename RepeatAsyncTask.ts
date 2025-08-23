export default class RepeatAsyncTask {
  private delay: number = 10000 // default delay in milliseconds
  private task: (() => Promise<void>) | null = null
  private timeoutID: null | NodeJS.Timeout = null

  setDelay = (delay: number) => {
    if (delay <= 0) throw new Error("Delay must be a positive number")
    this.delay = delay
  }

  setTask = (fn: () => Promise<void>) => {
    this.task = fn
  }

  loop = () => {
    this.timeoutID = setTimeout(async () => {
      if (this.task) await this.task()
      this.loop()
    }, this.delay)
  }

  start = () => {
    if (this.timeoutID) return
    this.loop()
  }

  stop = () => {
    if (this.timeoutID) {
      clearTimeout(this.timeoutID)
      this.timeoutID = null
    }
  }
}
