export namespace RewardApplicationEvent {
  export namespace RewardCreated {
    export const key = 'reward.application.reward.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
