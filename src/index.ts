import * as PQueue from 'p-queue';
import { Logger } from 'highoutput-utilities';

const logger = new Logger(['queue']);

export default class TaskQueue {
  queue: PQueue
  stopping: boolean = false

  constructor(options?: any) {
    this.queue = new PQueue(options);
  }

  /**
   * Adds a new task to the queue
   * @param fn Async function
   * @param {PQueue.QueueAddOptions} options
   */
  add<T>(fn: PQueue.Task<T>, options?: PQueue.QueueAddOptions): Promise<T> | void {
    if (this.stopping) {
      logger.info('Cannot add new task.');
      return;
    }

    return this.queue.add(fn, options);
  }

  /**
   * Marks the current queue to stop accepting new tasks and awaits all running tasks.
   */
  stop(): Promise<any> {
    this.stopping = true;
    return this.queue.onEmpty();
  }
}
