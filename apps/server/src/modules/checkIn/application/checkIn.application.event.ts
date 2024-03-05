export namespace CheckInApplicationEvent {
  export namespace CheckInCreated {
    export const key = 'checkIn.application.checkIn.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
