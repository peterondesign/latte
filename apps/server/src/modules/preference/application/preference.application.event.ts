export namespace PreferenceApplicationEvent {
  export namespace PreferenceCreated {
    export const key = 'preference.application.preference.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
