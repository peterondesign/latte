export namespace CityApplicationEvent {
  export namespace CityCreated {
    export const key = 'city.application.city.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
