class Bus {
  private events = new Map<string, Function[]>()

  $on(type: string, handler: (...params: any[]) => void) {
    const events = this.events
    const handlers = [...(events.get(type) || []), handler]
    events.set(type, handlers)
  }

  $emit(type: string, data?: any) {
    const events = this.events
    if (events.has(type)) {
      const handlers = events.get(type) || []
      for (const handler of handlers) {
        typeof handler === 'function' && handler(data)
      }
    }
  }

  $off(type: string) {
    const events = this.events
    events.has(type) && events.set(type, [])
  }
}

export default new Bus()
