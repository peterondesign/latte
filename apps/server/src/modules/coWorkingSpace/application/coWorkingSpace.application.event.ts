export namespace CoWorkingSpaceApplicationEvent {
  export namespace CoWorkingSpaceCreated {
    export const key = 'coWorkingSpace.application.coWorkingSpace.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
