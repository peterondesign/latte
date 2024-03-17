export namespace NomadMatchApplicationEvent {
  export namespace NomadMatchCreated {
    export const key = 'nomadMatch.application.nomadMatch.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
