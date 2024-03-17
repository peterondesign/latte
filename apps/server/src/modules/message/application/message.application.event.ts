export namespace MessageApplicationEvent {
  export namespace MessageCreated {
    export const key = 'message.application.message.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
