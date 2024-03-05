export namespace ImageApplicationEvent {
  export namespace ImageCreated {
    export const key = 'image.application.image.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
