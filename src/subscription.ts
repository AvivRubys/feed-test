import { differenceInMilliseconds, formatDistanceToNow } from 'date-fns'
import {
  OutputSchema as RepoEvent,
  isCommit,
} from './lexicon/types/com/atproto/sync/subscribeRepos'
import { FirehoseSubscriptionBase } from './util/subscription'

export class FirehoseSubscription extends FirehoseSubscriptionBase {
  i: number = 0

  async handleEvent(evt: RepoEvent) {
    if (!isCommit(evt)) return

    if (this.i++ % 10_000 === 0) {
      const eventDate = new Date(evt.time)
      const diffMs = differenceInMilliseconds(new Date(), eventDate)
      const diffWords = formatDistanceToNow(eventDate, {
        addSuffix: true,
      })

      console.log(
        'Cursor=',
        evt.seq,
        'DiffMs=',
        diffMs,
        'DiffWords=',
        diffWords,
      )
    }
  }
}
