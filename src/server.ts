import { FirehoseSubscription } from './subscription'
import { Config } from './config'

export class FeedGenerator {
  public firehose: FirehoseSubscription
  public cfg: Config

  constructor(firehose: FirehoseSubscription, cfg: Config) {
    this.firehose = firehose
    this.cfg = cfg
  }

  static create(cfg: Config) {
    const firehose = new FirehoseSubscription(cfg.subscriptionEndpoint)

    return new FeedGenerator(firehose, cfg)
  }

  async start(): Promise<void> {
    await this.firehose.run(this.cfg.subscriptionReconnectDelay)
  }
}

export default FeedGenerator
