export namespace CoworkingSpaceApplicationEvent {
  export namespace CoworkingSpaceCreated {
    export const key = 'coworkingSpace.application.coworkingSpace.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
